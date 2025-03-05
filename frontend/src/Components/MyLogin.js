import React, { useState } from 'react';
import MyForm from './MyForm';
import axios from 'axios';



const MyLogin = async ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  try {
      const response = await axios.post(
          'http://localhost:8000/login',
          {
              email: email,
              password: password,
          },
          {
              headers: {
                  "Content-Type": 'application/ld+json',
              },
          }
      );

      const token = response.data.token;
      const user_id = response.data.user_id;

      if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user_id', user_id);
          setSuccessMessage("Login successful!");
      } else {
          setErrorMessage("Token not received.");
      }

      setEmail('');
      setPassword('');
  } catch (error) {
      if (error.response && error.response.data.error) {
          setErrorMessage('Probleme de connexion');
      } else {
          setErrorMessage('An error occurred during login.');
      }
  }

  const fields = [
    { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: false  },
    { name: 'password', label: 'Password : ', type: 'password', placeholder: 'Ecrire votre mot de passe', required: false  },
  ];
  
  const handleSubmit = (formData) => {
    console.log('Form Data:', formData); 
   }; 
  return (
    
      
      <MyForm fields={fields} onSubmit={handleSubmit} />
      
  );
};

export default MyLogin;