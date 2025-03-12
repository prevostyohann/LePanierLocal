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
        <CategoryCarousel/>
        <CardTrader/>
        <MyFooter/>
        </div>
    )
}
 
export default Home;