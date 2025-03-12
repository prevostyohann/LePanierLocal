<?php

namespace App\Controller;

use App\Entity\Trader;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TraderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TraderController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/trader/{id}', name: 'trader_details', methods: ['GET'])]
    public function getTraderDetails(int $id): JsonResponse
    {
        $trader = $this->entityManager->getRepository(Trader::class)->find($id);

        if (!$trader) {
            return new JsonResponse(['error' => 'Trader not found'], 404);
        }

        $products = $this->entityManager->getRepository(Product::class)->findBy(['trader' => $id]);

        return new JsonResponse([
            'trader' => [
                'id' => $trader->getId(),
                'name' => $trader->getName(),
                'description' => $trader->getDescription(),
                'email' => $trader->getEmail(),
                'phone' => $trader->getPhone(),
                'address' => $trader->getAddress(),
                'hours_of_operation' => $trader->getHoursOfOperation(),
                'siret' => $trader->getSiret(),
                'profile_picture' => $trader->getProfilePicture(),
            ],
            'products' => array_map(function($product) {
                return [
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'description' => $product->getDescription(),
                    'price' => $product->getPrice(),
                    'reference' => $product->getReference(),
                ];
            }, $products)
        ]);
    }

    #[Route('/api/traders', name: 'trader_list', methods: ['GET'])]
    public function getTraders(TraderRepository $traderRepository): JsonResponse
    {
        // Récupérer tous les traders depuis le repository
        $traders = $traderRepository->findAll();

        // Transformer en tableau de données
        $tradersArray = [];
        foreach ($traders as $trader) {
            $tradersArray[] = [
                'id' => $trader->getId(),
                'name' => $trader->getName(),
                'description' => $trader->getDescription(),
                'email' => $trader->getEmail(),
                'phone' => $trader->getPhone(),
                'address' => $trader->getAddress(),
                'hours_of_operation' => $trader->getHoursOfOperation(),
                'siret' => $trader->getSiret(),
                'profile_picture' => $trader->getProfilePicture(),
            ];
        }

        // Retourner la réponse JSON
        return new JsonResponse($tradersArray, JsonResponse::HTTP_OK);
    }
}