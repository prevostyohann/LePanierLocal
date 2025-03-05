<?

use App\Entity\Trader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class TraderController extends AbstractController
{
    #[Route('/api/traders', name: 'get_traders', methods: ['GET'])]
    public function getTraders(EntityManagerInterface $entityManager): JsonResponse
    {
        $traders = $entityManager->getRepository(Trader::class)->findAll();
        
        $tradersData = [];
        foreach ($traders as $trader) {
            $tradersData[] = [
                'id' => $trader->getId(),
                'name' => $trader->getName(),
                'description' => $trader->getDescription(),
            ];
        }

        return new JsonResponse($tradersData, Response::HTTP_OK);
    }
}
