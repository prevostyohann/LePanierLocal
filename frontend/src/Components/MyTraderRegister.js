import React, { useState } from 'react';
import axios from 'axios';
import MyForm from './MyForm';
import NavForm from './NavForm';

const MyTraderRegister = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Champs pour le trader (commerçant)
  const fields = [
    { name: 'name', label: 'Nom de la Boutique : ', type: 'text', placeholder: 'Entrer le nom de votre boutique', required: true },
    { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: true },
    { name: 'password', label: 'Mot de Passe : ', type: 'password', placeholder: 'Écrire votre mot de passe', required: true },
    { name: 'confirm-password', label: 'Confirmer le Mot de Passe : ', type: 'password', placeholder: 'Retapez votre mot de passe', required: true },
    { name: 'description', label: 'description : ', type: 'description', placeholder: 'description', required: true },
  ];

  // Fonction de soumission
  const handleSubmit = async (formData) => {
    // Validation du mot de passe
    if (formData.password !== formData['confirm-password']) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/registerTrader',
        {
          name: formData.name,
          email: formData.email,
          description: formData.description,
          plainPassword: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      );
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrorMessage(error.response.data.errors.join(', '));
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription du commerçant.');
      }
    }
  };

  return (
    <div>
      <NavForm/>
      <h2>Inscription Commerçant</h2>
      <MyForm fields={fields} onSubmit={handleSubmit} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default MyTraderRegister;
