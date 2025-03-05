import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importer le composant Carousel de react-bootstrap
import { Link } from 'react-router-dom'; // Si vous utilisez React Router pour la navigation
import '../styles/CategoryCarousel.css';



const CategoryCarousel = () => {
  const categories = [
    { name: 'Soins', link: '/soins', img: 'https://via.placeholder.com/200x200?text=Soins', color:'rgb(114, 30, 15)' },
    { name: 'Animaux', link: '/animaux', img: 'https://via.placeholder.com/200x200?text=Animaux', color:'rgb(114, 30, 15)' },
    { name: 'Technologie', link: '/technologie', img: 'https://via.placeholder.com/200x200?text=Technologie', color:'rgb(114, 30, 15)' },
    { name: 'Sports', link: '/sports', img: 'https://via.placeholder.com/200x200?text=Sports', color:'rgb(114, 30, 15)' },
    { name: 'Musique', link: '/musique', img: 'https://via.placeholder.com/200x200?text=Musique' },
    { name: 'Arts', link: '/arts', img: 'https://via.placeholder.com/200x200?text=Arts' },
    { name: 'Voyages', link: '/voyages', img: 'https://via.placeholder.com/200x200?text=Voyages' },
    { name: 'Mode', link: '/mode', img: 'https://via.placeholder.com/200x200?text=Mode' },
    { name: 'Cuisine', link: '/cuisine', img: 'https://via.placeholder.com/200x200?text=Cuisine' },
    { name: 'Livres', link: '/livres', img: 'https://via.placeholder.com/200x200?text=Livres' },
    { name: 'Jardinage', link: '/jardinage', img: 'https://via.placeholder.com/200x200?text=Jardinage' },
    { name: 'Bien-être', link: '/bien-etre', img: 'https://via.placeholder.com/200x200?text=Bien-être' },
  ];

  // Dupliquer les catégories pour créer un effet infini
  const allCategories = [...categories, ...categories]; // Dupliquer les catégories

  return (
    <div className="my-5">
      {/* Ajout de la classe "category-carousel" pour cibler ce carrousel uniquement */}
      <Carousel controls={false} indicators={false} interval={2000} variant="dark" className="category-carousel">
        <Carousel.Item>
          <div className="category-carousel-container">
            {allCategories.map((category, index) => (
              <div className="category-card mx-2" key={index}>
                <Link to={category.link}>
                  <div className="card">
                    {/* <div
                      key={index}
                      style={{ backgroundColor: category.color }} // Appliquer la couleur spécifique ici
                    > */}
                    <img src={category.img} alt={category.name} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{category.name}</h5>
                      </div>
                    {/* </div> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
