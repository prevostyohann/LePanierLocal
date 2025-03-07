import React from 'react';
import NavForm from './NavForm';
import MyFooter from './Footer';
 
function MentionsLegales() {
 
    return(
        <div>
    <NavForm />
    <div className="container mt-4">
        <h1 className="mb-4">Mentions Légales</h1>

        <section>
            <h2>1. Éditeur du Site</h2>
            <p>Le présent site est édité par [Nom de l'Éditeur], [forme juridique], au capital de [montant du capital], dont le siège social est situé à [adresse complète], immatriculée au Registre du Commerce et des Sociétés de [ville] sous le numéro [numéro RCS].</p>
        </section>

        <section>
            <h2>2. Directeur de la Publication</h2>
            <p>Le Directeur de la publication du site est [Nom du Directeur de la Publication].</p>
        </section>

        <section>
            <h2>3. Hébergement</h2>
            <p>Le site est hébergé par [Nom de l'Hébergeur], dont le siège social est situé à [adresse complète].</p>
        </section>

        <section>
            <h2>4. Propriété Intellectuelle</h2>
            <p>Tous les éléments du site (textes, images, logos, etc.) sont protégés par les droits de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.</p>
        </section>

        <section>
            <h2>5. Données Personnelles</h2>
            <p>Les données personnelles collectées sur le site sont traitées conformément à la réglementation en vigueur. Pour plus d'informations, consultez notre Politique de Confidentialité.</p>
        </section>

        <section>
            <h2>6. Cookies</h2>
            <p>Le site utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur le site, vous acceptez l'utilisation de cookies. Pour plus d'informations, consultez notre Politique de Cookies.</p>
        </section>

        <section>
            <h2>7. Limitation de Responsabilité</h2>
            <p>L'Éditeur ne peut être tenu responsable des éventuelles interruptions de service ou des dysfonctionnements liés à l'utilisation d'Internet. L'Éditeur ne peut également être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.</p>
        </section>

        <section>
            <h2>8. Contact</h2>
            <p>Pour toute question ou réclamation concernant les présentes mentions légales, vous pouvez contacter l'Éditeur à l'adresse suivante : [adresse email de contact].</p>
        </section>
    </div>
    <MyFooter />
</div>
    )
}

export default MentionsLegales;