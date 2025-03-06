import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const traderId = localStorage.getItem('trader_id');  // Récupérer l'ID du trader

        // Vérification de la validité de traderId
        if (!token || !traderId || isNaN(parseInt(traderId))) {
            window.location.href = '/login';  // Rediriger si pas de token ou trader_id invalide
        } else {
            fetchProducts(traderId);  // Passer l'ID du trader à la fonction pour récupérer les produits
        }
    }, []);  // Cette fonction ne sera appelée qu'une seule fois lors du montage du composant

    // Fonction pour récupérer les produits du trader
    const fetchProducts = async () => {
        const traderId = localStorage.getItem('trader_id');
    
        if (!traderId || isNaN(parseInt(traderId, 10))) {
            console.error("Erreur : traderId invalide", traderId);
            return; // Ne pas envoyer la requête si l'ID du trader est invalide
        }
    
        try {
            const response = await axios.get(`http://localhost:8000/product/show/${traderId}`);
            setProducts(response.data);
        } catch (error) {
            setErrorMessage('Erreur lors du chargement des produits.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const traderId = localStorage.getItem('trader_id'); // Récupérer le trader_id depuis le localStorage
        try {
            const response = await axios.post(
                'http://localhost:8000/product/new',
                {
                    name: name,
                    description: description,
                    price: price,
                    trader_id: traderId, // Inclure le trader_id dans les données envoyées
                },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            setSuccessMessage(response.data.message);
            setName('');
            setDescription('');
            setPrice('');
            fetchProducts(traderId); // Rafraîchir la liste des produits après ajout
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.join(', '));
            } else {
                setErrorMessage('Une erreur est survenue lors de l\'ajout du produit.');
            }
        }
    };

    const handleDelete = async (productId) => {
        const traderId = localStorage.getItem('trader_id');
    
        try {
            const response = await axios.delete(`http://localhost:8000/product/${productId}/delete`, {
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({ trader_id: traderId }) // Envoie l'ID du trader
            });
    
            setSuccessMessage('Produit supprimé avec succès');
            fetchProducts(); // Rafraîchir la liste des produits immédiatement
        } catch (error) {
            setErrorMessage('Erreur lors de la suppression du produit.');
        }
    };
    

    const handleEdit = async (e, productId) => {
        e.preventDefault();
        const traderId = localStorage.getItem('trader_id'); // Récupérer le trader_id depuis le localStorage

        try {
            const response = await axios.put(
                `http://localhost:8000/product/${productId}/edit`,
                {
                    name: name,
                    description: description,
                    price: price,
                    trader_id: traderId, // Inclure le trader_id dans les données envoyées
                },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            setSuccessMessage(response.data.message);
            fetchProducts(traderId); // Rafraîchir la liste des produits après modification
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.join(', '));
            } else {
                setErrorMessage('Une erreur est survenue lors de la modification.');
            }
        }
    };

    const addToFavorites = async (productId) => {
        const token = localStorage.getItem('token');  // Récupère le token du localStorage
        if (!token) {
            setErrorMessage('Token non trouvé. Veuillez vous reconnecter.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/favorite/add',  // URL de l'API pour ajouter aux favoris
                { productId },  // Corps de la requête avec l'ID du produit
                {
                    headers: {
                        'Content-Type': 'application/json',  // Définir le type de contenu en JSON
                        'X-API-TOKEN': token,  // Envoi du token dans l'en-tête X-API-TOKEN
                    },
                }
            );
            setSuccessMessage('Produit ajouté aux favoris !');
            setTimeout(() => setSuccessMessage(''), 5000); // Message de succès
            const traderId = localStorage.getItem('trader_id');
            fetchProducts(traderId);  // Rafraîchir la liste des produits
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || 'Erreur lors de l\'ajout aux favoris');
            } else {
                setErrorMessage('Une erreur est survenue.');
            }
            setTimeout(() => setErrorMessage(''), 5000);  // Affichage de l'erreur
        }
    };

    return (
        <div>
            <h2>Liste des produits</h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Prix: {product.price} €</p>
                            <button onClick={(e) => handleEdit(e, product.id)}>Modifier</button>
                            <button onClick={() => handleDelete(product.id)}>Supprimer</button>
{/*                             <button onClick={() => addToFavorites(product.id)}>Ajouter aux favoris</button>
 */}                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun produit trouvé.</p>
            )}

            <h2>Ajout produit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Prix:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default Product;
