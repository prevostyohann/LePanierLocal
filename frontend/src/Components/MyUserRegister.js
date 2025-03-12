import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyForm from './MyForm';
import NavForm from './NavForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faAppleAlt,
  faSeedling,
  faCar,
  faUtensils,
  faCalculator,
  faTshirt,
  faCouch,
  faMicrochip,
  faNewspaper,
  faHome,
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    'confirm-password': ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [shuffledCategories, setShuffledCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledCategories(categories.map((category, index) => ({
      ...category,
      id: index
    })));
  }, []);

  // Définition des champs pour l'inscription utilisateur
  const fields = [
    { name: 'username', label: 'Nom d\'Utilisateur : ', type: 'text', placeholder: 'Entrer votre nom d\'utilisateur', required: true },
    { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: true },
    { name: 'password', label: 'Mot de Passe : ', type: 'password', placeholder: 'Entrer votre mot de passe', required: true },
    { name: 'confirm-password', label: 'Confirmer le Mot de Passe : ', type: 'password', placeholder: 'Retapez votre mot de passe', required: true },
  ];

  const handleSubmit = async (data) => {
    setErrorMessage('');
    setSuccessMessage('');

    if (data.password !== data['confirm-password']) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/register',
        {
          username: data.username,
          email: data.email,
          plainPassword: data.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccessMessage(response.data.message || 'Inscription réussie !');
      navigate('/Login');
      setFormData({ username: '', email: '', password: '', 'confirm-password': '' });
    } catch (error) {
      setErrorMessage(error.response?.data.errors?.join(', ') || "Une erreur est survenue.");
    }
  };

  return (
    <div className="register-page">
      <NavForm />

      <div className="register-content">
        {/* 🎠 Partie Gauche : Carrousel */}
        <div className="trader-carousel-container">
          {[1, 2, 3].map((colIndex) => (
            <div className="trader-carousel-column" key={colIndex}>
              <div className="trader-carousel-list">
                {shuffledCategories.map((category) => (
                  <div
                    key={category.id}
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

        {/* 📝 Partie Droite : Formulaire */}
        <div className="register-container">
          <div className="register-box">
            <h2>Inscription</h2>
            <MyForm fields={fields} onSubmit={handleSubmit} values={formData} setValues={setFormData} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;