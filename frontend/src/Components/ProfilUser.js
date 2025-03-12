import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
import '../styles/ProfilUser.css';

const Commandes = () => {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Récupérer le token et l'ID utilisateur depuis localStorage
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('user_id'); // Assurez-vous que l'ID est stocké dans localStorage

                if (!token || !userId) {
                    // Si l'utilisateur ou le token n'est pas présent, on affiche un message d'erreur
                    setErrorMessage('Utilisateur non trouvé. Veuillez vous reconnecter.');
                    setLoading(false);
                    return;
                }

                // Effectuer la requête pour récupérer les commandes de l'utilisateur
                const response = await axios.get(`http://localhost:8000/order/show-orders/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId, // Passer l'ID utilisateur dans les en-têtes
                    },
                });

                // Mettre à jour les commandes avec la réponse reçue
                setOrders(response.data);
            } catch (error) {
                // Afficher un message d'erreur en cas d'échec
                setErrorMessage(error.response?.data?.message || 'Erreur lors du chargement des commandes.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []); // Appeler cette fonction une seule fois au montage du composant

    return (
        <div className="command-container">
            <MyAppNav />
            <div className="command-header">
                <h2 className="command-title">Mes Commandes</h2>
                <div className="command-separator"></div> {/* Barre de séparation sous le titre */}
            </div>

            {errorMessage && <p className="command-error-message">{errorMessage}</p>} {/* Afficher un message d'erreur si nécessaire */}

            <div className="command-list">
                {loading ? (
                    <p>Chargement des commandes...</p> // Message pendant le chargement
                ) : orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="command-card" key={order.order.order_id}>
                            <div className="command-info">
                                <h3>Commande ID: {order.order.order_id}</h3>
                                <p><strong>Numéro de commande:</strong> {order.order.order_number}</p>
                                <p><strong>Date de création:</strong> {order.order.created_at}</p>
                                <p><strong>Statut:</strong> {order.order.status}</p>
                                <p><strong>Montant total:</strong> {order.order.total_amount}€</p>

                                <div className="command-products">
                                    <h4>Produits :</h4>
                                    <ul>
                                        {order.products.map((product) => (
                                            <li key={product.cart_product_id}>
                                                <strong>{product.name}</strong> - {product.quantity} x {product.price}€
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucune commande trouvée.</p> // Message si aucune commande n'est trouvée
                )}
            </div>
        </div>
    );
};

export default Commandes;
