import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logotech from '../image/logotechnoWorld.png';
import { Link } from 'react-router-dom';

function CardTrader() {
    const [traders, setTraders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/traders') // Mets l'URL de ton endpoint Symfony
            .then(response => response.json())
            .then(data => setTraders(data))
            .catch(error => console.error('Erreur lors du chargement des traders', error));
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {traders.map(trader => (
                    <div key={trader.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <img src={logotech} alt="logo" className="card-img-top" />
                                <h5 className="card-title">{trader.name}</h5>
                                <p className="card-text">{trader.description}</p>
                                <Link to={`/boutique/${trader.id}`} className="btn btn-primary">
                                    Visitez la boutique
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardTrader;
