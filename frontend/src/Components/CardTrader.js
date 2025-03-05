import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CardTrader = () => {
    const [traders, setTraders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTraders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/traders');
                setTraders(response.data);
            } catch (error) {
                setErrorMessage('Erreur lors du chargement des traders.');
            }
        };

        fetchTraders();
    }, []);

    return (
        <div className="container">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="row">
                {traders.map(trader => (
                    <div className="col-md-4" key={trader.id}>
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <img src={trader.profile_picture || 'default_image_url'} alt="logo" className="card-img-top" />
                                <h5 className="card-title">{trader.name}</h5>
                                <p className="card-text">{trader.description}</p>
                                <Link to={`/trader/${trader.id}`} className="btn btn-primary">Visitez la boutique</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardTrader;