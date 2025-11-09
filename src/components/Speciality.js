import React from 'react';
// 1. Import motion from Framer Motion
import { motion } from 'framer-motion';

// Import images
import sImg1 from '../imgs/s-img-1.jpg';
import sImg2 from '../imgs/s-img-2.jpg';
import sImg3 from '../imgs/s-img-3.jpg';
import sImg4 from '../imgs/s-img-4.jpg';
import sImg5 from '../imgs/s-img-5.jpg';
import sImg6 from '../imgs/s-img-6.jpg';
import s1 from '../imgs/s-1.png';
import s2 from '../imgs/s-2.png';
import s3 from '../imgs/s-3.png';
import s4 from '../imgs/s-4.png';
import s5 from '../imgs/s-5.png';
import s6 from '../imgs/s-6.png';

const Speciality = () => {
  const specialities = [
    {
      img: sImg1,
      icon: s1,
      title: 'tasty burger',
      desc: 'In our Tasty Burger, a perfect blend of succulent, premium beef, fresh, crisp vegetables, and our signature sauce, all nestled in a perfectly toasted bun. Each bite promises a burst of mouthwatering flavors that will leave you craving more. Experience burger perfection today!'
    },
    {
      img: sImg2,
      icon: s2,
      title: 'tasty pizza',
      desc: 'Savor our Tasty Pizza, crafted with a crispy, golden crust, rich tomato sauce, and the finest, freshest toppings. Melted cheese and a perfect blend of herbs make every slice a delightful experience. Enjoy a slice of pizza perfection!'
    },
    {
      img: sImg3,
      icon: s3,
      title: 'cold ice-cream',
      desc: 'Treat yourself to our Cold Ice Cream, a creamy, dreamy delight that melts in your mouth. Choose from a variety of rich, indulgent flavors, each crafted to perfection. Refreshingly cool and irresistibly smooth, it\'s the perfect treat for any time of day.'
    },
    {
      img: sImg4,
      icon: s4,
      title: 'cold drinks',
      desc: 'Quench your thirst with our Cold Drinks, a refreshing selection of beverages that offer a burst of cool, invigorating flavors. Whether you prefer classic sodas, sparkling waters, or fruity refreshments, each sip is a delightful way to stay cool and refreshed. Enjoy the chill!'
    },
    {
      img: sImg5,
      icon: s5,
      title: 'tasty sweets',
      desc: 'Delight in our Tasty Sweets, a heavenly assortment of desserts crafted to satisfy your sweet tooth. From decadent cakes and pastries to creamy puddings and confections, each treat is made with the finest ingredients for an indulgent experience. Enjoy the sweetness in every bite!'
    },
    {
      img: sImg6,
      icon: s6,
      title: 'tasty breakfast',
      desc: 'Start your day right with our Tasty Breakfast, featuring a delicious array of morning favorites. From fluffy pancakes and golden waffles to hearty omelets and fresh fruit bowls, every dish is made to energize and satisfy. Enjoy a breakfast that\'s both delicious and nourishing!'
    }
  ];

  // 2. Define animation variants for the container (to stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each card will animate 0.2s after the previous
      },
    },
  };

  // 3. Define animation variants for the cards themselves
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start invisible and slightly smaller
    visible: {
      opacity: 1,
      scale: 1, // End fully visible and at normal size
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    // Add padding to the section for better spacing
    <section id="speciality" className="speciality p-8">
      {/* 4. Animate the heading as well */}
      <motion.h1 
        className="heading text-center text-4xl mb-12 font-bold" // Added styling to the heading
        initial={{ opacity: 0, y: -50 }}
        // Animate when it scrolls into view
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.5 }}
      >
        our's <span>special</span>
      </motion.h1>

      {/* 5. Apply motion to the container */}
      <motion.div 
        // 6. --- THIS IS THE NEW LAYOUT ---
        // We replace flexbox with CSS Grid for perfect columns
        // grid-cols-1: 1 column on mobile
        // sm:grid-cols-2: 2 columns on small screens (tablets)
        // lg:grid-cols-3: 3 columns on large screens (desktop)
        className="box-container grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        // 7. --- THIS IS THE SCROLL ANIMATION ---
        // `whileInView` triggers the animation when the element enters the viewport
        whileInView="visible"
        // `viewport` configures the trigger. 
        // `once: true` means it only animates once.
        // `amount: 0.2` means it triggers when 20% of the container is visible.
        viewport={{ once: true, amount: 0.2 }}
      >
        {specialities.map((item, index) => (
          // 8. Apply motion to each card and apply the cardVariants
          <motion.div 
            key={index} 
            // 9. Removed 'flex-1 min-w-0' as it's not needed for grid
            className="box relative overflow-hidden shadow-lg border border-gray-300 rounded cursor-pointer group"
            variants={cardVariants}
            // Note: We don't need `initial` or `animate` here
            // because the parent `motion.div` controls them with `staggerChildren`.
          >
            {/* The rest of your card content stays exactly the same! */}
            <img className="image w-full h-full object-cover absolute -top-full left-0 transition-all duration-300 group-hover:top-0" src={item.img} alt="" />
            <div className="content text-center bg-white p-8 transition-all duration-300 group-hover:translate-y-full">
              <img src={item.icon} alt="" className="mx-auto my-6" />
              <h3 className="text-3xl text-gray-800">{item.title}</h3>
              <p className="text-lg text-gray-600 py-4">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Speciality;