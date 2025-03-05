<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;



class UserRegisterController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {   error_log("ok j'suis au debut");
        $data = json_decode($request->getContent(), true);
           
        error_log('Données reçues du frontend : ' . print_r($data, true));

        if (!isset($data['email'], $data['plainPassword'], $data['username'])) {
            return new JsonResponse(['error' => 'Missing parameters'], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $plainPassword = $data['plainPassword'];

        // var_dump($user);

        // error_log('Objet User avant le hash du mot de passe : ' . print_r($user, true));

        // hash the password
        $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

        $user->setCreatedAt(new \DateTimeImmutable());

        // Validate the user entity
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_OK);
    }
}
