<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Trader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        // Récupération des données de la requête
        $data = json_decode($request->getContent(), true);

        error_log('Donnée reçue du front : ' . print_r($data, true));

        // Vérification des paramètres requis dans la requête
        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['error' => 'Missing parameters'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Recherche dans la table User
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    
        // Si aucun User trouvé, chercher dans la table Trader
        if (!$user) {
            $user = $entityManager->getRepository(Trader::class)->findOneBy(['email' => $data['email']]);
        }

        // Si aucun utilisateur trouvé dans les deux tables
        if (!$user) {
            return new JsonResponse(['error' => 'Email invalide'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Vérification du mot de passe
        if (!$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Mot de passe invalide'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Générer un token unique pour l'utilisateur (ou commerçant)
        $token = bin2hex(random_bytes(32));

        error_log('token envoyé : ' . print_r($token, true));


        // Si vous avez un champ pour stocker le token dans vos entités (User ou Trader)
        // Vous pouvez décommenter cette ligne si nécessaire :
        // $user->setApiToken($token);

        // Persister les changements
        $entityManager->persist($user);
        $entityManager->flush();

        // Retourner le token et l'ID de l'utilisateur ou commerçant
        return new JsonResponse([
            'token' => $token,
            'user_id' => $user->getId(),
            'type' => ($user instanceof User) ? 'user' : 'trader'
        ], JsonResponse::HTTP_OK);
    }
}
