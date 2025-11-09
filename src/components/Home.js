import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import homeImg from '../imgs/home-img.png';
import homeBg from '../imgs/home-bg.jpg';

const Home = () => {
  const taglines = ["Tasty Bites", "Fresh & Fast", "Order Now"];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const contentVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="home"
      // --- THE FIX ---
      // 1. flex-col (stacks on mobile) -> lg:flex-row (side-by-side on large)
      // 2. items-center (centers the content and image horizontally on mobile)
      // 3. gap-8 (adds space between text and image when stacked)
      // 4. Added padding (px-6) and more top/bottom padding (pt-24 pb-12)
      className="home flex flex-col lg:flex-row gap-8 items-center bg-cover bg-center bg-no-repeat min-h-screen pt-24 pb-12 px-6 md:px-12"
      // --- END FIX ---
      style={{ backgroundImage: `url(${homeBg})` }}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        // --- THE FIX ---
        // 1. On large screens, it takes up flex-1 (half the space)
        // 2. On mobile, text is centered. On large, text is left.
        className="content lg:flex-1 text-center lg:text-left"
        // --- END FIX ---
        variants={contentVariants}
      >
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentTaglineIndex}
            className="text-4xl sm:text-5xl md:text-6xl text-gray-800"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {taglines[currentTaglineIndex]}
          </motion.h3>
        </AnimatePresence>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 py-4"
          variants={itemVariants}
        >
          Welcome to Tasty Bites, where every meal is a culinary masterpiece delivered straight to your door.
          Explore a world of flavors with our diverse menu, curated from the finest ingredients and prepared by
          top chefs. Whether you're craving gourmet cuisine, comforting classics, or exotic dishes, SavorDelight
          promises a dining experience that's always fresh, delicious, and convenient. Order now and indulge in
          the delight of exceptional food, made just for you. Bon appétit!
        </motion.p>

        <motion.a
          href="#order"
          className="btn inline-block px-8 py-3 border-2 border-red text-red cursor-pointer text-xl rounded hover:bg-red hover:text-white transition duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          order now
        </motion.a>
      </motion.div>

      <motion.div
        // --- THE FIX ---
        // 1. On large screens, it takes up flex-1 (half the space)
        // 2. On mobile, it's a full-width block, centered by the parent's `items-center`
        // 3. We cap its max-width at `max-w-md` (medium, 448px) on mobile so it looks good.
        // 4. On large screens, we remove this cap with `lg:max-w-none`.
        className="image lg:flex-1 w-full max-w-md lg:max-w-none"
        // --- END FIX ---
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.img
          src={homeImg}
          alt=""
          className="w-full" // Image always fills its container
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.section>
  );
};

export default Home;