import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CategoryCarousel.css";

const categories = [
  { name: "Soins", link: "/soins", img: "/images/soins.jpg" },
  { name: "Animaux", link: "/animaux", img: "/images/animaux.jpg" },
  { name: "Technologie", link: "/technologie", img: "/images/technologie.jpg" },
  { name: "Sports", link: "/sports", img: "/images/sports.jpg" },
  { name: "Musique", link: "/musique", img: "/images/musique.jpg" },
  { name: "Arts", link: "/arts", img: "/images/arts.jpg" },
  { name: "Voyages", link: "/voyages", img: "/images/voyages.jpg" },
  { name: "Mode", link: "/mode", img: "/images/mode.jpg" },
  { name: "Cuisine", link: "/cuisine", img: "/images/cuisine.jpg" },
  { name: "Livres", link: "/livres", img: "/images/livres.jpg" },
];

const allCategories = [...categories, ...categories]; // Duplication pour effet infini

const CategoryCarousel = () => {
  return (
    <div className="category-carousel-wrapper">
      <div className="category-carousel">
        <div className="category-carousel-container">
          {allCategories.map((category, index) => (
            <div className="category-card" key={index}>
              <Link to={category.link} className="category-link">
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${category.img})` }}
                ></div>
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
