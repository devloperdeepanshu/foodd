import React from 'react';
// 1. Import motion
import { motion } from 'framer-motion';

const Footer = () => {

  // 2. --- ANIMATION VARIANTS ---
  // Container for the 3 columns
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each column slides in
        delayChildren: 0.1,
      },
    },
  };

  // For each column
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  // For the list of social icons
  const iconListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Each icon bounces in
      },
    },
  };

  // For each individual icon
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', damping: 10, stiffness: 150 },
    },
  };
  // --- END VARIANTS ---

  return (
    // 3. --- CUTE COLOR ---
    // Changed bg-gray-100 to bg-teal-100
    <motion.footer
      className="footer bg-teal-100 text-gray-700 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-6xl mx-auto px-6 mb-8">
        {/* 4. --- RESPONSIVE GRID --- */}
        {/* Replaced flex-wrap with a responsive grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Column 1: Contact */}
          <motion.div className="footer-content" variants={itemVariants}>
            <h3 className="text-xl font-bold text-teal-700 mb-5">Contact Us</h3>
            <ul className="list-none p-0">
              <li className="text-base mb-3">Email: vigneshgbecse@gmail.com</li>
              <li className="text-base mb-3">Phone: +91 8525822546</li>
              <li className="text-base mb-3">Address: 132/4, Santhiveerappapuram Street, Punjai Sangenthi, Trichy - 621711, Tamil Nadu</li>
            </ul>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="footer-content" variants={itemVariants}>
            <h3 className="text-xl font-bold text-teal-700 mb-5">Quick Links</h3>
            <ul className="list-none p-0">
              <li className="mb-3"><a href="#home" className="text-gray-700 hover:text-red-500 transition duration-300">Home</a></li>
              <li className="mb-3"><a href="#speciality" className="text-gray-700 hover:text-red-500 transition duration-300">Our's Special</a></li>
              <li className="mb-3"><a href="#popular" className="text-gray-700 hover:text-red-500 transition duration-300">Popular Foods</a></li>
              <li className="mb-3"><a href="#review" className="text-gray-700 hover:text-red-500 transition duration-300">Customer Reviews</a></li>
            </ul>
          </motion.div>

          {/* Column 3: Follow Us */}
          <motion.div className="footer-content" variants={itemVariants}>
            <h3 className="text-xl font-bold text-teal-700 mb-5">Follow Us</h3>
            {/* 5. --- CUTE ICONS --- */}
            <motion.ul
              className="social-icons flex flex-wrap p-0 gap-4"
              variants={iconListVariants}
            >
              {[
                { href: "https://www.instagram.com/vicky_vigneshg/", icon: "fab fa-instagram" },
                { href: "https://www.linkedin.com/in/vigneshgbe/", icon: "fab fa-linkedin-in" },
                { href: "https://www.youtube.com/@Graduate-Hands", icon: "fab fa-youtube" },
                { href: "https://wa.me/+919047606037", icon: "fab fa-whatsapp" },
                { href: "https://github.com/Sweety-Vigneshg", icon: "fab fa-github" },
                { href: "https://in.pinterest.com/vigneshgbe/", icon: "fab fa-pinterest" },
              ].map((social) => (
                <motion.li key={social.icon} className="list-none" variants={iconVariants}>
                  <a
                    href={social.href}
                    // 6. --- CUTE CIRCLE STYLE ---
                    className="text-teal-700 text-2xl w-12 h-12 rounded-full bg-teal-200 
                               flex items-center justify-center
                               transition duration-300
                               hover:text-red-500 hover:bg-white hover:shadow-lg hover:scale-110"
                  >
                    <i className={social.icon}></i>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
      
      {/* 7. --- ANIMATED CREDIT --- */}
      <motion.h1
        className="credit py-10 px-4 text-gray-700 font-normal text-2xl text-center border-t border-teal-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }} // Fades in after columns
      >
      </motion.h1>
    </motion.footer>
  );
};

export default Footer;