import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'; // après avoir fait npm install bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import image from '../image/logoLPL.png';

function NavForm() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Icone à gauche */}
                <Link className="navbar-brand text-white me-3" to="/">
                    <FaArrowLeft size={24} />
                </Link>

                {/* Logo centré */}
                <div className="d-flex justify-content-center flex-grow-1">
                    <Link className="navbar-brand" to="/">
                        <img 
                            src={image} 
                            alt="Logo Le Panier Local" 
                            width="180" 
                            height="50" 
                            className="d-inline-block align-text-top" 
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavForm;
