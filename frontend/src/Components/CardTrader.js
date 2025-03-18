import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/CardTrader.css"; // Import du CSS mis à jour

const apiUrl = process.env.REACT_APP_API_URL;

const CardTrader = () => {
    const [traders, setTraders] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchTraders = async () => {
            try {
                const response = await axios.get(`/${apiUrl}/api/traders`);
                if (Array.isArray(response.data.member)) {
                    setTraders(response.data.member);
                } else {
                    throw new Error("Format de réponse inattendu");
                }
            } catch (error) {
                
                setErrorMessage("Erreur lors du chargement des boutiques.");
            }
        };

        fetchTraders();
    }, []);

    return (
        <div className="trader-container"> 
            <h2 className="title">Nos boutiques partenaires</h2>
            <div className="separator"></div> {/* Barre sous le titre */}

            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="trader-grid">
                {traders.length > 0 ? (
                    traders.map((trader, index) => (
                        <div className="trader-card" key={trader.id}>
                            {/* Ajout du badge "Nouveau" pour 1 boutique sur 3 */}
                            {index % 3 === 0 && <div className="trader-badge">Nouveau</div>}
                            
                            <div 
                                className="trader-image"
                                style={{
                                    backgroundImage: `url(${trader.profile_picture || "default_image_url"})`,
                                }}
                            ></div>

                            <div className="trader-info">
                                <h3>{trader.name}</h3>
                                <p>{trader.description || "Aucune description disponible."}</p>

                                {/* Infos supplémentaires */}
                                <div className="trader-details">
                                    <span><i className="fas fa-map-marker-alt"></i> {trader.location || "Non renseigné"}</span>
                                    <span><i className="fas fa-star"></i> {trader.rating || "4.5"} ★</span>
                                </div>

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
