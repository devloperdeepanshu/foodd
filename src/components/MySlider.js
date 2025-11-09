import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
// Don't forget to import the CSS!
import '@splidejs/react-splide/css';

// You can also import a theme
// import '@splidejs/react-splide/css/sea-green';

const MySlider = () => {
  return (
    <Splide 
      options={{
        rewind: true,
        gap: '1rem',
        perPage: 3,
        autoplay: true,
        breakpoints: {
          640: {
            perPage: 1,
          },
          768: {
            perPage: 2,
          },
        },
      }} 
      aria-label="My Favorite Images"
    >
      <SplideSlide>
        <img src="path/to/image1.jpg" alt="Image 1"/>
      </SplideSlide>
      <SplideSlide>
        <img src="path/to/image2.jpg" alt="Image 2"/>
      </SplideSlide>
      <SplideSlide>
        <img src="path/to/image3.jpg" alt="Image 3"/>
      </SplideSlide>
      <SplideSlide>
        <img src="path/to/image4.jpg" alt="Image 4"/>
      </SplideSlide>
    </Splide>
  );
};

export default MySlider;