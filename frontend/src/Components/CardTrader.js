import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/CardTrader.css"; // Fichier CSS séparé pour un style propre

const CardTrader = () => {
    const [traders, setTraders] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchTraders = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/traders");
                if (Array.isArray(response.data.member)) {
                    setTraders(response.data.member);
                } else {
                    throw new Error("Format de réponse inattendu");
                }
            } catch (error) {
                console.error("Erreur API :", error);
                setErrorMessage("Erreur lors du chargement des boutiques.");
            }
        };

        fetchTraders();
    }, []);

    return (
        <div className="trader-container">
            <h2 className="title">🏪 Nos boutiques partenaires</h2>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="trader-grid">
                {traders.length > 0 ? (
                    traders.map((trader) => (
                        <div className="trader-card" key={trader.id}>
                            <div 
                                className="trader-image"
                                style={{
                                    backgroundImage: `url(${trader.profile_picture || "default_image_url"})`,
                                }}
                            ></div>
                            <div className="trader-info">
                                <h3>{trader.name}</h3>
                                <p>{trader.description || "Aucune description disponible."}</p>
                                <Link to={`/trader/${trader.id}`} className="visit-btn">
                                    Voir la boutique
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-trader">Aucune boutique trouvée.</p>
                )}
            </div>
        </div>
    );
};

export default CardTrader;
