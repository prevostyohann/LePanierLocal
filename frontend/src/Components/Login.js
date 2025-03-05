import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavForm from './NavForm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Hook pour rediriger

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                'http://localhost:8000/login',
                { email, password },
                { headers: { "Content-Type": 'application/ld+json' } }
            );

            const { token, user_id, type } = response.data; // Récupération des données

            if (token) {
                localStorage.setItem('token', token);

                if (type === 'trader') {
                    localStorage.setItem('trader_id', user_id);
                    localStorage.removeItem('user_id'); // Supprime user_id si c'est un trader
                    navigate('/profilTrader'); // Redirige vers la page trader
                } else if (type === 'user') {
                    localStorage.setItem('user_id', user_id);
                    localStorage.removeItem('trader_id'); // Supprime trader_id si c'est un user
                    navigate('/'); // Redirige vers la page user
                }

                setSuccessMessage("Connexion réussie !");
            } else {
                setErrorMessage("Token non reçu.");
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            if (error.response) {
                setErrorMessage(error.response.data.error || error.response.data.message || 'Erreur de connexion.');
            } else {
                setErrorMessage('Une erreur est survenue.');
            }
        }
    };

    return (
        <div className="login-page">
            <NavForm />
            <div className="login-container">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
