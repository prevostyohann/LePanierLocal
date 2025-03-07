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

            <h2>Products</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Prix: {product.price} €</p>
                        
                        <button onClick={() => addToFavorites(product.id)}>Ajouter aux favoris</button>
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