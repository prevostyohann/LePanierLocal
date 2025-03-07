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
{#[Route('/favorite/add', name: 'add_favorite', methods: ['POST'])]
    public function addFavorite(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository): JsonResponse
    {
        // Récupérer le token dans le header Authorization
        $authHeader = $request->headers->get('Authorization');
    
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return new JsonResponse(['error' => 'Token manquant ou invalide.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        // Récupérer les données envoyées (userId + productId)
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['userId'], $data['productId'])) {
            return new JsonResponse(['error' => 'Données invalides.'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        // Trouver l'utilisateur avec l'ID envoyé
        $user = $userRepository->find($data['userId']);
    
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        // Vérifier si le produit existe
        $product = $entityManager->getRepository(Product::class)->find($data['productId']);
        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        // Vérifier si le produit est déjà en favoris
        $existingFavorite = $entityManager->getRepository(Favorite::class)
            ->findOneBy(['user' => $user, 'product' => $product]);
    
        if ($existingFavorite) {
            return new JsonResponse(['error' => 'Produit déjà ajouté aux favoris.'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        // Ajouter aux favoris
        $favorite = new Favorite();
        $favorite->setUser($user);
        $favorite->setProduct($product);
    
        $entityManager->persist($favorite);
        $entityManager->flush();
    
        return new JsonResponse(['message' => 'Produit ajouté aux favoris.'], JsonResponse::HTTP_OK);
    }
    
    

    #[Route('/favorite/delete/{id}', name: 'app_favorite_delete', methods: ['DELETE'])]
    public function deleteFavorite(string $id, FavoriteRepository $favoriteRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = (int) $id; 
    
        $favorite = $favoriteRepository->find($id);
    
        if (!$favorite) {
            return new JsonResponse(['message' => 'Favori non trouvé.'], 404);
        }
    
        $entityManager->remove($favorite);
        $entityManager->flush();
    
        return new JsonResponse(['message' => 'Favori supprimé avec succès.'], 200);
    }
    

    //     // Préparation des données des produits favoris
    #[Route('/favorite/show', name: 'app_favorite_show', methods: ['GET'])]
    public function showFavorites(Request $request, FavoriteRepository $favoriteRepository, ProductRepository $productRepository): JsonResponse
    { 
        // Récupérer l'ID utilisateur depuis les headers
        $user_id = $request->headers->get('X-USER-ID');
    
        if (!$user_id || !ctype_digit($user_id)) {
            return new JsonResponse(['error' => 'ID utilisateur invalide.'], 400);
        }
    
        // Récupérer les favoris de l'utilisateur
        $favorites = $favoriteRepository->findBy(['user' => $user_id]);
    
        if (!$favorites) {
            return new JsonResponse(['message' => 'Aucun favori trouvé pour cet utilisateur.'], 404);
        }
    
        $favoritesArray = [];
        foreach ($favorites as $favorite) {
            $product = $favorite->getProduct(); // Correct : récupérer l'objet Product
        
            if ($product) {
                $favoritesArray[] = [
                    'favoriteid' => $favorite->getId(),
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'description' => $product->getDescription(),
                    'price' => $product->getPrice(),
                ];
            }
        }
        
    
        return new JsonResponse($favoritesArray, 200);
    }
};