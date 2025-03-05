<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Trader;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[Route('/product')]
final class ProductController extends AbstractController
{
    private $entityManager;
    private $tokenStorage;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/Product', name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        return $this->render('product/index.html.twig', [
            'products' => $productRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_product_new', methods: ['POST'])]
public function new(Request $request, ValidatorInterface $validator): JsonResponse
{
    // Décoder les données JSON reçues de React
    $obj = json_decode($request->getContent(), true);

    error_log('Données reçues du frontend : ' . print_r($obj, true));

    // Récupérer le trader_id depuis les données de la requête
    $traderId = $obj['trader_id'] ?? null;

    if (!$traderId) {
        return new JsonResponse(['error' => 'Trader ID manquant.'], JsonResponse::HTTP_BAD_REQUEST);
    }

    // Récupérer le trader à partir de l'ID
    $trader = $this->entityManager->getRepository(Trader::class)->find($traderId);

    if (!$trader) {
        return new JsonResponse(['error' => 'Trader non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
    }

    // Créer un nouvel objet Product et y affecter les données
    $product = new Product();
    $product->setName($obj['name']);
    $product->setDescription($obj['description']);
    $product->setPrice($obj['price']);
    $product->setTraderId($trader);

    // Valider l'objet Product (avec le validateur Symfony)
    $errors = $validator->validate($product);

    // Si des erreurs de validation existent, les retourner dans la réponse
    if (count($errors) > 0) {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[] = $error->getMessage();
        }
        return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
    }

    // Si aucune erreur, enregistrer le produit en base de données
    $this->entityManager->persist($product);
    $this->entityManager->flush();

    return new JsonResponse(['message' => 'Produit ajouté avec succès'], JsonResponse::HTTP_OK);
}

    #[Route('/show', name: 'app_product_show', methods: ['GET'])]
    public function show(ProductRepository $productRepository): JsonResponse
    {
        // Récupérer tous les produits depuis le repository
        $products = $productRepository->findAll();
    
        // Retourner tous les produits en JSON
        $productsArray = [];
        foreach ($products as $product) {
            $productsArray[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
            ];
        }
    
        return new JsonResponse($productsArray, JsonResponse::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'app_product_edit', methods: ['PUT'])]
    public function edit($id, Request $request, ValidatorInterface $validator): JsonResponse
    {
        error_log('Début de la requête pour l\'ID produit : ' . $id); // Log début de la requête

        // Récupérer le produit existant à partir de l'ID
        $product = $this->entityManager->getRepository(Product::class)->find($id);
        error_log('ID du produit : ' . $id);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Décoder les données JSON envoyées par React
        $obj = json_decode($request->getContent(), true);

        // Vérifier que les données sont présentes
        if (!isset($obj['name']) || !isset($obj['description']) || !isset($obj['price'])) {
            return new JsonResponse(['error' => 'Les données sont manquantes.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $price = (int)$obj['price']; 

        // Récupérer le trader connecté
        $token = $this->tokenStorage->getToken();
        $user = $token ? $token->getUser() : null;

        error_log('Utilisateur connecté : ' . print_r($user, true));

        if (!$user instanceof Trader) {
            return new JsonResponse(['error' => 'Trader non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Mettre à jour les propriétés du produit avec les nouvelles données
        $product->setName($obj['name']);
        $product->setDescription($obj['description']);
        $product->setPrice($price); 
        $product->setTraderId($user);

        // Valider les nouvelles données
        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Sauvegarder les modifications en base de données
        $this->entityManager->flush();

        error_log('Données mises à jour: ' . print_r($obj, true));

        return new JsonResponse(['message' => 'Produit mis à jour avec succès.'], JsonResponse::HTTP_OK);
    }

    #[Route('/{id}/delete', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Request $request, Product $product): JsonResponse
    {
        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        // Supprimer le produit après validation du token CSRF LA VALIDATION DU TOKEN EST TEMPORAIREMENT DESACTIVEE
        if ($this->isCsrfTokenValid('delete'.$product->getId(), $request->get('token')) === false) {
            $this->entityManager->remove($product);
            $this->entityManager->flush();
            error_log('Données supprimées de la base de données: ' . print_r($product, true));
            return new JsonResponse(['message' => 'Produit supprimé avec succès.'], JsonResponse::HTTP_OK);
        } else {
            return new JsonResponse(['error' => 'Token CSRF invalide.'], JsonResponse::HTTP_FORBIDDEN);
        }
    }

    #[Route('/products/trader/{trader_id}', name: 'show_trader_products', methods: ['GET'])]
    public function showProduct(int $trader_id, ProductRepository $productRepository): JsonResponse
    {
        $products = $productRepository->findBy(['trader' => $trader_id]);

        if (!$products) {
            return new JsonResponse(['message' => 'Aucun produit trouvé pour ce trader.'], 404);
        }

        return $this->json($products, 200, [], ['groups' => 'product:read']);
    }
}