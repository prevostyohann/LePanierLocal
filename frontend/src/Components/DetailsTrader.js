import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyAppNav from './Nav';
 
 
const DetailsTrader = () => {
    const { id } = useParams();
    //const [user, setUser] = useState(null);
    const [trader, setTrader] = useState(null);
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [quantity, setQuantity] = useState(1);
 
   
 
    useEffect(() => {
        const fetchTraderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/trader/${id}`);
                setTrader(response.data.trader);
                setProducts(response.data.products);
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
                { userId: user_id, productId },  // Envoi de l'ID utilisateur et du produit
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,  // Toujours envoyer le token
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
 
            if (quantity <= 0) {
                setErrorMessage('La quantité doit être supérieure à zéro.');
                return;
            }
   
            const payload = { userId: parseInt(userId), productId: parseInt(productId), quantity: quantity }; // 🔄 Correction
   
            console.log('Données envoyées:', payload);
   
            const response = await axios.post('http://localhost:8000/cart/add',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId, // 🔄 Ajout de l'ID utilisateur dans les headers
                        'Content-Type': 'application/json',
                        'cartId' : cartId
                    },
                }
            );
   
            console.log('Réponse du serveur:', response.data);
            setSuccessMessage(response.data.message || 'Produit ajouté au panier.');
           
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Erreur lors de l\'ajout au panier.');
            console.error('Erreur lors de l\'ajout au panier:', error.response?.data);
           
        }
    };
   
   
 
 
    return (
        <div>
        <MyAppNav/>
        <div>    
            <h1>{trader.name}</h1>
            <p>{trader.description}</p>
            <p>Email: {trader.email}</p>
            <p>Phone: {trader.phone}</p>
            <p>Address: {trader.address}</p>
            <p>Hours of Operation: {trader.hours_of_operation}</p>
            <p>SIRET: {trader.siret}</p>
            <img src={trader.profile_picture} alt={`${trader.name}'s profile`} />
 
            {/* Ajouter le composant SendMessage pour envoyer des messages */}
            {/* {user && (
                <SendMessage
                    recipientId={id}
                    senderId={user.id}  // Utilise user.id ici au lieu de `localStorage.getItem('userId')`
                />
            )} */}
 
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
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
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