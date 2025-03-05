import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CardTrader = () => {
    const [traders, setTraders] = useState([]); // Stocke les traders
    const [errorMessage, setErrorMessage] = useState(''); // Gère les erreurs

    // Fonction pour récupérer les traders
    const fetchTraders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/traders');
            console.log("Données reçues :", response.data); // Debug
    
            if (Array.isArray(response.data)) {
                setTraders(response.data);
            } else {
                throw new Error("Format de réponse inattendu");
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setErrorMessage('Erreur lors du chargement des traders.');
        }
    };
    
    // Charger les traders au montage du composant
    useEffect(() => {
        fetchTraders();
    }, []);

    return (
        <div className="container">
            <h2>Vos boutiques :</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="row">
                {traders.length > 0 ? (
                    traders.map(trader => (
                        <div className="col-md-4" key={trader.id}>
                            <div className="card" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <img src={trader.profile_picture || 'default_image_url'} alt="logo" className="card-img-top" />
                                    <h5 className="card-title">{trader.name}</h5>
                                    <p className="card-text">{trader.description || "Aucune description"}</p>
                                    <Link to={`/trader/${trader.id}`} className="btn btn-primary">Visitez la boutique</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun trader trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default CardTrader;