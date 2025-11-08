import React from 'react';
import { motion } from 'framer-motion';

// Import images
import p1 from '../imgs/p-1.jpg';
import p2 from '../imgs/p-2.jpg';
import p3 from '../imgs/p-3.jpg';
import p4 from '../imgs/p-4.jpg';
import p5 from '../imgs/p-5.jpg';
import p6 from '../imgs/p-6.jpg';

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
    <section id="popular" className="popular p-10 bg-gradient-to-b from-[#fff7f7] to-[#ffe6e6]">
      <motion.h1
        className="heading text-center text-4xl mb-12 font-extrabold text-pink-600"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Most <span className="text-orange-400">Popular Foods 🍴</span>
      </motion.h1>

      <motion.div
        className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {popularItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-center group border border-pink-100"
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Price Tag */}
            <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm sm:text-base px-4 py-1 rounded-full shadow-md font-semibold">
              {item.price}
            </span>

            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover rounded-t-3xl transition-transform duration-700 group-hover:scale-110"
            />

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mt-4">{item.title}</h3>

            {/* Stars */}
            <div className="flex justify-center py-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-lg mx-0.5"></i>
              ))}
            </div>

            {/* Button */}
            <motion.a
              href="#order"
              className="inline-block mt-4 mb-6 bg-pink-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-pink-600 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now 🚀
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Popular;
