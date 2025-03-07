import React from 'react';
import { Link } from 'react-router-dom';
import MyImage from '../image/logoLPL.png';



function MyFooter() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
      <div className="container-fluid">
          <ul>
            <li>
            <img src={MyImage} alt="Logo le panier local dans le footer" width="180" height="50" className="d-inline-block align-text-top" />
            </li>
          </ul>
            <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
                <Link className="nav-link text-white" to='/MentionsLegales'>Mentions Légales</Link>
            </li>
               <li>
                  <Link className="nav-link text-white" to='/Contact'>Contact</Link>
              </li> 
              <li>
                <Link className="nav-link text-white" to='/CGV'>CGV</Link>
              </li>
              <li>
                <Link className="nav-link text-white" to='/CGU'>CGU</Link>
              </li>
          </ul>
          </div>
          </div>
      </nav>
    )
}
export default MyFooter;

