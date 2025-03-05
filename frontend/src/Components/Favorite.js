import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
 
const Favoris = () => {
    const [favorites, setFavorites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        // Appel de l'API pour récupérer les favoris de l'utilisateur connecté
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setErrorMessage('Token non trouvé. Veuillez vous reconnecter.');
                    setLoading(false);
                    return;
                }
 
                const response = await axios.get('http://localhost:8000/favorite/show', {
                    headers: {
                        'X-API-TOKEN': token,
                    },
                });
 
                console.log('Données des favoris :', response.data);
 
                setFavorites(response.data); // Met à jour l'état avec les favoris
                setLoading(false);
            } catch (error) {
                setErrorMessage('Erreur lors du chargement des favoris.');
                setLoading(false);
            }
        };
 
        fetchFavorites();
    }, []); // Le tableau vide [] signifie que l'appel est effectué une seule fois au montage du composant
 
    return (
        <div>
        <MyAppNav />
            <h2>Mes Favoris</h2>
 
            {loading && <p>Chargement des favoris...</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
 
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((favorite) => (
                        <li key={favorite.id}>
                            <h3>{favorite.product.name}</h3>
                            <p>{favorite.product.description}</p>
                            <p>Prix: {favorite.product.price} €</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun favori trouvé.</p>
            )}
        </div>
    );
};
 
export default Favoris;