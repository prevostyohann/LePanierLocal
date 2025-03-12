<?php
 
namespace App\Controller;
 
use App\Entity\Cart;
use App\Entity\CartProduct;
use App\Repository\CartProductRepository;
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
    public function addToCart(
        Request $request, 
        CartRepository $cartRepository, 
        ProductRepository $productRepository, 
        UserRepository $userRepository, 
        EntityManagerInterface $entityManager
    ): JsonResponse {
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
    
        // Vérifier si l'utilisateur existe
        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
        }
    
        // Récupérer le dernier panier associé à cet utilisateur (par ID décroissant, donc le panier le plus récent)
        $cart = $cartRepository->findOneBy(
            ['user' => $userId],
            ['id' => 'DESC'] // Trier par ID, l'ID le plus grand est le plus récent
        );
    
        if (!$cart) {
            // Créer un nouveau panier si nécessaire
            $cart = new Cart();
            $cart->setUser($user);  // Associer l'utilisateur au panier
            $entityManager->persist($cart);
            $entityManager->flush();
        }
    
        // Vérifier si le produit existe
        $product = $productRepository->find($productId);
        if (!$product) {
            return new JsonResponse(['error' => 'Produit introuvable.'], 404);
        }
    
        // Vérifier si le produit est déjà dans le panier
        $existingCartProduct = $entityManager->getRepository(CartProduct::class)->findOneBy([
            'cart' => $cart,
            'product' => $product
        ]);
    
        if ($existingCartProduct) {
            // Si le produit existe déjà dans le panier, on augmente la quantité avec celle envoyée depuis le frontend
            $newQuantity = $existingCartProduct->getQuantity() + $data['quantity']; // Utilise la quantité envoyée
            $existingCartProduct->setQuantity($newQuantity);
            $entityManager->flush();
        } else {
            // Sinon, on crée un nouvel enregistrement pour ce produit avec la quantité envoyée
            $cartProduct = new CartProduct();
            $cartProduct->setCart($cart);
            $cartProduct->setProduct($product); // Passer l'objet Product, pas l'ID
            $cartProduct->setQuantity($data['quantity']); // Utilise la quantité envoyée
            $entityManager->persist($cartProduct);
            $entityManager->flush();
        }
    
        return new JsonResponse(['message' => 'Produit ajouté au panier.'], 201);
    }
    
    
   
    // Afficher le panier
    #[Route('/show', name: 'app_cart_show', methods: ['GET'])]
    public function showCart(Request $request, CartRepository $cartRepository, CartProductRepository $cartProductRepository, UserRepository $userRepository): JsonResponse
    {
        $userId = $request->headers->get('X-USER-ID');
     
        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable.'], 404);
        }
    
        // Récupérer le panier le plus récent de l'utilisateur
        $cart = $cartRepository->findOneBy(
            ['user' => $user], 
            ['id' => 'DESC'] // Trier par ID décroissant pour récupérer le panier le plus récent
        );
    
        if (!$cart) {
            return new JsonResponse(['message' => 'Panier vide.'], 404);
        }
    
        // Récupérer les produits dans le panier
        $cartProducts = $cartProductRepository->findBy(['cart' => $cart]);
    
        $cartArray = [];
        foreach ($cartProducts as $cartProduct) {
            $product = $cartProduct->getProduct();
            $cartArray[] = [
                'cart_id' => $cart->getId(), // ID du panier global
                'cart_product_id' => $cartProduct->getId(), // ID du produit dans le panier
                'product_id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'quantity' => $cartProduct->getQuantity(),
            ];
        }
     
        return new JsonResponse($cartArray, 200);
    }
    
 
    // ✅ Supprimer un produit du panier
    #[Route('/delete/{id}', name: 'app_cart_delete', methods: ['DELETE'])]
    public function deleteFromCart(int $id, CartRepository $cartRepository, CartProductRepository $cartProductRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $cartProductItem = $cartProductRepository->find($id);
 
        if (!$cartProductItem) {
            return new JsonResponse(['message' => 'Produit non trouvé dans le panier.'], 404);
        }
 
        $entityManager->remove($cartProductItem);
        $entityManager->flush();
 
        return new JsonResponse(['message' => 'Produit supprimé du panier.'], 200);
    }
}
 