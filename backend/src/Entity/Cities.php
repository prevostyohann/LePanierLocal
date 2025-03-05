<?php

namespace App\Entity;

use App\Repository\CitiesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CitiesRepository::class)]

class Cities
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 8)]
    private ?string $cities_id = null;

    #[ORM\Column(length: 17)]
    private ?string $cities_departement = null;

    #[ORM\Column(length: 45)]
    private ?string $cities_slug = null;

    #[ORM\Column(length: 45)]
    private ?string $cities_real_name = null;

    #[ORM\Column(length: 125)]
    private ?string $cities_postal_code = null;

    #[ORM\Column(length: 19)]
    private ?string $cities_longitude_deg = null;

    #[ORM\Column(length: 18)]
    private ?string $cities_latitude_deg = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCitiesId(): ?string
    {
        return $this->cities_departement;
    }

    public function setCitiesId(string $cities_departement): static
    {
        $this->cities_departement = $cities_departement;

        return $this;
    }

    public function getCitiesDepartement(): ?string
    {
        return $this->cities_departement;
    }

    public function setCitiesDepartement(string $cities_departement): static
    {
        $this->cities_departement = $cities_departement;

        return $this;
    }

    public function getCitiesSlug(): ?string
    {
        return $this->cities_slug;
    }

    public function setCitiesSlug(string $cities_slug): static
    {
        $this->cities_slug = $cities_slug;

        return $this;
    }

    public function getCitiesRealName(): ?string
    {
        return $this->cities_real_name;
    }

    public function setCitiesRealName(string $cities_real_name): static
    {
        $this->cities_real_name = $cities_real_name;

        return $this;
    }

    public function getCitiesPostalCode(): ?string
    {
        return $this->cities_postal_code;
    }

    public function setCitiesPostalCode(string $cities_postal_code): static
    {
        $this->cities_postal_code = $cities_postal_code;

        return $this;
    }

    public function getCitiesLongitudeDeg(): ?string
    {
        return $this->cities_longitude_deg;
    }

    public function setCitiesLongitudeDeg(string $cities_longitude_deg): static
    {
        $this->cities_longitude_deg = $cities_longitude_deg;

        return $this;
    }

    public function getCitiesLatitudeDeg(): ?string
    {
        return $this->cities_latitude_deg;
    }

    public function setCitiesLatitudeDeg(string $cities_latitude_deg): static
    {
        $this->cities_latitude_deg = $cities_latitude_deg;

        return $this;
    }
}
