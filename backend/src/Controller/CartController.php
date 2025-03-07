<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Repository\CartRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/cart')]
class CartController extends AbstractController
{
    //  Ajouter un produit au panier (corrigé)
    #[Route('/add', name: 'app_cart_add', methods: ['POST'])]
    public function addToCart(Request $request, ProductRepository $productRepository, UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userId = $request->headers->get('X-USER-ID'); // ID utilisateur depuis les headers
        $productId = $data['productId'] ?? null; // 🔄 Corrigé (avant: `product_id`)
    
        // Ajout des logs pour debug
        error_log('Données reçues : ' . print_r($data, true));
        error_log('UserID reçu : ' . $userId);
        error_log('ProductID reçu : ' . $productId);
    
        if (!$userId || !$productId) {
            return new JsonResponse(['error' => 'Données manquantes.', 'userId' => $userId, 'productId' => $productId], 400);
        }
    
        // Récupérer l'utilisateur
        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable.', 'userId' => $userId], 404);
        }
    
        // Récupérer le produit
        $product = $productRepository->find($productId);
        if (!$product) {
            return new JsonResponse(['error' => 'Produit introuvable.', 'productId' => $productId], 404);
        }
    
        // Ajouter au panier
        $cartItem = new Cart();
        $cartItem->setUser($user);
        $cartItem->setProduct($product);
    
        $entityManager->persist($cartItem);
        $entityManager->flush();
    
        return new JsonResponse(['message' => 'Produit ajouté au panier.'], 201);
    }
    
    // Afficher le panier
    #[Route('/show', name: 'app_cart_show', methods: ['GET'])]
    public function showCart(Request $request, CartRepository $cartRepository, UserRepository $userRepository): JsonResponse
    {
        $userId = $request->headers->get('X-USER-ID');

        if (!$userId) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé.'], 400);
        }

        // Vérifier si l'utilisateur existe
        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
        }

        $cartItems = $cartRepository->findBy(['user' => $user]);

        if (!$cartItems) {
            return new JsonResponse(['message' => 'Panier vide.'], 404);
        }

        $cartArray = [];
        foreach ($cartItems as $cartItem) {
            $product = $cartItem->getProduct();

            if ($product) {
                $cartArray[] = [
                    'cartid' => $cartItem->getId(),
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'description' => $product->getDescription(),
                    'price' => $product->getPrice(),
                ];
            }
        }

        return new JsonResponse($cartArray, 200);
    }

    // ✅ Supprimer un produit du panier
    #[Route('/delete/{id}', name: 'app_cart_delete', methods: ['DELETE'])]
    public function deleteFromCart(int $id, CartRepository $cartRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $cartItem = $cartRepository->find($id);

        if (!$cartItem) {
            return new JsonResponse(['message' => 'Produit non trouvé dans le panier.'], 404);
        }

        $entityManager->remove($cartItem);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit supprimé du panier.'], 200);
    }
}
