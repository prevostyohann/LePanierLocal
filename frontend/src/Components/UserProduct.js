import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyAppNav from './Nav';
 
const UserProduct = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(''); // Assure-toi que l'ID de l'utilisateur est défini
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            fetchProducts();
        }
    }, []);
 
    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/product/show');
            setProducts(response.data); // Met à jour la liste des produits
        } catch (error) {
            setErrorMessage('Erreur lors du chargement des produits.');
        }
    };
 
    // Récupérer les produits au chargement du composant
    useEffect(() => {
        fetchProducts();
    }, []); // [] signifie que cette fonction ne sera appelée qu'une seule fois lors du montage du composant
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/product/new',
                {
                    name: name,
                    description: description,
                    price: price,
                },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                    },
                }
            );
            setSuccessMessage(response.data.message);
            setName('');
            setDescription('');
            setPrice('');
            fetchProducts(); // Rafraîchir la liste des produits après ajout
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.join(', '));
            } else {
                setErrorMessage('An error occurred during registration.');
            }
        }
    };
 
    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/product/${productId}/delete`);
            setSuccessMessage('Produit supprimé avec succès');
            fetchProducts(); // Rafraîchir la liste des produits après suppression
        } catch (error) {
            setErrorMessage('Erreur lors de la suppression du produit.');
        }
    };
 
    const handleEdit = async (e, productId) => {
        e.preventDefault();
 
        try {
            const response = await axios.put(
                `http://localhost:8000/product/${productId}/edit`,
                {
                    name: name,
                    description: description,
                    price: price,
                },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                    },
                }
            );
            setSuccessMessage(response.data.message);
            fetchProducts(); // Rafraîchir la liste des produits après modification
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.join(', '));
            } else {
                setErrorMessage('An error occurred during editing.');
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
            fetchProducts();  // Rafraîchir la liste des produits
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
                            <button onClick={() => addToFavorites(product.id)}>Ajouter aux favoris</button>
                        </li>
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
 
export default UserProduct;