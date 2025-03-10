import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyForm from './MyForm';
import NavForm from './NavForm';

const MyTraderRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    'confirm-password': '',
    description: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Définition des champs du formulaire
  const fields = [
    { name: 'name', label: 'Nom de la Boutique : ', type: 'text', placeholder: 'Entrer le nom de votre boutique', required: true },
    { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: true },
    { name: 'password', label: 'Mot de Passe : ', type: 'password', placeholder: 'Écrire votre mot de passe', required: true },
    { name: 'confirm-password', label: 'Confirmer le Mot de Passe : ', type: 'password', placeholder: 'Retapez votre mot de passe', required: true },
    { name: 'description', label: 'Description : ', type: 'text', placeholder: 'Décrivez votre boutique', required: true },
    { name: 'category', label: 'Catégorie : ', type: 'select', apiEndpoint: '/api/categories', required: false },
    { name: 'sub_category', label: 'Sous Catégorie : ', type: 'select', apiEndpoint: '/api/subcategories', required: false },
  ];

  // Fonction de soumission
  const handleSubmit = async (data) => {
    setErrorMessage('');
    setSuccessMessage('');

    // Vérification des mots de passe
    if (data.password !== data['confirm-password']) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/registerTrader',
        {
          name: data.name,
          email: data.email,
          description: data.description,
          plainPassword: data.password,
          category: data.category,
          sub_category: data.sub_category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage(response.data.message || 'Inscription réussie !');
      
      // ✅ Réinitialiser les champs du formulaire après succès
      setFormData({
        name: '',
        email: '',
        password: '',
        'confirm-password': '',
        description: '',
        category: '',
        sub_category: ''
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrorMessage(error.response.data.errors.join(', '));
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription du commerçant.');
      }
    }
  };

  // ✅ Effacer le message de succès après 3 secondes
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <NavForm />
      <h2>Inscription Commerçant</h2>
      <MyForm fields={fields} onSubmit={handleSubmit} values={formData} setValues={setFormData} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default MyTraderRegister;
