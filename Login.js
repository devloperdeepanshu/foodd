import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeBg from '../imgs/home-bg.jpg'; // Using the same nice background

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you'd check a password.
    // For now, we just go to the home page.
    navigate('/home');
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-8 pt-32"
      style={{ backgroundImage: `url(${homeBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <motion.div 
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl text-center"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        <i className="fas fa-utensils text-7xl text-red-500 mb-6"></i>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-red-500">Tasty</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">Sign in to discover your next favorite meal.</p>
        
        {/* Fake form for show */}
        <form className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email (e.g., user@tasty.com)" 
            className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none" 
          />
        </form>

        <motion.button
          onClick={handleLogin}
          className="w-full p-4 bg-red-500 text-black rounded-full font-bold text-lg mt-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login & Explore
        </motion.button>
        
        <p className="text-gray-500 mt-6">
          Just exploring? Click Login to see the app!
        </p>
      </motion.div>
    </div>
  );
};

export default Login;