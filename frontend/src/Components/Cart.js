import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
 
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
 
                console.log('UserID envoyé:', userId);
 
                const response = await axios.get('http://localhost:8000/cart/show', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId,
                    },
                });
 
                console.log('Panier récupéré :', response.data);
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
        <div>
            <MyAppNav />
            <h2>Mon Panier</h2>
 
            {loading && <p>Chargement du panier...</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
 
            {!loading && !errorMessage && cart.length > 0 ? (
                <div>
                <ul>
                    {cart.map((item) => (
                        <li key={item.cartid}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Prix: {item.price} €</p>
                            <p>Quantité: {item.quantity}</p>
                            <button onClick={() => handleDelete(item.cartid)}>🗑 Retirer</button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleOrder}>Commander</button>
                </div>
            ) : (
                !loading && <p>Votre panier est vide.</p>
            )}
        </div>
    );
};
 
export default Cart;