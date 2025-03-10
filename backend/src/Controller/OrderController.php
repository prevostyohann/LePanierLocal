<?php
 
namespace App\Controller;
 
use App\Config\OrderStatus; //
use App\Entity\Order;
use App\Repository\UserRepository;
use App\Repository\CartRepository;
use App\Repository\CartProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
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
        error_log('UserID reçu : ' . $userId);
        error_log('CartID reçu : ' . $cartId);
    
        // Vérifier si les paramètres sont valides
        if (!$cartId || !$userId) {
            return new JsonResponse(['error' => 'ID du panier ou de l\'utilisateur manquant.'], 400);
        }
    
        // Vérifier que l'utilisateur existe
        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
        }
    
        // Récupérer le panier associé à l'ID du panier et à l'utilisateur
        $cart = $cartRepository->findOneBy(['id' => $cartId, 'user' => $userId]);
        if (!$cart) {
            return new JsonResponse(['error' => 'Panier introuvable ou non associé à cet utilisateur.'], 404);
        }
    
        // Récupérer les produits du panier
        $cartProducts = $cartProductRepository->findBy(['cart' => $cart]);
        if (!$cartProducts) {
            return new JsonResponse(['error' => 'Aucun produit trouvé dans le panier.'], 404);
        }
    
        try {
            // Créer une nouvelle commande
            $order = new Order();
            $order->setUser($user); // Associer l'utilisateur à la commande
            $order->setCart($cart); // Associer le panier à la commande
            $order->setCreatedAt(new \DateTimeImmutable());
    
            // Calculer le montant total de la commande
            $totalAmount = 0;
            foreach ($cartProducts as $cartProduct) {
                $totalAmount += $cartProduct->getQuantity() * $cartProduct->getProduct()->getPrice();
            }
            $order->setTotalAmount($totalAmount);
    
            // Définir un numéro de commande (par exemple, générer un numéro unique)
            $order->setOrderNumber(rand(1000, 9999)); // À remplacer par une logique plus robuste si nécessaire
    
            // Définir un statut (par exemple, "En attente")
            $order->setStatus(OrderStatus::PENDING); // Assurez-vous d'utiliser un statut valide de l'énumération
    
            // Sauvegarder la commande et ses produits associés
            $entityManager->persist($order);
            $entityManager->flush();
    
            // Retourner une réponse avec succès
            return new JsonResponse(['message' => 'Commande réussie.', 'order_id' => $order->getId(), 'created_at' => $order->getCreatedAt()], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors de la création de la commande.'], 500);
        }
    }
 
 
   // Afficher le panier pour un utilisateur spécifique
    #[Route('/show', name: 'affiche_commande', methods: ['GET'])]
    public function showCart(Request $request, CartRepository $cartRepository, CartProductRepository $cartProductRepository, UserRepository $userRepository): JsonResponse
    {
    $userId = $request->headers->get('X-USER-ID'); // Récupération de l'ID utilisateur depuis les en-têtes
 
    // Vérifiez si l'utilisateur existe dans la base de données
    $user = $userRepository->find($userId);
    if (!$user) {
        return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
    }
 
    // Récupérer le panier de l'utilisateur (là, vous devez filtrer par utilisateur)
    $cart = $cartRepository->findOneBy(['user' => $user]); // Trouver le panier du user
 
    // Si aucun panier n'est trouvé, retournez une erreur
    if (!$cart) {
        return new JsonResponse(['message' => 'Panier vide.'], 404);
    }
 
    // Récupérer les produits dans ce panier
    $cartProducts = $cartProductRepository->findBy(['cart' => $cart]);
 
    // Créez une réponse contenant les informations du panier
    $cartArray = [];
    foreach ($cartProducts as $cartProduct) {
        $product = $cartProduct->getProduct();
        $cartArray[] = [
            'cartid' => $cartProduct->getId(),
            'product_id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'quantity' => $cartProduct->getQuantity(),
        ];
    }
 
    return new JsonResponse($cartArray, 200);
}
}