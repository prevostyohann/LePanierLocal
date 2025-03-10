import React from 'react';
import { useNavigate } from 'react-router-dom';
 
 
const Logout = () => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('trader_id');
   
    setTimeout(() => {
      navigate('/Login'); // Redirige vers la page d'accueil après la déconnexion
    }, 100); // 100 millisecondes devraient suffire
  };
 
  return (
    <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
      Déconnexion
    </span>
  );
};
 
export default Logout;