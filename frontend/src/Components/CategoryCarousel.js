import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faAppleAlt,
  faSeedling,
  faCar,
  faUtensils,
  faCalculator,
  faTshirt,
  faCouch,
  faMicrochip,
  faNewspaper,
  faHome,
  faPaw
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CategoryCarousel.css";

const categories = [
 { name: "Soins-Beauté", link: "/soins", img: "/images/soins.jpg", icon: faSpa },
  { name: "Alimentation", link: "/alimentation", img: "/images/alimentation.jpg", icon: faAppleAlt },
  { name: "Travaux-Jardinage", link: "/jardinage", img: "/images/jardinage.jpg", icon: faSeedling },
  { name: "Auto-Moto", link: "/auto-moto", img: "/images/auto-moto.jpg", icon: faCar },
  { name: "Hôtellerie-Restauration", link: "/restauration", img: "/images/restauration.jpg", icon: faUtensils },
  { name: "Finance-Administratif", link: "/finance", img: "/images/finance.jpg", icon: faCalculator },
  { name: "Mode", link: "/mode", img: "/images/mode.jpg", icon: faTshirt },
  { name: "Décoration-Intérieur", link: "/decoration", img: "/images/decoration.jpg", icon: faCouch },
  { name: "Informatique", link: "/informatique", img: "/images/informatique.jpg", icon: faMicrochip },
  { name: "Tabacs-Presse", link: "/tabac-presse", img: "/images/tabac-presse.jpg", icon: faNewspaper },
  { name: "Immobilier", link: "/immobilier", img: "/images/immobilier.jpg", icon: faHome },
  { name: "Animaux", link: "/animaux", img: "/images/animaux.jpg", icon: faPaw },
];

const allCategories = [...categories, ...categories]; // Duplication pour effet infini

const CategoryCarousel = () => {
  return (
    <div className="category-carousel-wrapper">
      <h3 className="category-title">Vos commerces par catégories</h3>
      <div className="separator"></div> {/* Barre sous le titre */}

      <div className="category-carousel">
        <div className="category-carousel-container">
          {allCategories.map((category, index) => (
            <div className="category-card" key={index}>
              <Link to={category.link} className="category-link">
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${category.img})` }}
                ></div>
                <FontAwesomeIcon icon={category.icon} className="carousel-category-icon" />
                <div className="category-name">{category.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;