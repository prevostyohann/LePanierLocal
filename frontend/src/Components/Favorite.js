import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
import "../styles/Favoris.css"; // Assure-toi que le fichier CSS est bien importé

const apiUrl = process.env.REACT_APP_API_URL;

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

                const response = await axios.get(`${apiUrl}/favorite/show`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-USER-ID': userId,
                    },
                });

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
            await axios.delete(`${apiUrl}/favorite/delete/${favoriteId}`, {
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
        <div className="favoris-container">
            <MyAppNav />
            <div className="favoris-header">
                <h2 className="favoris-title">Mes Favoris</h2>
                <div className="favoris-separator"></div> {/* Barre de séparation sous le titre */}
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="favoris-grid">
                {loading ? (
                    <p>Chargement des favoris...</p>
                ) : favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div className="favorite-card" key={favorite.favoriteid}>
                            {/* Badge "Nouveau" ou autre option si nécessaire */}
                            <div className="favorite-image">
                                {/* Image du produit, à remplacer si disponible */}
                                <img src={favorite.image || "default_image_url"} alt={favorite.name} />
                            </div>

                            <div className="favorite-info">
                                <h3>{favorite.name}</h3>
                                <p>{favorite.description || "Aucune description disponible."}</p>
                                <p className="price">Prix: {favorite.price} €</p>

                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(favorite.favoriteid)}
                                >
                                    🗑 Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun favori trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default Favoris;
