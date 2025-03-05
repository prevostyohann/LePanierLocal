import React from 'react';
import MyAppNav from './Nav';
import TraderProduct from './TraderProduct';
 
 
function ProfilTrader() {
 
    return(
        <div>
        <MyAppNav/>
        
 
        <h1>Bienvenue sur votre profil Commerçant</h1>

        <TraderProduct/>
        
        </div>
    )
}

export default ProfilTrader;