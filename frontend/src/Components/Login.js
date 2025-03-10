import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavForm from './NavForm';
import "../styles/Login.css"; // Import du CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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

            const { token, user_id, type } = response.data;

            if (token) {
                localStorage.setItem('token', token);

                if (type === 'trader') {
                    localStorage.setItem('trader_id', user_id);
                    localStorage.removeItem('user_id');
                    navigate('/profilTrader');
                } else if (type === 'user') {
                    localStorage.setItem('user_id', user_id);
                    localStorage.removeItem('trader_id');
                    navigate('/');
                }

                setSuccessMessage("Connexion réussie !");
            } else {
                setErrorMessage("Token non reçu.");
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.error || 'Une erreur est survenue.');
        }
    };

    return (
        <div className="login-page">
            <NavForm />
            <div className="login-top">
                <div className="login-container">
                    <h2 className="login-title">Se connecter</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe :</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <button type="submit" className="login-btn">Se connecter</button>
                    </form>

                    <a href="/forgot-password" className="forgot-password">Mot de passe oublié ?</a>
                </div>
            </div>

            <div className="login-bottom">
                <h1>LePanierLocal, bâtir ensemble un monde de proximité.</h1>
            </div>
        </div>
    );
};

export default Login;
