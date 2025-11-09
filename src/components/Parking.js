import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const parkingSpots = [
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
];

const Parking = () => {
  const navigate = useNavigate();
  const [bookedSpots, setBookedSpots] = useState(['A2', 'C3', 'B1']);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licensePlate: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookedSpots([...bookedSpots, selectedSpot]);
    setBookingSuccess(true);
    const mailtoLink = `mailto:vigneshgbecse@gmail.com?subject=Parking Reservation&body=Name: ${formData.name}%0ALicense Plate: ${formData.licensePlate}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ASpot: ${selectedSpot}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', licensePlate: '', date: '', time: '' });
  };

  const handleSpotClick = (spot) => {
    if (bookedSpots.includes(spot)) return;
    setSelectedSpot(spot);
    setBookingSuccess(false);
  };

  // --- NEW FUNCTION ---
  // Resets the UI after a successful booking
  const handleBookAnother = () => {
    setSelectedSpot(null);
    setBookingSuccess(false);
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // --- CUTE BACKGROUND PATTERN ---
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
    // --- 1. ADDED PADDING-TOP & NEW BACKGROUND STYLE ---
    <section 
      id="parking" 
      className="parking p-8 pt-32 min-h-screen"
      style={backgroundStyle}
    >
      <motion.button
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-700 bg-white p-2 px-4 rounded-full shadow hover:text-sky-500 mb-8 text-lg font-medium"
        whileHover={{ x: -5 }}
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </motion.button>
      
      <motion.h1
        className="heading text-center text-4xl mb-12 font-bold"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span>Pre-Book</span> Your Parking
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* --- 2. "CUTER" PARKING MAP --- */}
        <motion.div
          className="bg-gray-700 p-6 rounded-2xl shadow-lg" // Darker "asphalt" background
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Select Your Spot</h3>
          <div className="grid grid-cols-4 gap-4">
            {parkingSpots.map((spot) => {
              const isBooked = bookedSpots.includes(spot);
              const isSelected = selectedSpot === spot;

              return (
                <motion.button
                  key={spot}
                  disabled={isBooked}
                  onClick={() => handleSpotClick(spot)}
                  // --- 3. "CUTER" SPOT STYLES ---
                  className={`p-4 h-20 rounded-lg text-lg font-bold transition-all duration-200 flex items-center justify-center
                    ${isBooked ? 'bg-gray-600 text-red-400 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-sky-500 text-white ring-4 ring-white ring-opacity-50' : ''}
                    ${!isBooked && !isSelected ? 'bg-gray-600 text-yellow-400 border-2 border-dashed border-yellow-400 hover:bg-gray-500' : ''}
                  `}
                  whileHover={!isBooked ? { scale: 1.1 } : {}}
                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                >
                  {isBooked ? <i className="fas fa-car text-2xl"></i> : spot}
                </motion.button>
              );
            })}
          </div>
          {/* --- 4. "CUTER" LEGEND --- */}
          <div className="flex flex-wrap justify-around mt-6 text-white text-sm">
            <div className="flex items-center gap-2 m-1">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2 m-1">
              <i className="fas fa-car text-red-400"></i>
              <span>Taken</span>
            </div>
            <div className="flex items-center gap-2 m-1">
              <i className="fas fa-star text-sky-400"></i>
              <span>Selected</span>
            </div>
          </div>
        </motion.div>

        {/* --- 5. "CUTER" BOOKING FORM --- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            {selectedSpot && (
              <motion.div
                key="form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {!bookingSuccess ? (
                  <>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">
                      Book Spot: 
                      {/* --- 6. "CUTE" SPOT BADGE --- */}
                      <span className="ml-2 p-2 px-4 bg-sky-100 text-sky-700 rounded-full">
                        {selectedSpot}
                      </span>
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      {/* --- 7. "CUTE" INPUTS --- */}
                      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} value={formData.name} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="text" name="licensePlate" placeholder="License Plate" onChange={handleChange} value={formData.licensePlate} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="date" name="date" onChange={handleChange} value={formData.date} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="time" name="time" onChange={handleChange} value={formData.time} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <motion.button
                        type="submit"
                        className="p-4 bg-sky-500 text-black rounded-full font-bold text-lg mt-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center flex flex-col items-center justify-center h-full"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* --- 8. "CUTER" SUCCESS MESSAGE --- */}
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-check-circle text-green-500 text-7xl"></i>
                    </div>
                    <h3 className="text-3xl font-bold text-green-600 mb-2">Booked!</h3>
                    <p className="text-lg text-gray-700">Your spot <span className="font-bold">{selectedSpot}</span> is reserved.</p>
                    <p className="text-gray-600 mb-6">A confirmation email is on its way!</p>
                    {/* --- 9. NEW "BOOK ANOTHER" BUTTON --- */}
                    <motion.button
                      onClick={handleBookAnother}
                      className="p-3 px-6 bg-gray-200 text-gray-700 rounded-full font-medium text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Another Spot
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {!selectedSpot && (
              <motion.div
                key="select"
                className="text-center flex flex-col items-center justify-center h-full"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* --- 10. "CUTE" BOUNCY ICON --- */}
                <i className="fas fa-hand-pointer text-7xl text-gray-400 mb-4 animate-bounce"></i>
                <h3 className="text-3xl font-bold text-gray-700">Please select a spot</h3>
                <p className="text-lg text-gray-500">Click an available green spot on the map to begin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


export default Parking;
