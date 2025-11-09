import React, { useState } from 'react';
// 1. Import motion
import { motion } from 'framer-motion';

const Order = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    foodName: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:vigneshgbecse@gmail.com?subject=Order Request&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AFood Name: ${formData.foodName}%0AAddress: ${formData.address}`;
    window.location.href = mailtoLink;
  };

  // 2. --- ANIMATION VARIANTS ---
  // Container for the form, to stagger the items
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.15 // Each item animates 0.15s after the last
      }
    }
  };

  // Variant for each item (the input rows, textarea, and button)
  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, // Slide in from the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  // --- END VARIANTS ---

  return (
    // 3. --- CUTE SECTION STYLE ---
    // Added padding and a light red background
    <section id="order" className="order p-8 bg-red-50">
      <motion.h1
        className="heading text-center text-4xl mb-12 font-bold"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span>order</span> now
      </motion.h1>

      {/* 4. --- CUTE CARD STYLE --- */}
      {/* Made it rounded-2xl to be cuter */}
      <div className="row p-8 shadow-lg bg-white flex flex-wrap gap-6 rounded-2xl w-full max-w-4xl mx-auto">
        
        {/* 5. --- ANIMATED FORM --- */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 min-w-0 w-full"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is in view
        >
          {/* 6. Animate the first row */}
          <motion.div
            className="inputBox flex flex-wrap justify-between"
            variants={itemVariants}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              // 7. --- CUTE INPUT STYLE ---
              // Added rounded-lg and focus:ring for a soft glow
              className="p-4 my-4 text-xl text-gray-800 border border-gray-300 rounded-lg w-full md:w-5/12
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your E-mail"
              value={formData.email}
              onChange={handleChange}
              className="p-4 my-4 text-xl text-gray-800 border border-gray-300 rounded-lg w-full md:w-5/12
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
              required
            />
          </motion.div>

          {/* 8. Animate the second row */}
          <motion.div
            className="inputBox flex flex-wrap justify-between"
            variants={itemVariants}
          >
            <input
              type="number"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-4 my-4 text-xl text-gray-800 border border-gray-300 rounded-lg w-full md:w-5/12
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
              required
            />
            <input
              type="text"
              name="foodName"
              placeholder="Food You Want"
              value={formData.foodName}
              onChange={handleChange}
              className="p-4 my-4 text-xl text-gray-800 border border-gray-300 rounded-lg w-full md:w-5/12
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
              required
            />
          </motion.div>

          {/* 9. Animate the textarea */}
          <motion.textarea
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            className="p-4 my-4 text-xl text-gray-800 border border-gray-300 rounded-lg w-full h-60 resize-none
                       focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
            required
            variants={itemVariants}
          ></motion.textarea>
          
          {/* 10. --- BETTER BUTTON ALIGNMENT --- */}
          {/* Wrapped in a div to align it cleanly to the right */}
          <motion.div
            className="flex justify-end mt-5"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              // 11. --- CUTE BUTTON STYLE ---
              // Made it rounded-full
              className="bg-red text-white px-8 py-3 text-lg font-bold rounded-full cursor-pointer hover:bg-red-600 transition duration-300 w-full sm:w-60"
              // 12. --- Bouncy animation ---
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default Order;