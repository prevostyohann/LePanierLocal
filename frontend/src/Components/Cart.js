import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
import "../styles/Cart.css"; // Assure-toi que le fichier CSS est bien importé

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('user_id');

                if (!token || !userId) {
                    setErrorMessage('Utilisateur non trouvé. Veuillez vous reconnecter.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:8000/cart/show', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId,
                    },
                });

                setCart(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Erreur lors du chargement du panier.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // ✅ Supprimer un produit du panier
    const handleDelete = async (cartId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/cart/delete/${cartId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Mettre à jour la liste après suppression
            setCart(cart.filter(item => item.cartid !== cartId));
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier', error);
        }
    };

   // Fonction pour commander
   const handleOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            // Vérifiez si vous avez un panier valide
            const cartId = cart.length > 0 ? cart[0].cartid : null; // Vous prenez ici l'ID du premier panier

            // Si vous voulez être sûr d'avoir un panier actif, vous pouvez choisir le panier en fonction de critères comme isActive
            if (!cartId) {
                setErrorMessage('Panier vide ou non trouvé.');
                return;
            }

            console.log('id de panier :', cartId);
            console.log('UserID envoyé:', userId);

            // Faire la requête pour ajouter la commande
            const response = await axios.post(`http://localhost:8000/order/Add`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-USER-ID': userId,
                    'X-CART-ID': cartId, // Envoie l'ID du panier correspondant
                },
            });

            console.log('Commande réussie :', response.data);
            setSuccessMessage('Commande réussie.');
            setCart([]); // Vider le panier après la commande
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Erreur lors de la commande.');
            console.error('Erreur commande', error);
        }
    };

    return (
        <div className="cart-container">
            <MyAppNav />
            <div className="cart-header">
                <h2>Mon Panier</h2>
                <div className="cart-separator"></div>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {succesMessage && <p className="success-message">{succesMessage}</p>}

            {loading ? (
                <p>Chargement du panier...</p>
            ) : (
                cart.length > 0 ? (
                    <div>
                        <ul className="cart-list">
                            {cart.map((item) => (
                                <li className="cart-item" key={item.cartid}>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Prix: {item.price} €</p>
                                    <p>Quantité: {item.quantity}</p>

                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(item.cartid)}
                                    >
                                        🗑 Retirer
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="order-btn" onClick={handleOrder}>Commander</button>
                    </div>
                ) : (
                    <p>Votre panier est vide.</p>
                )
            )}
        </div>
    );
};

export default Cart;
