import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsTrader = () => {
    const { id } = useParams();
    const [trader, setTrader] = useState(null);
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetailsTrader;