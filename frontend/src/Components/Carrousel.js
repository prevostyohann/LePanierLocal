import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importer le composant Carousel de react-bootstrap
import image1 from '../image/pexels-quintingellar-696205.jpg';
import image2 from '../image/pexels-rachel-claire-4846209.jpg';
import image3 from '../image/pexels-wendywei-1190297.jpg';
import '../styles/Carrousel.css';


const CarouselComponent = () => {
  return (
    <div className="mx-auto my-4" style={{ maxWidth: '80%', backgroundColor: '#f9f9f9' }}>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Premier Slide</h3>
          <p>Quelques informations sur la première image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Deuxième Slide</h3>
          <p>Quelques informations sur la deuxième image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Troisième Slide</h3>
          <p>Quelques informations sur la troisième image.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default CarouselComponent;