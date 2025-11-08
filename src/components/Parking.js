import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A helper array for our parking spots
const parkingSpots = [
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
];

const Parking = () => {
  // We'll hard-code some "taken" spots to make it look real
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

  const handleSpotClick = (spot) => {
    if (bookedSpots.includes(spot)) return; // Can't select a booked spot
    setSelectedSpot(spot);
    setBookingSuccess(false); // Reset success message if changing spot
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the newly booked spot to the list
    setBookedSpots([...bookedSpots, selectedSpot]);
    setBookingSuccess(true);

    // Send the email (just like your order form)
    const mailtoLink = `mailto:vigneshgbecse@gmail.com?subject=Parking Reservation&body=Name: ${formData.name}%0ALicense Plate: ${formData.licensePlate}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ASpot: ${selectedSpot}`;
    window.location.href = mailtoLink;

    // Reset the form
    setFormData({ name: '', licensePlate: '', date: '', time: '' });
  };

  // Animation for the form/success message
  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section id="parking" className="parking p-8 bg-gray-50">
      {/* Animated Heading */}
      <motion.h1
        className="heading text-center text-4xl mb-12 font-bold"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span>Pre-Book</span> Your Parking
      </motion.h1>

      {/* Main container: Map on left, Form on right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* --- Column 1: The Parking Map --- */}
        <motion.div
          className="bg-gray-200 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-700 text-center mb-4">Select Your Spot</h3>
          {/* The grid of spots */}
          <div className="grid grid-cols-4 gap-4">
            {parkingSpots.map((spot) => {
              const isBooked = bookedSpots.includes(spot);
              const isSelected = selectedSpot === spot;

              return (
                <motion.button
                  key={spot}
                  disabled={isBooked}
                  onClick={() => handleSpotClick(spot)}
                  className={`p-4 h-20 rounded-lg text-lg font-bold transition-all duration-200
                    ${isBooked ? 'bg-red-300 text-red-700 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-sky-500 text-white ring-4 ring-sky-300' : ''}
                    ${!isBooked && !isSelected ? 'bg-green-200 text-green-800 hover:bg-green-300' : ''}
                  `}
                  whileHover={!isBooked ? { scale: 1.1 } : {}}
                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                >
                  {isBooked ? <i className="fas fa-car text-2xl"></i> : spot}
                </motion.button>
              );
            })}
          </div>
          <div className="flex justify-around mt-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-green-200 border border-green-400"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-red-300 border border-red-400"></div>
              <span>Taken</span>
            </div>
          </div>
        </motion.div>

        {/* --- Column 2: The Booking Form --- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            {/* Show this if a spot IS selected */}
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
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      Book Spot: <span className="text-sky-500">{selectedSpot}</span>
                    </h3>
                    <p className="text-gray-600 mb-6">Fill in your details to reserve your spot.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} value={formData.name} className="p-3 rounded-lg border" required />
                      <input type="text" name="licensePlate" placeholder="License Plate" onChange={handleChange} value={formData.licensePlate} className="p-3 rounded-lg border" required />
                      <input type="date" name="date" onChange={handleChange} value={formData.date} className="p-3 rounded-lg border" required />
                      <input type="time" name="time" onChange={handleChange} value={formData.time} className="p-3 rounded-lg border" required />
                      <motion.button
                        type="submit"
                        className="p-4 bg-sky-500 text-white rounded-full font-bold text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </form>
                  </>
                ) : (
                  // Show this after successful booking
                  <motion.div
                    key="success"
                    className="text-center flex flex-col items-center justify-center h-full"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <i className="fas fa-check-circle text-green-500 text-7xl mb-4"></i>
                    <h3 className="text-3xl font-bold text-green-600 mb-2">Booked!</h3>
                    <p className="text-lg text-gray-700">Your spot <span className="font-bold">{selectedSpot}</span> is reserved.</p>
                    <p className="text-gray-600">A confirmation email is on its way!</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Show this if NO spot is selected */}
            {!selectedSpot && (
              <motion.div
                key="select"
                className="text-center flex flex-col items-center justify-center h-full"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <i className="fas fa-hand-pointer text-7xl text-gray-400 mb-4"></i>
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