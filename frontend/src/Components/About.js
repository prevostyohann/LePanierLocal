import React from 'react';
import MyAppNav from './Nav';
import MyFooter from './Footer';
 
 
function About() {
 
    return(
        <div>
    <MyAppNav />
    <div className="container mt-4">
        <div className="text-center mb-4">
            <h1>About LePanierLocal</h1>
            <p className="lead">
                Sur ce site vous retrouverez l'ensemble des commerçants de votre ville. Profitez de vos commerces de proximité... !
            </p>
        </div>
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="text-left">
                    <h5>Évènements</h5>
                    <p>Restez informé(e) des évènements dans votre ville.</p>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="text-right">
                    <h5>Liste de Commerces</h5>
                    <p>Créez votre liste de commerces préférés pour les retrouver en un seul clic... !</p>
                </div>
            </div>
        </div>
    </div>
    <MyFooter />
</div>

    )
}

export default About;