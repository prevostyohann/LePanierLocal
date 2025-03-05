import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logotech from '../image/logotechnoWorld.png';

 
 
function CardTrader() {
 
    return(
        <div class='card' style={{ width: '18rem' }}>
            <div class="card-body">
                <img src={logotech} alt='logo'></img>
        <h5 class="card-title">TechnoWolrd</h5>
        <p class="card-text">Votre boutique spécialisée en pièces informatiques</p>
        <a href="#" class="btn btn-primary">Visitez la boutique</a>
            </div>
        </div>
    )
}

export default CardTrader;

