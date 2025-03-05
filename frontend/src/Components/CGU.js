import React from 'react';
import NavForm from './NavForm';
import MyFooter from './Footer';



function CGU (){
    return (
        
        <div>
    <NavForm />
    <div className="container mt-4">
        <h1 className="mb-4">Conditions Générales d'Utilisation</h1>

        <section>
            <h2>1. Préambule</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme [Nom de la Plateforme], accessible à l'adresse [URL de la Plateforme], qui permet aux utilisateurs de passer des commandes en ligne auprès de commerces de proximité et de les récupérer en magasin (click and collect).</p>
        </section>

        <section>
            <h2>2. Définitions</h2>
            <ul>
                <li><strong>Plateforme:</strong> Désigne le site internet [Nom de la Plateforme] et ses services associés.</li>
                <li><strong>Utilisateur:</strong> Désigne toute personne physique ou morale utilisant la Plateforme.</li>
                <li><strong>Commerce:</strong> Désigne les commerces de proximité partenaires de la Plateforme.</li>
                <li><strong>Commande:</strong> Désigne toute commande de produits ou services passée par un Utilisateur via la Plateforme.</li>
            </ul>
        </section>

        <section>
            <h2>3. Acceptation des CGU</h2>
            <p>L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU. Toute utilisation contraire aux CGU peut entraîner l'exclusion de l'Utilisateur de la Plateforme.</p>
        </section>

        <section>
            <h2>4. Inscription et Compte Utilisateur</h2>
            <p>Pour passer une commande, l'Utilisateur doit créer un compte en fournissant des informations exactes et complètes. L'Utilisateur est responsable de la confidentialité de ses identifiants de connexion et de toute activité effectuée sous son compte.</p>
        </section>

        <section>
            <h2>5. Passation de Commandes</h2>
            <p>L'Utilisateur peut passer des commandes auprès des Commerces partenaires via la Plateforme. La passation d'une commande implique l'acceptation des conditions de vente du Commerce concerné.</p>
        </section>

        <section>
            <h2>6. Paiement</h2>
            <p>Le paiement des commandes s'effectue en ligne via les moyens de paiement proposés sur la Plateforme. L'Utilisateur garantit qu'il dispose des autorisations nécessaires pour utiliser le mode de paiement choisi.</p>
        </section>

        <section>
            <h2>7. Récupération des Commandes</h2>
            <p>Les commandes doivent être récupérées par l'Utilisateur dans le Commerce partenaire, aux horaires indiqués lors de la passation de la commande. L'Utilisateur doit présenter une pièce d'identité et le numéro de commande pour récupérer ses achats.</p>
        </section>

        <section>
            <h2>8. Responsabilité</h2>
            <p>La Plateforme s'engage à mettre en œuvre tous les moyens nécessaires pour assurer la disponibilité et la sécurité de ses services. Cependant, la Plateforme ne peut être tenue responsable des éventuelles interruptions de service ou des dysfonctionnements liés à l'utilisation d'Internet.</p>
        </section>

        <section>
            <h2>9. Propriété Intellectuelle</h2>
            <p>Tous les éléments de la Plateforme (textes, images, logos, etc.) sont protégés par les droits de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.</p>
        </section>

        <section>
            <h2>10. Données Personnelles</h2>
            <p>La Plateforme collecte et traite les données personnelles des Utilisateurs conformément à la réglementation en vigueur. Pour plus d'informations, consultez notre Politique de Confidentialité.</p>
        </section>

        <section>
            <h2>11. Modification des CGU</h2>
            <p>La Plateforme se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront notifiées aux Utilisateurs et entreront en vigueur dès leur publication sur la Plateforme.</p>
        </section>

        <section>
            <h2>12. Droit Applicable et Juridiction</h2>
            <p>Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux français seront compétents.</p>
        </section>

        <section>
            <h2>13. Contact</h2>
            <p>Pour toute question ou réclamation concernant les présentes CGU, l'Utilisateur peut contacter la Plateforme.</p>
        </section>
    </div>
    <MyFooter />
</div>
    )
};
export default CGU;