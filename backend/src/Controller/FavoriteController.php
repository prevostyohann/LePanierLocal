<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Favorite;
use App\Entity\Product;
use App\Repository\UserRepository;
use App\Repository\ProductRepository;
use App\Repository\FavoriteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class FavoriteController extends AbstractController
{
    #[Route('/favorite/add', name: 'add_favorite', methods: ['POST'])]
    public function addFavorite(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        error_log('user : ' . print_r($user, true));

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $product = $entityManager->getRepository(Product::class)->find($data['productId']);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $favorite = new Favorite();
        $favorite->setUser($user);
        $favorite->setProduct($product);

        $entityManager->persist($favorite);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit ajouté aux favoris.'], JsonResponse::HTTP_OK);
    }

    #[Route('/favorite/${userId}/${productId}/delete', name: 'remove_favorite', methods: ['DELETE'])]
    public function removeFavorite(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $product = $entityManager->getRepository(Product::class)->find($data['productId']);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé.'], JsonResponse::HTTP_OK);
        }
    }


    #[Route('/favorite/show', name: 'app_favorite_show', methods: ['GET'])]
    public function show(FavoriteRepository $favoriteRepository, ProductRepository $productRepository): JsonResponse
    {
        $user = $this->getUser(); // Récupérer l'utilisateur authentifié
    
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        // Récupérer tous les favoris pour l'utilisateur connecté
        $favorites = $favoriteRepository->findBy(['user' => $user]);
    
        if (empty($favorites)) {
            return new JsonResponse(['error' => 'Aucun favori trouvé pour cet utilisateur.'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        $productsArray = [];
        foreach ($favorites as $favorite) {
            $product = $productRepository->find($favorite->getProduct()->getId());
            if ($product) {
                $productsArray[] = [
                    'id' => $favorite->getId(),
                    'product' => [
                        'id' => $product->getId(),
                        'name' => $product->getName(),
                        'price' => $product->getPrice(),
                        'description' => $product->getDescription(),
                    ],
                ];
            }
        }
    
        return new JsonResponse($productsArray, JsonResponse::HTTP_OK);
    }
}