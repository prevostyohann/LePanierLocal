<?php

namespace App\Controller;

use App\Config\OrderStatus;
use App\Entity\Order;
use App\Entity\CartProduct;
use App\Repository\ProductRepository;
use App\Entity\Cart;
use App\Repository\UserRepository;
use App\Repository\CartRepository;
use App\Repository\CartProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\OrderRepository;

#[Route(path:'/order')]
class OrderController extends AbstractController
{
    #[Route('/Add', name: 'ajout_commande', methods:['POST'])]
    public function addToOrder(
        Request $request,
        CartRepository $cartRepository,
        CartProductRepository $cartProductRepository,
        EntityManagerInterface $entityManager,
        UserRepository $userRepository
    ): JsonResponse {
        // Récupération des en-têtes
        $userId = $request->headers->get('X-USER-ID');
        $cartId = $request->headers->get('X-CART-ID');
        error_log('UserID reçu : ' . $userId);  // Log pour l'ID utilisateur
        error_log('CartID reçu : ' . $cartId);  // Log pour l'ID du panier
        
        // Vérifier si les paramètres sont valides
        if (!$cartId || !$userId) {
            error_log('Erreur : ID du panier ou de l\'utilisateur manquant.');  // Log pour l'erreur
            return new JsonResponse(['error' => 'ID du panier ou de l\'utilisateur manquant.'], 400);
        }
        
        // Vérifier que l'utilisateur existe
        $user = $userRepository->find($userId);
        if (!$user) {
            error_log('Erreur : Utilisateur introuvable.');  // Log pour l'erreur
            return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
        }
        
        // Récupérer le panier actuel
        $cart = $cartRepository->findOneBy(['id' => $cartId, 'user' => $user]);
        if (!$cart) {
            error_log('Erreur : Panier introuvable ou non associé à cet utilisateur.');  // Log pour l'erreur
            return new JsonResponse(['error' => 'Panier introuvable ou non associé à cet utilisateur.'], 404);
        }
        
        // Récupérer les produits du panier
        $cartProducts = $cartProductRepository->findBy(['cart' => $cart]);
        if (!$cartProducts) {
            error_log('Erreur : Aucun produit trouvé dans le panier.');  // Log pour l'erreur
            return new JsonResponse(['error' => 'Aucun produit trouvé dans le panier.'], 404);
        }
        
        try {
            // Créer une nouvelle commande
            error_log('Début de la création de la commande');  // Log pour le début de la commande
            $order = new Order();
            $order->setUser($user);
            $order->setCart($cart);
            $order->setCreatedAt(new \DateTimeImmutable());
        
            // Calculer le montant total
            $totalAmount = 0;
            foreach ($cartProducts as $cartProduct) {
                $totalAmount += $cartProduct->getQuantity() * $cartProduct->getProduct()->getPrice();
            }
            $order->setTotalAmount($totalAmount);
            
            // Générer un numéro de commande
            $orderNumber = (int) rand(1000, 9999);  // Assurer que c'est un entier
            $order->setOrderNumber($orderNumber);
            
            // Définir le statut de la commande (ex : "PENDING")
            $order->setStatus(OrderStatus::PENDING);  // Définir un statut par défaut
            
            error_log('Numéro de commande généré : ' . $orderNumber);  // Log pour le numéro de commande
            
            // Sauvegarder la commande
            $entityManager->persist($order);
            $entityManager->flush();
            
            // Créer un nouveau panier vide pour l'utilisateur (sans ajouter les produits de l'ancien panier)
            error_log('Création d\'un nouveau panier vide pour l\'utilisateur ' . $userId);  // Log pour la création d'un nouveau panier
            $newCart = new Cart();
            $newCart->setUser($user);
            $entityManager->persist($newCart);
            $entityManager->flush(); // On sauvegarde pour avoir un ID
            
            error_log('Nouveau panier créé avec ID : ' . $newCart->getId());  // Log pour l'ID du nouveau panier
            
            // Associer les produits à la commande, sans les supprimer
            foreach ($cartProducts as $cartProduct) {
                $cartProduct->setOrder($order);  // Associer chaque produit à la commande
                $entityManager->persist($cartProduct);  // Sauvegarder le changement
            }
            
            $entityManager->flush();
            
            // Retourner l'ID du nouveau panier et de la commande
            error_log('Retour des informations de la commande et du nouveau panier.');  // Log avant de retourner la réponse
            return new JsonResponse([
                'message' => 'Commande réussie.',
                'order_id' => $order->getId(),
                'new_cart_id' => $newCart->getId(),
                'created_at' => $order->getCreatedAt(),
            ], 201);
            
        } catch (\Exception $e) {
            error_log('Erreur lors de la création de la commande : ' . $e->getMessage());  // Log pour l'erreur
            return new JsonResponse(['error' => 'Erreur lors de la création de la commande.'], 500);
        }
    }
    
    

    // Afficher le panier pour un utilisateur spécifique
   // Afficher les commandes pour un utilisateur spécifique
#[Route('/show-orders/{userId}', name: 'app_order_show', methods: ['GET'])]
public function showOrders($userId, OrderRepository $orderRepository, CartProductRepository $cartProductRepository, ProductRepository $productRepository): JsonResponse
{
    // Trouver les commandes de l'utilisateur par userId
    $orders = $orderRepository->findBy(['user' => $userId]); // On filtre par user_id
    
    if (!$orders) {
        return new JsonResponse(['error' => 'Aucune commande trouvée pour cet utilisateur.'], 404);
    }

    // Tableau pour stocker les informations des commandes
    $ordersData = [];

    foreach ($orders as $order) {
        // Ajouter des informations sur chaque commande
        $orderData = [
            'order_id' => $order->getId(),
            'order_number' => $order->getOrderNumber(),
            'created_at' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
            'status' => $order->getStatus(),
            'total_amount' => $order->getTotalAmount(),
        ];

        // Récupérer les produits de la commande via la table CartProduct
        $cartProducts = $cartProductRepository->findBy(['order' => $order]); // On filtre par order_id

        $cartArray = [];
        foreach ($cartProducts as $cartProduct) {
            // Récupérer le produit à partir de l'entité CartProduct
            $product = $cartProduct->getProduct();

            // Ajouter les informations du produit dans le tableau
            $cartArray[] = [
                'cart_product_id' => $cartProduct->getId(),
                'product_id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'quantity' => $cartProduct->getQuantity(),
            ];
        }

        // Ajouter la commande et ses produits au tableau final
        $ordersData[] = [
            'order' => $orderData,
            'products' => $cartArray
        ];
    }

    // Retourner les informations de toutes les commandes et les produits associés
    return new JsonResponse($ordersData, 200);
}
}    