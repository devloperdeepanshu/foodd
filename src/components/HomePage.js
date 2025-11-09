import React from 'react';
import Home from './Home';
import Speciality from './Speciality';
import Popular from './Popular';
import Gallery from './Gallery';
import Review from './Review';
import Order from './Order';

// This component is just all your sections for the main page
const HomePage = () => {
  return (
    <>
      <Home />
      <Speciality />
      <Popular />
      <Gallery />
      <Review />
      <Order />
    </>
  );
};

export default HomePage;     