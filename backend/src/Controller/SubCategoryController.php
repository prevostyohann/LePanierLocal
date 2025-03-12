<?php

namespace App\Controller;

use App\Repository\SubCategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SubCategoryController extends AbstractController
{
    #[Route('api/subcategories', name: 'subcategories')]
    public function getSubCategories(Request $request, SubCategoryRepository $subCategoryRepository): JsonResponse
    {
        $categoryId = $request->query->get('category_id');
        $subCategories = $subCategoryRepository->findBy(['category' => $categoryId]);
        $data = [];

        foreach ($subCategories as $subCategory) {
            $data[] = [
                'id' => $subCategory->getId(),
                'name' => $subCategory->getName(),
            ];
        }

        return new JsonResponse($data);
    }
}