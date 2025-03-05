<?php

namespace App\Controller;

use App\Entity\Trader;
use App\Repository\TraderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TraderController extends AbstractController
{
    #[Route('/api/traders', name: 'app_trader_list', methods: ['GET'])]
    public function list(TraderRepository $traderRepository): JsonResponse
    {
        error_log('saluttttt');
        // Récupérer tous les traders depuis le repository
        $traders = $traderRepository->findAll();

        // Transformer en tableau de données
        $tradersArray = [];
        foreach ($traders as $trader) {
            $tradersArray[] = [
                'id' => $trader->getId(),
                'name' => $trader->getName(),
                'description' => $trader->getDescription(),
            ];
        }

        // Retourner la réponse JSON
        return new JsonResponse($tradersArray, JsonResponse::HTTP_OK);
    }
}
