import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyAppNav from './Nav';
import '../styles/DetailTrader.css';

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
            <div className="container mt-4">
                {/* Informations de la boutique */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1>{trader.name}</h1>
                        <p>{trader.description}</p>
                        <p><strong>Email:</strong> {trader.email}</p>
                        <p><strong>Phone:</strong> {trader.phone}</p>
                        <p><strong>Address:</strong> {trader.address}</p>
                        <p><strong>Hours of Operation:</strong> {trader.hours_of_operation}</p>
                        <p><strong>SIRET:</strong> {trader.siret}</p>
                    </div>
                </div>
    
                <div className="row mb-4">
                    <div className="col-12 col-md-6">
                        <img
                            src={trader.profile_picture}
                            alt={`${trader.name}'s profile`}
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                </div>
    
                {/* Section des produits */}
                <h2>Products</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                
                <ul className="list-unstyled">
                    {products.map(product => (
                        <li key={product.id} className="card mb-3">
                            <div className="card-body">
                                <h3 className="card-title">{product.name}</h3>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Prix:</strong> {product.price} €</p>
                                
                                <div className="form-group">
                                    <label>Quantité :</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[product.id] || 1}
                                        onChange={(e) => handleQuantityChange(e, product.id)}
                                        className="form-control w-25 d-inline-block"
                                    />
                                </div>
    
                                <button
                                    className="details-trader-product-item button"
                                    onClick={() => addToFavorites(product.id)}
                                >
                                    Ajouter aux favoris
                                </button>
                                <button
                                    className="details-trader-product-item button"
                                    onClick={() => addToCart(product.id)}
                                >
                                    🛒 Ajouter au panier
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
    
                {successMessage && <p className="text-success">{successMessage}</p>}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default DetailsTrader;