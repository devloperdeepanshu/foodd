import React from 'react';
import { motion } from 'framer-motion';
// 1. --- IMPORT LINK ---
import { useNavigate, Link } from 'react-router-dom';

// 2. --- CREATE MOTIONLINK ---
const MotionLink = motion(Link);

const BTSLogo = () => (
// ... (BTSLogo component is the same)
);

// 3. --- ADDED 'id' TO EACH CAFE ---
const cafeData = [
  {
    id: 'the-cozy-mug',
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
    id: 'seoul-brew',
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
    id: 'readers-cafe',
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
    id: 'purple-haze',
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
    id: 'the-chai-stop',
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
  {
    id: 'pixel-play',
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

// ... (containerVariants and cardVariants are the same)
// ...
const Cafes = () => {
  const navigate = useNavigate();
  const backgroundStyle = { /* ... (background style is the same) ... */ };

  return (
    <section 
      id="cafes" 
      className="p-8 pt-32 min-h-screen"
      style={backgroundStyle}
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

      {/* FULL PAGE GRID */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cafeData.map((cafe) => (
          // 4. --- WRAPPED CARD IN MOTIONLINK ---
          <MotionLink
            to={`/cafes/${cafe.id}`} // This is the new link
            key={cafe.id}
            className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
            variants={cardVariants}
            whileHover={{ scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }}
          >
            {/* Image */}
            <div className="relative h-48">
              <img src={cafe.img} alt={cafe.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-green-700 text-white text-sm font-bold px-2 py-1 rounded-md">
                {cafe.rating} <i className="fas fa-star text-xs"></i>
              </div>
            </div>

            {/* Content (same as before) */}
            <div className="p-4">
              <h3 className="text-xl font-bold truncate">{cafe.name}</h3>
              {/* ... (rest of the card content) ... */}
            </div>
          </MotionLink>
        ))}
      </motion.div>
    </section>
  );
};

export default Cafes;
