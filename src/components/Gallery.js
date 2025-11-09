import React from 'react';
import { motion } from 'framer-motion';

// Import images
import g1 from '../imgs/g-1.jpg';
import g3 from '../imgs/g-3.jpg';
import g4 from '../imgs/g-4.jpg';
import g5 from '../imgs/g-5.jpg';
import g8 from '../imgs/g-8.jpg';
import p5 from '../imgs/p-5.jpg';
import p6 from '../imgs/p-6.jpg';

const Gallery = () => {
  const galleryItems = [
    { img: g1, title: "Yummy Pizza 🍕" },
    { img: g3, title: "Juicy Burger 🍔" },
    { img: g4, title: "Creamy Pasta 🍝" },
    { img: g5, title: "Sweet Donut 🍩" },
    { img: p5, title: "Rainbow Cupcake 🧁" },
    { img: g8, title: "Crispy Fries 🍟" },
    { img: p6, title: "Happy Meal 😋" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 12, stiffness: 120 } },
  };

  return (
    <section id="gallery" className="gallery p-10 bg-gradient-to-b from-[#fff7f7] to-[#ffe6e6] cursor-pointer">
      <motion.h1
        className="heading text-center text-5xl mb-14 font-extrabold text-pink-600"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Cute <span className="text-orange-400">Food Gallery 🍭</span>
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="box-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryItems.map((item, index) => {
            const isLastItem = index === 6;
            const cardClasses = [
              "relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white group bg-white/50 backdrop-blur-sm",
              isLastItem ? "sm:col-span-2 lg:col-span-3" : ""
            ].join(" ");

            return (
              <motion.div
                key={index}
                className={cardClasses}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full h-80 sm:h-96 object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${!isLastItem ? 'aspect-video' : ''}`}
                />

                {/* Floating text + button */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl sm:text-5xl font-extrabold text-white mb-4 hover-text-outline"
                  >
                    {item.title}
                  </motion.h2>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    className="bg-pink-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-pink-500 transition-all text-lg sm:text-xl"
                  >
                    😋 Let's Eat!
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
