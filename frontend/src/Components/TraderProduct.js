import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TraderProduct.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const traderId = localStorage.getItem('trader_id');

        if (!token || !traderId || isNaN(parseInt(traderId, 10))) {
            window.location.href = '/login';
        } else {
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        const traderId = localStorage.getItem('trader_id');

        try {
            const response = await axios.get(`http://localhost:8000/product/show/${traderId}`);
            setProducts(response.data);
        } catch (error) {
            setErrorMessage('Erreur lors du chargement des produits.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const traderId = localStorage.getItem('trader_id');

        try {
            const response = await axios.post(
                'http://localhost:8000/product/new',
                { name, description, price, trader_id: traderId },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setSuccessMessage(response.data.message);
            setName('');
            setDescription('');
            setPrice('');
            fetchProducts();
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout du produit.");
        }
    };

    const handleDelete = async (productId) => {
        const traderId = localStorage.getItem('trader_id');

        try {
            await axios.delete(`http://localhost:8000/product/${productId}/delete`, {
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({ trader_id: traderId }),
            });

            setSuccessMessage('Produit supprimé avec succès');
            fetchProducts();
        } catch (error) {
            setErrorMessage('Erreur lors de la suppression du produit.');
        }
    };

    const startEditing = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({
            name: product.name,
            description: product.description,
            price: product.price,
        });
    };

    const handleEditChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const handleEdit = async (e, productId) => {
        e.preventDefault();
        const traderId = localStorage.getItem('trader_id');

        try {
            const response = await axios.put(
                `http://localhost:8000/product/${productId}/edit`,
                { ...editedProduct, trader_id: traderId },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setSuccessMessage(response.data.message);
            setEditingProductId(null);
            fetchProducts();
        } catch (error) {
            setErrorMessage("Erreur lors de la modification.");
        }
    };

    return (
        <div className="product-container">
        <h1>Bienvenue sur votre profil Commerçant</h1>
        <div className="favoris-separator"></div>
            {/* <h2>Liste des produits</h2> */}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {products.length > 0 ? (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-card">
                            {editingProductId === product.id ? (
                                <div className="edit-form">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editedProduct.name} 
                                        onChange={handleEditChange} 
                                        className="product-input"
                                    />
                                    <input 
                                        type="text" 
                                        name="description" 
                                        value={editedProduct.description} 
                                        onChange={handleEditChange} 
                                        className="product-input"
                                    />
                                    <input 
                                        type="number" 
                                        name="price" 
                                        value={editedProduct.price} 
                                        onChange={handleEditChange} 
                                        className="product-input"
                                    />
                                    <div className="action-buttons">
                                        <button onClick={(e) => handleEdit(e, product.id)}>Enregistrer</button>
                                        <button onClick={() => setEditingProductId(null)}>Annuler</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="product-price">Prix: {product.price} €</p>
                                    <div className="action-buttons">
                                        <button onClick={() => startEditing(product)}>Modifier</button>
                                        <button onClick={() => handleDelete(product.id)}>Supprimer</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-products">Aucun produit trouvé.</p>
            )}

            <h2>Ajout produit</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="product-input"
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="product-input"
                    />
                </div>

                <div>
                    <label>Prix:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="product-input"
                    />
                </div>

                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </div>
    );
};

export default Product;
