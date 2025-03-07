import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';

const Favoris = () => {
    const [favorites, setFavorites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('user_id');

                if (!token || !userId) {
                    setErrorMessage('Utilisateur non trouvé. Veuillez vous reconnecter.');
                    setLoading(false);
                    return;
                }

                console.log('UserID envoyé:', userId);

                const response = await axios.get('http://localhost:8000/favorite/show', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId,
                    },
                });

                console.log('Favoris récupérés :', response.data);
                setFavorites(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Erreur lors du chargement des favoris.');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

   
    const handleDelete = async (favoriteId) => {
        try {
            const token = localStorage.getItem('token');
            console.log("suppression du favori avec ID :", favoriteId);
    
            await axios.delete(`http://localhost:8000/favorite/delete/${favoriteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Met à jour la liste des favoris sans celui supprimé
            setFavorites(favorites.filter(fav => fav.favoriteid !== favoriteId));
        } catch (error) {
            console.error('Erreur lors de la suppression du favori', error.response?.data || error);
        }
    };
    

    return (
        <div>
            <MyAppNav />
            <h2>Mes Favoris</h2>

            {loading && <p>Chargement des favoris...</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {!loading && !errorMessage && favorites.length > 0 ? (
                <ul>
    {favorites.map((favorite) => (
        <li key={favorite.favoriteid}>
            <h3>{favorite.name}</h3>
            <p>{favorite.description}</p>
            <p>Prix: {favorite.price} €</p>
            <button onClick={() => handleDelete(favorite.favoriteid)}>🗑 Supprimer</button>
        </li>
    ))}
</ul>

            ) : (
                !loading && <p>Aucun favori trouvé.</p>
            )}
        </div>
    );
};

export default Favoris;