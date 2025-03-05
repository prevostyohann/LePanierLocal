<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Trader;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use App\Repository\TraderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class MessageController extends AbstractController
{
    // Route pour récupérer les messages pour un utilisateur
    #[Route('/api/messages/user/{userId}', name: 'get_user_messages')]
    public function getMessagesForUser(int $userId, UserRepository $userRepository, MessageRepository $messageRepository): JsonResponse
    {
        // Chercher l'utilisateur avec l'ID fourni
        $user = $userRepository->find($userId);
        
        // Vérifier si l'utilisateur existe
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        // Récupérer les messages associés à cet utilisateur
        $messages = $messageRepository->findBy(['user' => $user]);

        // Retourner les messages
        return new JsonResponse($messages, JsonResponse::HTTP_OK);
    }

    // Route pour récupérer les messages pour un trader
    #[Route('/api/messages/trader/{traderId}', name: 'get_trader_messages')]
    public function getMessagesForTrader(int $traderId, TraderRepository $traderRepository, MessageRepository $messageRepository): JsonResponse
    {
        // Chercher le trader avec l'ID fourni
        $trader = $traderRepository->find($traderId);
        
        // Vérifier si le trader existe
        if (!$trader) {
            throw $this->createNotFoundException('Trader non trouvé');
        }

        // Récupérer les messages associés à ce trader
        $messages = $messageRepository->findBy(['trader' => $trader]);

        // Retourner les messages
        return new JsonResponse($messages, JsonResponse::HTTP_OK);
    }
}
