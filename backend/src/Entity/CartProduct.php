<?php
 
namespace App\Entity;
 
use App\Repository\CartProductRepository;
use Doctrine\ORM\Mapping as ORM;
 
 
#[ORM\Entity(repositoryClass: CartProductRepository::class)]
class CartProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'cartProducts')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Order $order = null;
 
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;
 
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cart $cart = null;
 
    #[ORM\Column]
    private ?int $quantity = null;
 
    public function getId(): ?int
    {
        return $this->id;
    }
 
    public function getProduct(): ?Product
    {
        return $this->product;
    }
 
    public function setProduct(?Product $product): static
    {
        $this->product = $product;
 
        return $this;
    }
 
    public function getCart(): ?Cart
    {
        return $this->cart;
    }
 
    public function setCart(?Cart $cart): static
    {
        $this->cart = $cart;
 
        return $this;
    }
 
    public function getQuantity(): ?int
    {
        return $this->quantity;
    }
 
    public function setQuantity(int $quantity): static
{
    if ($quantity <= 0) {
        $this->quantity = 1;  //definir une quantité par defaut soit 1
    } else {
        $this->quantity = $quantity;
    }
 
    return $this;
}

    public function getOrder(): ?Order
    {
        return $this->order;
    }

    public function setOrder(?Order $order): self
    {
        $this->order = $order;

        return $this;
    }
}
 