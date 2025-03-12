<?php
 
namespace App\Controller;
 
use App\Entity\Trader;
use App\Entity\Category;
use App\Entity\SubCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
 
 
 
class TraderRegisterController extends AbstractController
{
    #[Route('/registerTrader', name: 'register', methods: ['POST'])]
    public function registerTrader(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {  error_log('saluttttttttttttttttttttttttttttzejbhfizrjqBFZRBGRGMJFGNERMJGER');
        $data = json_decode($request->getContent(), true);
           
        error_log('Données reçues du frontend : ' . print_r($data, true));
 
        if (!isset($data['email'], $data['plainPassword'], $data['name'])) {
            return new JsonResponse(['error' => 'Missing parameters'], Response::HTTP_BAD_REQUEST);
        }

        $trader = new Trader();
        $trader->setName($data['name']);
        $trader->setEmail($data['email']);
        $trader->setDescription($data['description']);
        $plainPassword = $data['plainPassword'];
 
        $trader->setCreatedAt(new \DateTimeImmutable());
 
        error_log('Objet User avant le hash du mot de passe : ' . print_r($trader, true));
 
        // hash the password
        $trader->setPassword($userPasswordHasher->hashPassword($trader, $plainPassword));
 
        // Validate the trader entity
        $errors = $validator->validate($trader);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        
        if (isset($data['category'])) {
            $category = $entityManager->getRepository(Category::class)->find($data['category']);
            if ($category) {
                $trader->setCategory($category);
            } else {
                return new JsonResponse(['error' => 'Invalid category ID'], Response::HTTP_BAD_REQUEST);
            }
        }
    
        // Fetch and set the SubCategory entity
        if (isset($data['sub_category'])) {
            $subCategory = $entityManager->getRepository(SubCategory::class)->find($data['sub_category']);
            if ($subCategory) {
                $trader->setSubCategory($subCategory);
            } else {
                return new JsonResponse(['error' => 'Invalid sub-category ID'], Response::HTTP_BAD_REQUEST);
            }
        }
 
 
        $entityManager->persist($trader);
        $entityManager->flush();
 
        return new JsonResponse(['message' => 'Vous êtes bien enregistrer'], Response::HTTP_OK);
    }
}
 
 
 