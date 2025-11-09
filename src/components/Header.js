import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';

// Motion Link for React Router
const MotionLink = motion(Link);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userCount, setUserCount] = useState(Math.floor(Math.random() * 150) + 50);

  // Live user count effect
  useEffect(() => {
    const interval = setInterval(() => {    
      const change = Math.floor(Math.random() * 7) - 3;
      setUserCount(prev => Math.max(50, prev + change));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-6 md:px-12 py-5 shadow-lg relative"
    >
      {/* Logo */}
      <motion.div 
        className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2"
        whileHover={{ scale: 1.05, rotate: -3 }}
      >
        <i className="fas fa-utensils text-red-500"></i>
        <MotionLink to="/">Tasty</MotionLink>
      </motion.div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <motion.a href="/" whileHover={{ y: -3 }} className="text-xl text-gray-600 hover:text-red-500">home</motion.a>
        <motion.a href="#speciality" whileHover={{ y: -3 }} className="text-xl text-gray-600 hover:text-red-500">special</motion.a>
        <motion.a href="#popular" whileHover={{ y: -3 }} className="text-xl text-gray-600 hover:text-red-500">popular</motion.a>
        <motion.a href="#gallery" whileHover={{ y: -3 }} className="text-xl text-gray-600 hover:text-red-500">gallery</motion.a>
        <motion.a href="#review" whileHover={{ y: -3 }} className="text-xl text-gray-600 hover:text-red-500">reviews</motion.a>

        {/* Hanging Live Users Indicator */}
        <div className="relative flex flex-col items-center ml-4">
          {/* The string */}
          <div className="w-[2px] h-8 bg-gray-300 origin-top"></div>

          {/* Swinging user bubble */}
          <motion.div
            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md"
            initial={{ rotate: -20 }}
            animate={{ rotate: [ -20, 20, -20 ] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <i className="fas fa-circle text-green-500 text-xs"></i>
            <span className="font-medium text-sm md:text-lg">Live: {userCount}</span>
          </motion.div>
        </div>

        {/* Chat button */}
        <motion.button 
          className="text-2xl text-gray-600 hover:text-red-500 ml-4"
          whileHover={{ y: -3, scale: 1.1 }}
          onClick={() => setIsChatOpen(prev => !prev)}
          title="Chat With Us"
        >
          <i className="fas fa-comments"></i>
        </motion.button>

        {/* Parking / Pre-Order / Meme Suggester */}
        <div className="flex items-center gap-4 ml-2">
          <MotionLink
            to="/parking"
            className="text-red-500 border-2 border-red-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Parking
          </MotionLink>
           <MotionLink
            to="/cafes"
            className="text-red-500 border-2 border-red-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cafes
          </MotionLink>
          <motion.a
            href="#order"
            className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-Order
          </motion.a>
          <MotionLink
            to="/suggester"
            className="text-pink-500 border-2 border-pink-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-pink-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meme Suggester 😸
          </MotionLink>
        </div>
      </nav>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <motion.button onClick={() => setMenuOpen(prev => !prev)} whileTap={{ scale: 0.9 }}>
          <i className="fas fa-bars text-2xl text-gray-800"></i>
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute top-full left-0 right-0 bg-white shadow-xl flex flex-col items-center py-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.a href="/" onClick={() => setMenuOpen(false)} className="py-2 text-xl">home</motion.a>
            <motion.a href="#speciality" onClick={() => setMenuOpen(false)} className="py-2 text-xl">special</motion.a>
            <motion.a href="#popular" onClick={() => setMenuOpen(false)} className="py-2 text-xl">popular</motion.a>
            <motion.a href="#gallery" onClick={() => setMenuOpen(false)} className="py-2 text-xl">gallery</motion.a>
            <motion.a href="#review" onClick={() => setMenuOpen(false)} className="py-2 text-xl">reviews</motion.a>
            <motion.a onClick={() => { setIsChatOpen(true); setMenuOpen(false); }} className="py-2 text-xl cursor-pointer">Chat With Us</motion.a>

            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-100 w-3/4">
              <MotionLink
                to="/parking"
                className="text-center text-red-500 border-2 border-red-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Parking
              </MotionLink>
              <motion.a
                href="#order"
                className="text-center bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Pre-Order
              </motion.a>
              <MotionLink
                to="/suggester"
                className="text-center text-pink-500 border-2 border-pink-500 px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-pink-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Meme Suggester 😸
              </MotionLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </motion.header>
  );
};

export default Header;
