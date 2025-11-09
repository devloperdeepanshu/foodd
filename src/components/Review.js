import React from 'react';
import { motion } from 'framer-motion';

import pic1 from '../imgs/pic1.png';
import pic2 from '../imgs/pic2.webp';
import pic3 from '../imgs/pic3.jpg';

const Review = () => {
  const reviews = [
    { img: pic1, name: 'Priya Patel', stars: 4, review: 'The Tasty Sweets are simply divine. Every bite of the cake was moist and delicious. A real treat!' },
    { img: pic2, name: 'Rahul Gupta', stars: 4, review: 'TastyBites breakfast is truly satisfying! They always hit the spot for me.' },
    { img: pic3, name: 'Meera Pandi', stars: 4, review: 'It\'s the ultimate comfort food to start your day with. Highly recommend!' }
  ];

  // Animation for the whole grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // "Bouncy" animation for each card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 10, stiffness: 100 },
    },
  };

  return (
    // 1. --- CUTE FIX ---
    // Added a light background to the whole section
    <section id="review" className="review p-8 bg-sky-50cursor-pointer">
      
      <motion.h1
        className="heading text-center text-4xl mb-12 font-bold cursor-pointer"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        our customers <span>reviews</span>
      </motion.h1>

      {/* 2. --- FILL SCREEN FIX --- */}
      {/* NO max-width wrapper here. This grid will fill the screen. */}
      {/* Added pt-24 for the images, and more gap */}
      <motion.div
        className="box-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 pt-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            // 3. --- CUTE CARD STYLING ---
            // Changed bg-blue-900 to bg-sky-100 (light blue)
            // Changed rounded to rounded-2xl
            // Changed border color to match
            className="box relative text-center p-8 border-4 border-sky-200 shadow-lg rounded-2xl bg-sky-100 cursor-pointer"
            variants={cardVariants}
            // 4. --- CUTE HOVER ---
            // Added a small rotate to make it "wobble"
            whileHover={{ scale: 1.05, y: -10, rotate: 2 }}
          >
            {/* Image is perfectly centered and overlaps */}
            <img
              src={review.img}
              alt={review.name}
              className="w-48 h-48 rounded-full border-4 border-white shadow-md
                         absolute -top-24 left-1/2 -translate-x-1/2 object-cover"
            />

            {/* Content has pt-24 to be below the image */}
            <div className="content pt-24">
              {/* 5. --- CUTE TEXT --- */}
              {/* Changed text-white to dark text for contrast */}
              <h3 className="text-3xl text-blue-900 font-bold py-2">{review.name}</h3>
              
              <div className="stars flex justify-center py-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star text-2xl ${i < review.stars ? 'text-red' : 'far fa-star text-red'}`}></i>
                ))}
              </div>
              
              <p className="text-xl text-gray-700 py-4">{review.review}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Review;