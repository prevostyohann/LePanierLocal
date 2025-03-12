import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavForm from './NavForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpa, faAppleAlt, faSeedling, faCar, faUtensils, 
  faCalculator, faTshirt, faCouch, faMicrochip, 
  faNewspaper, faHome, faPaw 
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css"; // Import du CSS

const apiUrl = process.env.REACT_APP_API_URL;

// Liste des catégories avec icônes associées
const categories = [
    { name: "Soins-Beauté", link: "/soins", img: "/images/soins.jpg", icon: faSpa },
    { name: "Alimentation", link: "/alimentation", img: "/images/alimentation.jpg", icon: faAppleAlt },
    { name: "Travaux-Jardinage", link: "/jardinage", img: "/images/jardinage.jpg", icon: faSeedling },
    { name: "Auto-Moto", link: "/auto-moto", img: "/images/auto-moto.jpg", icon: faCar },
    { name: "Hôtellerie-Restauration", link: "/restauration", img: "/images/restauration.jpg", icon: faUtensils },
    { name: "Finance-Administratif", link: "/finance", img: "/images/finance.jpg", icon: faCalculator },
    { name: "Mode", link: "/mode", img: "/images/mode.jpg", icon: faTshirt },
    { name: "Décoration-Intérieur", link: "/decoration", img: "/images/decoration.jpg", icon: faCouch },
    { name: "Informatique", link: "/informatique", img: "/images/informatique.jpg", icon: faMicrochip },
    { name: "Tabacs-Presse", link: "/tabac-presse", img: "/images/tabac-presse.jpg", icon: faNewspaper },
    { name: "Immobilier", link: "/immobilier", img: "/images/immobilier.jpg", icon: faHome },
    { name: "Animaux", link: "/animaux", img: "/images/animaux.jpg", icon: faPaw },
    { name: "Soins-Beauté", link: "/soins", img: "/images/soins.jpg", icon: faSpa },
    { name: "Alimentation", link: "/alimentation", img: "/images/alimentation.jpg", icon: faAppleAlt },
    { name: "Travaux-Jardinage", link: "/jardinage", img: "/images/jardinage.jpg", icon: faSeedling },
    { name: "Auto-Moto", link: "/auto-moto", img: "/images/auto-moto.jpg", icon: faCar },
    { name: "Hôtellerie-Restauration", link: "/restauration", img: "/images/restauration.jpg", icon: faUtensils },
    { name: "Finance-Administratif", link: "/finance", img: "/images/finance.jpg", icon: faCalculator },
    { name: "Mode", link: "/mode", img: "/images/mode.jpg", icon: faTshirt },
    { name: "Décoration-Intérieur", link: "/decoration", img: "/images/decoration.jpg", icon: faCouch },
    { name: "Informatique", link: "/informatique", img: "/images/informatique.jpg", icon: faMicrochip },
    { name: "Tabacs-Presse", link: "/tabac-presse", img: "/images/tabac-presse.jpg", icon: faNewspaper },
    { name: "Immobilier", link: "/immobilier", img: "/images/immobilier.jpg", icon: faHome },
    { name: "Animaux", link: "/animaux", img: "/images/animaux.jpg", icon: faPaw },
    { name: "Soins-Beauté", link: "/soins", img: "/images/soins.jpg", icon: faSpa },
    { name: "Alimentation", link: "/alimentation", img: "/images/alimentation.jpg", icon: faAppleAlt },
    { name: "Travaux-Jardinage", link: "/jardinage", img: "/images/jardinage.jpg", icon: faSeedling },
    { name: "Auto-Moto", link: "/auto-moto", img: "/images/auto-moto.jpg", icon: faCar },
    { name: "Hôtellerie-Restauration", link: "/restauration", img: "/images/restauration.jpg", icon: faUtensils },
    { name: "Finance-Administratif", link: "/finance", img: "/images/finance.jpg", icon: faCalculator },
    { name: "Mode", link: "/mode", img: "/images/mode.jpg", icon: faTshirt },
    { name: "Décoration-Intérieur", link: "/decoration", img: "/images/decoration.jpg", icon: faCouch },
    { name: "Informatique", link: "/informatique", img: "/images/informatique.jpg", icon: faMicrochip },
    { name: "Tabacs-Presse", link: "/tabac-presse", img: "/images/tabac-presse.jpg", icon: faNewspaper },
    { name: "Immobilier", link: "/immobilier", img: "/images/immobilier.jpg", icon: faHome },
    { name: "Animaux", link: "/animaux", img: "/images/animaux.jpg", icon: faPaw }
    ];

    
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
                '${apiUrl}/login',
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
            <div className="login-content">
                {/* 📝 Partie Gauche : Formulaire */}
                <div className="login-container">
                    <div className="login-box">
                        <h2>Se connecter</h2>
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

                {/* 🎠 Partie Droite : Carrousel */}
                <div className="trader-carousel-container">
                    {[1, 2, 3].map((colIndex) => (
                        <div className="trader-carousel-column" key={colIndex}>
                            <div className="trader-carousel-list">
                                {categories.map((category) => (
                                    <div
                                        key={category.name}
                                        className="trader-carousel-card category-card"
                                    >
                                        <FontAwesomeIcon icon={category.icon} className="category-icon" />
                                        <span>{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="login-bottom">
                <h1>LePanierLocal, bâtir ensemble un monde de proximité.</h1>
            </div>
        </div>
    );
};

export default Login;
