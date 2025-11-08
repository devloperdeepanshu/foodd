import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setIsChatOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ... (variants) ...
  const menuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.3 } }
  };
  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.5 }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-6 md:px-12 py-5 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.a 
        href="#" 
        className="text-3xl md:text-4xl font-bold text-gray-800"
        whileHover={{ scale: 1.05, rotate: -3 }}
      >
        <i className="fas fa-utensils pr-2 text-red-500"></i>
        Tasty
      </motion.a>
      
      <nav className="hidden md:flex items-center gap-6">
        <motion.a href="#home" className="text-xl text-gray-600 hover:text-red-500" whileHover={{ y: -3 }}>home</motion.a>
        <motion.a href="#speciality" className="text-xl text-gray-600 hover:text-red-500" whileHover={{ y: -3 }}>special</motion.a>
        <motion.a href="#popular" className="text-xl text-gray-600 hover:text-red-500" whileHover={{ y: -3 }}>popular</motion.a>
        <motion.a href="#gallery" className="text-xl text-gray-600 hover:text-red-500" whileHover={{ y: -3 }}>gallery</motion.a>
        <motion.a href="#review" className="text-xl text-gray-600 hover:text-red-500" whileHover={{ y: -3 }}>reviews</motion.a>
        
        <motion.button 
          className="text-2xl text-gray-600 hover:text-red-500"
          whileHover={{ y: -3, scale: 1.1 }}
          onClick={() => setIsChatOpen(prev => !prev)} 
        >
          <i className="fas fa-comments"></i>
        </motion.button>
        
        <div className="flex items-center gap-4 ml-2">
          <motion.a 
            href="#parking" 
            className="text-red-500 border-2 border-red-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Parking
          </motion.a>
          <motion.a 
            href="#order" 
            className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-Order
          </motion.a>
        </div>
      </nav>
      
      <div 
        id="menu-bar" 
        className="w-10 h-10 flex items-center justify-center text-3xl cursor-pointer text-gray-600 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.i key="times" className="fas fa-times" variants={iconVariants} initial="hidden" animate="visible" exit="exit"></motion.i>
          ) : (
            <motion.i key="bars" className="fas fa-bars" variants={iconVariants} initial="hidden" animate="visible" exit="exit"></motion.i>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="absolute top-full left-0 right-0 bg-white shadow-xl flex flex-col items-center py-8 md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          >
            <motion.a href="#home" className="text-2xl text-gray-600 hover:text-red-500 py-3" variants={linkVariants} onClick={() => setMenuOpen(false)}>home</motion.a>
            <motion.a href="#speciality" className="text-2xl text-gray-600 hover:text-red-500 py-3" variants={linkVariants} onClick={() => setMenuOpen(false)}>special</motion.a>
            <motion.a href="#popular" className="text-2xl text-gray-600 hover:text-red-500 py-3" variants={linkVariants} onClick={() => setMenuOpen(false)}>popular</motion.a>
            <motion.a href="#gallery" className="text-2xl text-gray-600 hover:text-red-500 py-3" variants={linkVariants} onClick={() => setMenuOpen(false)}>gallery</motion.a>
            <motion.a href="#review" className="text-2xl text-gray-600 hover:text-red-500 py-3" variants={linkVariants} onClick={() => setMenuOpen(false)}>reviews</motion.a>
            
            <motion.a 
              href="#" 
              className="text-2xl text-gray-600 hover:text-red-500 py-3" 
              variants={linkVariants} 
              onClick={() => {
                setIsChatOpen(true); 
                setMenuOpen(false); 
              }}
            >
              Chat With Us
            </motion.a>
            
            <motion.div 
              className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-100 w-3/4"
              variants={linkVariants}
            >
              <motion.a 
                href="#parking" 
                className="text-center text-red-500 border-2 border-red-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Parking
              </motion.a>
              <motion.a 
                href="#order" 
                className="text-center bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Pre-Order
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;