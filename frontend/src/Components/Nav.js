import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css'; // après avoir fait npm install bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import image from '../image/logoLPL.png';
import { FaShoppingCart } from "react-icons/fa";
 
import Logout from './Logout'
 
 
function MyAppNav() {
 
   // Récupération des données utilisateur/trader depuis localStorage
   const userId = localStorage.getItem('user_id');
   const traderId = localStorage.getItem('trader_id');
 
   // Vérifie si c'est un utilisateur ou un commerçant
   const isUser = userId !== null;
   const isTrader = traderId !== null;
 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-custom">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <img src={image} alt="Logo Le Panier Local" width="180" height="50" className="d-inline-block align-text-top" />
         
        </Link>
        <div className="ms-3">
        <SearchBar />
        </div>
        <button
          className="navbar-toggler tex"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon custom-toggler-icon"></span>
 
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link text-white" to="/">Accueil</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/About">A propos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/message">Message</Link>
            </li>
            {isUser &&
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profilUser">Profil
                </Link>
              </li> }
            {isUser &&
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Favorite">Favoris</Link>
            </li>
            }
            <li className="nav-item">
              <Link className="nav-link text-white" to="/forum">Forum</Link>
            </li>
            {!isUser && !isTrader && (
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle text-white"
                href="/register"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                s'enregistrer
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/Register">Utilisateur</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/RegisterTrader">Commerçant</Link>
                </li>
              </ul>
            </li> )}
            {!isUser && !isTrader && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Login">connexion</Link>
            </li> )}
            {isUser &&
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">
                  <FaShoppingCart size={24} />
                </Link>
              </li> }
            {isTrader &&
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profilTrader">
                  Profil
                </Link>
              </li>}
              {(isTrader || isUser) && (
              <li className="nav-link text-white">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default MyAppNav;
 