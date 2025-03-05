import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TradersList() {
    const [traders, setTraders] = useState([]); // Stocke les traders
    const [errorMessage, setErrorMessage] = useState(''); // Gère les erreurs

    // Fonction pour récupérer les traders
    const fetchTraders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/traders');
            console.log("Données reçues :", response.data); // Debug
    
            if (Array.isArray(response.data.member)) {
                setTraders(response.data.member);
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
        <div>
            <h2>Vos boutiques : </h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {traders.length > 0 ? (
                <ul>
                    {traders.map((trader) => (
                        <li key={trader.id}>
                            <h3>{trader.name}</h3>
                            <p>{trader.description || "Aucune description"}</p>
                            <a href={`/Tradershop/${trader.id}`}>
                                <button>Visiter la boutique</button>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun trader trouvé.</p>
            )}
        </div>
    );
}

export default TradersList;
