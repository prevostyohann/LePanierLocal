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
    public function addToCart(Request $request, CartRepository $cartRepository, ProductRepository $productRepository, UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
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
   
        // Vérifier si l'utilisateur a déjà un panier
    $cart = $cartRepository->findOneBy(['user' => $userId]);
 
    if (!$cart) {
        // Créer un nouveau panier si nécessaire
        $cart = new Cart();
        $user = $userRepository->find($userId); // Le userId est récupéré depuis les headers
    if ($user) {
        $cart->setUser($user);  // Associer l'utilisateur au panier
    }
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
    // Si le produit existe déjà dans le panier, on augmente la quantité
    $existingCartProduct->setQuantity($existingCartProduct->getQuantity() + 1);
    $entityManager->flush();
} else {
    // Sinon, on crée un nouvel enregistrement pour ce produit
    $cartProduct = new CartProduct();
    $cartProduct->setCart($cart);
    $cartProduct->setProduct($product); // Passer l'objet Product, pas l'ID
    $cartProduct->setQuantity(1); // Quantité par défaut est 1
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
 
    // Récupérer le panier de l'utilisateur
    $cart = $cartRepository->findOneBy(['user' => $user]);
 
    if (!$cart) {
        return new JsonResponse(['message' => 'Panier vide.'], 404);
    }
 
    // Récupérer les produits dans le panier
    $cartProducts = $cartProductRepository->findBy(['cart' => $cart]);
 
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
 