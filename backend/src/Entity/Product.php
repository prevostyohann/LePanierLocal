<?php
 
namespace App\Entity;
 
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
 
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
 
    #[ORM\Column(length: 255)]
    private ?string $name = null;
 
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;
 
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?float $price = null;
 
    #[ORM\Column(length: 255)]
    private ?string $reference = null;
 
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?Trader $trader = null;
 
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?Discount $discount = null;
 
    #[ORM\ManyToOne]
    private ?Fashion $fashion = null;
 
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    private ?Stock $stock = null;
 
    public function getId(): ?int
    {
        return $this->id;
    }
 
    public function getName(): ?string
    {
        return $this->name;
    }
 
    public function setName(string $name): static
    {
        $this->name = $name;
 
        return $this;
    }
 
    public function getDescription(): ?string
    {
        return $this->description;
    }
 
    public function setDescription(string $description): static
    {
        $this->description = $description;
 
        return $this;
    }
 
    public function getPrice(): ?float
    {
        return $this->price;
    }
 
    public function setPrice(float $price): static
    {
        $this->price = $price;
 
        return $this;
    }
 
    public function getReference(): ?string
    {
        return $this->reference;
    }
 
    public function setReference(string $reference): static
    {
        $this->reference = $reference;
 
        return $this;
    }
 
    public function getTraderId(): ?Trader
    {
        return $this->trader;
    }
 
    public function setTraderId(?Trader $trader): static
    {
        $this->trader = $trader;
 
        return $this;
    }
 
    public function getDiscount(): ?Discount
    {
        return $this->discount;
    }
 
    public function setDiscount(?Discount $discount): static
    {
        $this->discount = $discount;
 
        return $this;
    }
 
    public function getFashion(): ?Fashion
    {
        return $this->fashion;
    }
 
    public function setFashion(?Fashion $fashion): static
    {
        $this->fashion = $fashion;
 
        return $this;
    }
 
    public function getStock(): ?Stock
    {
        return $this->stock;
    }
 
    public function setStock(Stock $stock): static
    {
        $this->stock = $stock;
 
        return $this;
    }
}