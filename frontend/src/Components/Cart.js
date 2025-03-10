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
    
                console.log("Données du panier:", response.data); // Vérifie la structure de la réponse
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

     // Fonction pour passer la commande
     const handleOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
    
            // Vérifier si le panier n'est pas vide
            if (cart.length === 0) {
                setErrorMessage('Panier vide ou non trouvé.');
                return;
            }
    
            // Utiliser cart[0].cart_id pour récupérer l'ID du panier
            const cartId = cart[0].cart_id;  // Notez l'usage de `cart_id` ici
    
            // Log des données envoyées pour déboguer
            console.log('Données envoyées dans l\'API Order:');
            console.log('Token:', token);
            console.log('User ID:', userId);
            console.log('Cart ID:', cartId); // Vérifie que cartId est bien l'ID du panier global
    
            // Vérifie que l'ID du panier est valide
            if (!cartId) {
                setErrorMessage('Cart ID non valide.');
                return;
            }
    
            // Faire la requête pour ajouter la commande
            const response = await axios.post(`http://localhost:8000/order/Add`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-USER-ID': userId,
                    'X-CART-ID': cartId,  // Assure-toi d'envoyer le bon ID du panier
                },
            });
    
            // Log de la réponse de l'API
            console.log('Réponse de l\'API:', response.data);
    
            // Réponse en cas de succès
            setSuccessMessage('Commande réussie.');
            setCart([]); // Vider le panier après la commande
    
        } catch (error) {
            // Log des erreurs en cas d'échec de la requête
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
