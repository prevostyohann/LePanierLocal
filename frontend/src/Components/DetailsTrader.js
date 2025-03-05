import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsTrader = () => {
    const { id } = useParams();
    const [trader, setTrader] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/trader/${id}`)
            .then(response => response.json())
            .then(data => {
                setTrader(data.trader);
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching trader details:', error));
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
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <p>{product.description}</p>
                        <p>Reference: {product.reference}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetailsTrader;