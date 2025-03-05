import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyAppNav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyFooter from './Footer';

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
            <MyAppNav />
            <div className="container mt-4 text-center">
                <h1 className="mb-4">{trader.name}</h1>
                <p>{trader.description}</p>
                <p>Email: {trader.email}</p>
                <p>Phone: {trader.phone}</p>
                <p>Address: {trader.address}</p>
                <p>Hours of Operation: {trader.hours_of_operation}</p>
                <p>SIRET: {trader.siret}</p>
                <img src={trader.profile_picture} alt={`${trader.name}'s profile`} className="img-fluid rounded mb-4" />

                <h2 className="mt-4">Products</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Prix: {product.price} €</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <MyFooter />
        </div>
    );
};

export default DetailsTrader;