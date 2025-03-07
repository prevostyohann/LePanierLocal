import React from 'react';
import NavForm from './NavForm';
import MyFooter from './Footer';



function CGV (){
    return (
        <div>
    <NavForm />
    <div className="container mt-4">
        <h1 className="mb-4">Conditions Générales de Vente</h1>

        <section>
            <h2>1. Préambule</h2>
            <p>Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes passées sur la plateforme LePanierLocal, accessible à l'adresse https://LePanierLocal, qui permet aux utilisateurs de passer des commandes en ligne auprès de commerces de proximité et de les récupérer en magasin (click and collect).</p>
        </section>

        <section>
            <h2>2. Définitions</h2>
            <ul>
                <li><strong>Plateforme:</strong> Désigne le site internet LePanierLocal et ses services associés.</li>
                <li><strong>Utilisateur:</strong> Désigne toute personne physique ou morale utilisant la Plateforme.</li>
                <li><strong>Commerce:</strong> Désigne les commerces de proximité partenaires de la Plateforme.</li>
                <li><strong>Commande:</strong> Désigne toute commande de produits ou services passée par un Utilisateur via la Plateforme.</li>
                <li><strong>Produit:</strong> Désigne tout bien ou service proposé à la vente sur la Plateforme.</li>
            </ul>
        </section>

        <section>
            <h2>3. Acceptation des CGV</h2>
            <p>Toute commande passée sur la Plateforme implique l'acceptation pleine et entière des présentes CGV. L'Utilisateur déclare avoir pris connaissance des CGV et les accepter sans réserve.</p>
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
            <p>Le paiement des commandes s'effectue en ligne via les moyens de paiement proposés sur la Plateforme (carte bancaire, PayPal, etc.). L'Utilisateur garantit qu'il dispose des autorisations nécessaires pour utiliser le mode de paiement choisi. La commande est considérée comme définitive après confirmation du paiement.</p>
        </section>

        <section>
            <h2>7. Récupération des Commandes</h2>
            <p>Les commandes doivent être récupérées par l'Utilisateur dans le Commerce partenaire, aux horaires indiqués lors de la passation de la commande. L'Utilisateur doit présenter une pièce d'identité et le numéro de commande pour récupérer ses achats. Si l'Utilisateur ne récupère pas sa commande dans les délais impartis, le Commerce se réserve le droit d'annuler la commande et de rembourser l'Utilisateur, déduction faite des frais éventuels.</p>
        </section>

        <section>
            <h2>8. Disponibilité des Produits</h2>
            <p>Les Produits sont proposés dans la limite des stocks disponibles. En cas d'indisponibilité d'un Produit après passation de la commande, l'Utilisateur en sera informé par email. L'Utilisateur pourra alors choisir d'annuler la commande et d'être remboursé.</p>
        </section>

        <section>
            <h2>9. Prix</h2>
            <p>Les prix des Produits sont indiqués en euros, toutes taxes comprises (TTC). Les prix peuvent être modifiés à tout moment par les Commerces partenaires, mais les Produits seront facturés sur la base des tarifs en vigueur au moment de la passation de la commande.</p>
        </section>

        <section>
            <h2>10. Droit de Rétractation</h2>
            <p>Conformément à la législation en vigueur, l'Utilisateur dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Pour exercer ce droit, l'Utilisateur doit informer le Commerce partenaire de sa décision de rétractation par écrit (email ou courrier). Les Produits doivent être retournés dans leur état d'origine et complets (emballage, accessoires, notice). Les frais de retour sont à la charge de l'Utilisateur.</p>
        </section>

        <section>
            <h2>11. Responsabilité</h2>
            <p>La Plateforme s'engage à mettre en œuvre tous les moyens nécessaires pour assurer la disponibilité et la sécurité de ses services. Cependant, la Plateforme ne peut être tenue responsable des éventuelles interruptions de service ou des dysfonctionnements liés à l'utilisation d'Internet. Les Commerces partenaires sont responsables de la conformité des Produits aux descriptions fournies sur la Plateforme.</p>
        </section>

        <section>
            <h2>12. Propriété Intellectuelle</h2>
            <p>Tous les éléments de la Plateforme (textes, images, logos, etc.) sont protégés par les droits de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.</p>
        </section>

        <section>
            <h2>13. Données Personnelles</h2>
            <p>La Plateforme collecte et traite les données personnelles des Utilisateurs conformément à la réglementation en vigueur. Pour plus d'informations, consultez notre Politique de Confidentialité.</p>
        </section>

        <section>
            <h2>14. Modification des CGV</h2>
            <p>La Plateforme se réserve le droit de modifier les présentes CGV à tout moment. Les modifications seront notifiées aux Utilisateurs et entreront en vigueur dès leur publication sur la Plateforme.</p>
        </section>

        <section>
            <h2>15. Droit Applicable et Juridiction</h2>
            <p>Les présentes CGV sont régies par le droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux français seront compétents.</p>
        </section>

        <section>
            <h2>16. Contact</h2>
            <p>Pour toute question ou réclamation concernant les présentes CGV, l'Utilisateur peut contacter la Plateforme.</p>
        </section>
    </div>
    <MyFooter />
</div>
    )
};
export default CGV;