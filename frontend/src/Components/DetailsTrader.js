import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyAppNav from './Nav';

const DetailsTrader = () => {
    const { id } = useParams();
    const [trader, setTrader] = useState(null);
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [quantities, setQuantities] = useState({}); // Etat pour les quantités de chaque produit

    useEffect(() => {
        const fetchTraderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/trader/${id}`);
                setTrader(response.data.trader);
                setProducts(response.data.products);
                // Initialiser les quantités des produits à 1
                const initialQuantities = response.data.products.reduce((acc, product) => {
                    acc[product.id] = 1; // Par défaut, la quantité est 1
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                setErrorMessage('Erreur lors du chargement des détails du trader.');
            }
        };

        fetchTraderDetails();
    }, [id]);

    if (!trader) {
        return <div>Loading...</div>;
    }

    const addToFavorites = async (productId) => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        if (!user_id || !token) {
            setErrorMessage('Utilisateur non trouvé. Veuillez vous reconnecter.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/favorite/add',
                { userId: user_id, productId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage('Produit ajouté aux favoris !');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Une erreur est survenue.');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            const cartId = localStorage.getItem('cart_id')

            if (!token || !userId) {
                setErrorMessage('Veuillez vous connecter pour ajouter au panier.');
                return;
            }

            const quantity = quantities[productId]; // Utiliser la quantité spécifique pour ce produit

            if (quantity <= 0) {
                setErrorMessage('La quantité doit être supérieure à zéro.');
                return;
            }

            const payload = { 
                userId: parseInt(userId), 
                productId: parseInt(productId), 
                quantity: quantities[productId]  // Utilise la quantité actuelle de ce produit
            };
            
            const response = await axios.post('http://localhost:8000/cart/add',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId,
                        'Content-Type': 'application/json',
                        'cartId': cartId
                    },
                }
            );
            console.log('Réponse du serveur:', response.data);
            
            // Vérifier si le produit est déjà dans le panier
            if (response.data.productAlreadyInCart) {
                // Si le produit existe déjà, mettre à jour la quantité dans l'état
                setQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [productId]: prevQuantities[productId] + quantity // Ajouter la quantité au produit existant
                }));
            } else {
                setSuccessMessage(response.data.message || 'Produit ajouté au panier.');
            }

        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Erreur lors de l\'ajout au panier.');
            console.error('Erreur lors de l\'ajout au panier:', error.response?.data);
        }
    };

    const handleQuantityChange = (e, productId) => {
        setQuantities({
            ...quantities,
            [productId]: parseInt(e.target.value), // Mettre à jour la quantité du produit spécifique
        });
    };

    return (
        <div>
            <MyAppNav />
            <div>
                <h1>{trader.name}</h1>
                <p>{trader.description}</p>
                <p>Email: {trader.email}</p>
                <p>Phone: {trader.phone}</p>
                <p>Address: {trader.address}</p>
                <p>Hours of Operation: {trader.hours_of_operation}</p>
                <p>SIRET: {trader.siret}</p>
                <img src={trader.profile_picture} alt={`${trader.name}'s profile`} />

                <h2>Products</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Prix: {product.price} €</p>
                            <div>
                                <label>Quantité :</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[product.id] || 1} // Affiche la quantité spécifique
                                    onChange={(e) => handleQuantityChange(e, product.id)} // Met à jour la quantité de ce produit
                                />
                            </div>

                            <button onClick={() => addToFavorites(product.id)}>Ajouter aux favoris</button>
                            <button onClick={() => addToCart(product.id)}>🛒 Ajouter au panier</button>
                        </li>
                    ))}
                </ul>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default DetailsTrader;
