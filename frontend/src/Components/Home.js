import React from 'react';
import MyAppNav from './Nav';
import CarrouselComponent from './Carrousel';
import CategoryCarousel from './CategoryCarousel';
import CardTrader from './CardTrader';
import MyFooter from './Footer';

 
 
 
function Home() {
 
    return(
        <div>
        <MyAppNav/>
        <CarrouselComponent/>
        <h3>Vos commerces par categories :</h3>
        <CategoryCarousel/>
        <CardTrader/>
        <MyFooter/>
        </div>
    )
}
 
export default Home;