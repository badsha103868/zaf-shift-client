import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import Services from '../../Services/Services';
import Work from '../HowItWork/Work';

const reviewsPromise = fetch('/reviews.json').then((res)=>res.json())


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Brands></Brands>
      <Work></Work>
      <Services></Services>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div> 
  );
};

export default Home;