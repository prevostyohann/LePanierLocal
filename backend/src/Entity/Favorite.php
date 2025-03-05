<?php

namespace App\Entity;

use App\Repository\FavoriteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FavoriteRepository::class)]
class Favorite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?Trader $trader = null;

    #[ORM\ManyToOne]
    private ?Product $product = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTrader(): ?Trader
    {
        return $this->trader;
    }

    public function setTrader(?Trader $trader): static
    {
        $this->trader = $trader;

        return $this;
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
}
