import React from 'react';
import { motion } from 'framer-motion';

// Import images
import p1 from '../imgs/p-1.jpg';
import p2 from '../imgs/p-2.jpg';
import p3 from '../imgs/p-3.jpg';
import p4 from '../imgs/p-4.jpg';
import p5 from '../imgs/p-5.jpg';
import p6 from '../imgs/p-6.jpg';
import bgVideo from '../imgs/bg.mp4'; // Background video

const Popular = () => {
  const popularItems = [
    { img: p1, price: '₹150 - ₹450', title: 'Tasty Burger 🍔' },
    { img: p2, price: '₹500 - ₹2100', title: 'Tasty Cakes 🍰' },
    { img: p3, price: '₹50 - ₹400', title: 'Tasty Sweets 🍬' },
    { img: p4, price: '₹30 - ₹600', title: 'Tasty Cupcakes 🧁' },
    { img: p5, price: '₹40 - ₹120', title: 'Cold Drinks 🥤' },
    { img: p6, price: '₹35 - ₹380', title: 'Tasty Ice-Cream 🍦' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <section id="popular" className="relative popular p-10">
      {/* Background video */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        <motion.h1
          className="heading text-center text-5xl mb-12 font-extrabold text-pink-100"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Most <span className="text-orange-400">Popular Foods 🍴</span>
        </motion.h1>

        <motion.div
          className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {popularItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-pink-100 cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Price Tag */}
              <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-base px-5 py-2 rounded-full shadow-md font-semibold">
                {item.price}
              </span>

              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-72 sm:h-80 object-cover rounded-t-3xl transition-transform duration-700 group-hover:scale-110"
              />

              {/* Title */}
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-6">{item.title}</h3>

              {/* Stars */}
              <div className="flex justify-center py-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-2xl mx-1"></i>
                ))}
              </div>

              {/* Button */}
              <motion.a
                href="#order"
                className="inline-block mt-6 mb-6 bg-pink-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-pink-600 shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now 🚀
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Popular;
