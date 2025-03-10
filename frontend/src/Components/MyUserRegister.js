import React, { useState } from 'react';
import axios from 'axios';
import MyForm from './MyForm';
import NavForm from './NavForm';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  

  // Définir les champs pour l'utilisateur
  const fields = [
    { name: 'username', label: 'Nom d\'Utilisateur : ', type: 'text', placeholder: 'Entrer votre nom d\'utilisateur', required: true },
    { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: true },
    { name: 'password', label: 'Mot de Passe : ', type: 'password', placeholder: 'Entrer votre mot de passe', required: true },
    { name: 'confirm-password', label: 'Confirmer le Mot de Passe : ', type: 'password', placeholder: 'Retapez votre mot de passe', required: true },
  ];

  const handleSubmit = async (formData) => {
    // Effectuer la validation de base
    if (formData.password !== formData['confirm-password']) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/register',
        {
          username: formData.username,
          email: formData.email,
          plainPassword: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      );
      setSuccessMessage(response.data.message);
      navigate('/Login');
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrorMessage(error.response.data.errors.join(', '));
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription.');
      }
    }
  };

  return (
    <div>
      <NavForm/>
      <h2>Inscription</h2>
      <MyForm fields={fields} onSubmit={handleSubmit} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Register;
