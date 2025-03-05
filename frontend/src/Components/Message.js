import React, { useState, useEffect } from 'react';
import MyAppNav from './Nav';
import axios from 'axios';

function Message() {
    const [messages, setMessages] = useState([]);  // État pour les messages
    const [loading, setLoading] = useState(true);   // État pour le chargement
    const [userId, setUserId] = useState(null);     // ID de l'utilisateur ou du trader
    
    // Récupérer le token d'authentification
    const token = localStorage.getItem('token');  // Assurez-vous que le token est bien stocké

    // Simuler la récupération de l'utilisateur (par exemple à partir du token ou d'un context)
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');  // Récupérer l'ID de l'utilisateur ou du trader
        if (storedUserId) {
            setUserId(storedUserId);
            // Il faudrait déterminer si l'ID est un utilisateur ou un trader ici
            // Par exemple, tu pourrais faire une requête pour récupérer cette info
        }
    }, []);

    // Récupérer les messages lorsque l'utilisateur ou le trader est connecté
    useEffect(() => {
        if (userId) {
            fetchMessages(userId);
        }
    }, [userId]);

    const fetchMessages = async (userId) => {
        try {
            // On détermine si c'est un user ou un trader
            const url = `/api/messages/${userId}`; // Appelle de l'API pour récupérer les messages en fonction de l'ID
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessages(response.data);  // Mettre à jour l'état avec les messages récupérés
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages', error);
            setLoading(false);
        }
    };

    // Affichage des messages
    const renderMessages = () => {
        if (loading) {
            return <p>Chargement des messages...</p>;
        }

        if (messages.length === 0) {
            return <p>Aucun message trouvé.</p>;
        }

        return (
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.sender}: </strong>{message.content}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <MyAppNav />
            <h1>Mes messages</h1>
            {renderMessages()}
        </div>
    );
}

export default Message;
