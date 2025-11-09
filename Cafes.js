import React from 'react'; // Removed useRef, useState, useEffect as they are no longer needed
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 1. --- "Cute" BTS Logo Animation ---
const BTSLogo = () => (
  <motion.div
    className="w-4 h-4 relative"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="w-2 h-4 bg-purple-500 rounded-tl-sm rounded-bl-sm absolute left-0"></div>
    <div className="w-2 h-4 bg-purple-500 rounded-tr-sm rounded-br-sm absolute right-0"></div>
  </motion.div>
);

// 2. --- Mock Data for Cafes ---
const cafeData = [
  {
    name: 'The Cozy Mug',
    tags: ['Coffee', 'Bakery'],
    rating: 4.5,
    location: 'Connaught Place, Delhi',
    distance: '0.5 km',
    price: '₹700 for two',
    img: 'https://placehold.co/400x300/A1887F/FFFFFF?text=Cozy+Mug',
    offers: ['Up to 15% off', 'Free Coffee'],
    features: ['AC', 'Good Seating']
  },
  {
    name: 'Seoul Brew',
    tags: ['K-Pop', 'Boba Tea'],
    rating: 4.8,
    location: 'Majnu-ka-tilla, Delhi',
    distance: '1.2 km',
    price: '₹900 for two',
    img: 'https://placehold.co/400x300/E1BEE7/9C27B0?text=Seoul+Brew',
    offers: ['10% off on Boba'],
    features: ['AC', 'K-Pop Vibe', 'BTS']
  },
  {
    name: 'Reader\'s Cafe',
    tags: ['Books', 'Quiet'],
    rating: 4.6,
    location: 'Indiranagar, Bangalore',
    distance: '0.8 km',
    price: '₹600 for two',
    img: 'https://placehold.co/400x300/8D6E63/FFFFFF?text=Reader\'s+Cafe',
    offers: ['Flat 10% off'],
    features: ['AC', 'Good Seating', 'Library']
  },
  {
    name: 'Purple Haze',
    tags: ['BTS Army', 'Desserts'],
    rating: 4.9,
    location: 'Koramangala, Bangalore',
    distance: '2.1 km',
    price: '₹1000 for two',
    img: 'https://placehold.co/400x300/D1C4E9/673AB7?text=Purple+Haze',
    offers: ['Buy 1 Get 1 Free Dessert'],
    features: ['AC', 'Good Seating', 'K-Pop Vibe', 'BTS']
  },
  {
    name: 'The Chai Stop',
    tags: ['Tea', 'Snacks'],
    rating: 4.2,
    location: 'Jayanagar, Bangalore',
    distance: '0.3 km',
    price: '₹300 for two',
    img: 'https://placehold.co/400x300/FFAB91/E64A19?text=Chai+Stop',
    offers: ['Combo Offer'],
    features: ['Good Seating']
  },
  // 3. --- ADDED A 6TH CARD TO FILL THE GRID ---
  {
    name: 'Pixel Play',
    tags: ['Gaming', 'Shakes'],
    rating: 4.7,
    location: 'Church Street, Bangalore',
    distance: '1.5 km',
    price: '₹800 for two',
    img: 'https://placehold.co/400x300/90A4AE/FFFFFF?text=Pixel+Play',
    offers: ['1-Hour Free VR'],
    features: ['AC', 'Good Seating', 'Gaming']
  }
];

// 4. --- NEW ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each card loads 0.1s after the last
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 100 },
  },
};

const Cafes = () => {
  const navigate = useNavigate();

  // 5. --- "CUTE" BACKGROUND PATTERN ---
  const backgroundStyle = {
    backgroundColor: '#f0f9ff', // bg-sky-50
    backgroundImage: `
      linear-gradient(135deg, #dbeafe 25%, transparent 25%),
      linear-gradient(225deg, #dbeafe 25%, transparent 25%),
      linear-gradient(45deg, #dbeafe 25%, transparent 25%),
      linear-gradient(315deg, #dbeafe 25%, #f0f9ff 25%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
  };

  return (
    <section 
      id="cafes" 
      className="p-8 pt-32 min-h-screen"
      style={backgroundStyle} // 6. --- APPLIED BACKGROUND ---
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/home')}
        className="flex items-center gap-2 text-gray-700 bg-white p-2 px-4 rounded-full shadow hover:text-sky-500 mb-8 text-lg font-medium"
        whileHover={{ x: -5 }}
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </motion.button>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-12 text-center">Discover the best cafes</h1>

      {/* 7. --- FULL PAGE GRID (Replaces Carousel) --- */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cafeData.map((cafe) => (
          // 8. --- ANIMATED CARD ---
          <motion.div
            key={cafe.name}
            className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
            variants={cardVariants} // Pop-in animation
            whileHover={{ scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }} // Hover animation
          >
            {/* Image */}
            <div className="relative h-48">
              <img src={cafe.img} alt={cafe.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-green-700 text-white text-sm font-bold px-2 py-1 rounded-md">
                {cafe.rating} <i className="fas fa-star text-xs"></i>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold truncate">{cafe.name}</h3>
              <p className="text-sm text-gray-500 truncate">{cafe.tags.join(', ')}</p>
              <div className="flex justify-between text-sm text-gray-600 my-2">
                <span>{cafe.price}</span>
                <span>{cafe.distance}</span>
              </div>
              
              {/* "CUTE" FEATURES DISPLAY */}
              <div className="flex flex-wrap gap-2 my-3">
                {cafe.features.includes('AC') && (
                  <div className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-wind"></i>
                    <span>AC</span>
                  </div>
                )}
                {cafe.features.includes('Good Seating') && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-chair"></i>
                    <span>Good Seating</span>
                  </div>
                )}
                {cafe.features.includes('K-Pop Vibe') && (
                  <div className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    {cafe.features.includes('BTS') && <BTSLogo />}
                    <span>K-Pop Vibe</span>
                  </div>
                )}
                {cafe.features.includes('Library') && (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-book"></i>
                    <span>Library</span>
                  </div>
                )}
                {cafe.features.includes('Gaming') && (
                  <div className="flex items-center gap-1 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-gamepad"></i>
                    <span>Gaming</span>
                  </div>
                )}
                
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm text-green-600 font-medium">{cafe.offers.join(' | ')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Cafes;