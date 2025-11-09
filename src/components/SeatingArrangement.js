import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 1. --- SIMPLE TABLE LAYOUT (Just like parkingSpots) ---
const tablesLayout = [
  'T1', 'T2', 'T3', 'T4',
  'T5', 'T6', 'T7', 'T8',
  'T9', 'T10', 'T11', 'T12',
];

const SeatingArrangement = () => {
  const navigate = useNavigate();
  const [bookedTables, setBookedTables] = useState(['T2', 'T5', 'T9']);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', time: '', cafeName: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookedTables([...bookedTables, selectedTable]);
    setBookingSuccess(true);
    const mailtoLink = `mailto:vigneshgbecse@gmail.com?subject=Table Reservation&body=Cafe Name: ${formData.cafeName}%0AName: ${formData.name}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ATable: ${selectedTable}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', date: '', time: '', cafeName: '' });
  };

  const handleTableClick = (table) => {
    if (bookedTables.includes(table)) return;
    setSelectedTable(table);
    setBookingSuccess(false);
  };

  const handleBookAnother = () => {
    setSelectedTable(null);
    setBookingSuccess(false);
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // "CUTE" BACKGROUND (Same as before)
  const backgroundStyle = {
    backgroundColor: '#f0f9ff', // bg-sky-50
    backgroundImage: `
      linear-gradient(135deg, #dbeafe 25%, transparent 25%),
      linear-gradient(225deg, #dbeafe 25%, transparent 25%),
      linear-gradient(45deg, #dbeafe 25%, transparent 25%),
      linear-gradient(315deg, #dbeafe 25%, #f0f9ff 25%)
    `,
    backgroundSize: '20px 20px',
  };

  return (
    <section 
      id="seating" 
      className="p-8 pt-32 min-h-screen"
      style={backgroundStyle}
    >
      <motion.button
        onClick={() => navigate('/cafes')} // Go back to cafes list
        className="flex items-center gap-2 text-gray-700 bg-white p-2 px-4 rounded-full shadow hover:text-sky-500 mb-8 text-lg font-medium"
        whileHover={{ x: -5 }}
      >
        <i className="fas fa-arrow-left"></i>
        Back to Cafes
      </motion.button>
      
      <motion.h1
        className="heading text-center text-4xl mb-12 font-bold"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Book a <span className="text-sky-500">Table</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* --- 2. "PARKING BOX" STYLE MAP --- */}
        <motion.div
          className="bg-gray-700 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Select Your Table</h3>
          {/* 3. --- SIMPLE 4-COLUMN GRID --- */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
            {tablesLayout.map((table) => {
              const isBooked = bookedTables.includes(table);
              const isSelected = selectedTable === table;

              return (
                <motion.button
                  key={table}
                  disabled={isBooked}
                  onClick={() => handleTableClick(table)}
                  // 4. --- "PARKING BOX" SPOT STYLES ---
                  className={`rounded-lg font-bold transition-all duration-200 flex flex-col items-center justify-center p-2 h-20
                    ${isBooked ? 'bg-red-200 text-red-600 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-sky-500 text-white ring-4 ring-sky-300' : ''}
                    ${!isBooked && !isSelected ? 'bg-green-200 text-green-800 hover:bg-green-300' : ''}
                  `}
                  whileHover={!isBooked ? { scale: 1.1, zIndex: 10 } : {}}
                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { type: 'spring', delay: 0.5 } }}
                >
                  {/* 5. --- "PARKING BOX" ICONS --- */}
                  <i className={`fas ${isBooked ? 'fa-ban' : 'fa-chair'} text-2xl mb-1`}></i>
                  <span className="text-sm">{table}</span>
                </motion.button>
              );
            })}
          </div>
          {/* 6. --- "PARKING BOX" LEGEND --- */}
          <div className="flex flex-wrap justify-around mt-6 text-white text-sm">
            <div className="flex items-center gap-2 m-1">
              <div className="w-4 h-4 rounded bg-green-200 border border-green-400"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2 m-1">
              <div className="w-4 h-4 rounded bg-red-200 text-red-600 flex items-center justify-center">
                <i className="fas fa-ban text-xs"></i>
              </div>
              <span>Taken</span>
            </div>
            <div className="flex items-center gap-2 m-1">
              <div className="w-4 h-4 rounded bg-sky-500"></div>
              <span>Selected</span>
            </div>
          </div>
        </motion.div>

        {/* --- 7. BOOKING FORM (Already "cute" and consistent) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            {/* Show this if a table IS selected */}
            {selectedTable && (
              <motion.div key="form" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                {!bookingSuccess ? (
                  <>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">
                      Book Table: 
                      <span className="ml-2 p-2 px-4 bg-sky-100 text-sky-700 rounded-full">
                        {selectedTable}
                      </span>
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input type="text" name="cafeName" placeholder="Cafe Name" onChange={handleChange} value={formData.cafeName} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} value={formData.name} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="date" name="date" onChange={handleChange} value={formData.date} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <input type="time" name="time" onChange={handleChange} value={formData.time} className="p-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
                      <motion.button
                        type="submit"
                        className="p-4 bg-sky-500 text-white rounded-full font-bold text-lg mt-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Table
                      </motion.button>
                    </form>
                  </>
                ) : (
                  // Success Message
                  <motion.div key="success" className="text-center flex flex-col items-center justify-center h-full" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-check-circle text-green-500 text-7xl"></i>
                    </div>
                    <h3 className="text-3xl font-bold text-green-600 mb-2">Booked!</h3>
                    <p className="text-lg text-gray-700">Your table <span className="font-bold">{selectedTable}</span> is reserved.</p>
                    <p className="text-gray-600 mb-6">A confirmation email is on its way!</p>
                    <motion.button
                      onClick={handleBookAnother}
                      className="p-3 px-6 bg-gray-200 text-gray-700 rounded-full font-medium text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Another Table
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Show this if NO table is selected */}
            {!selectedTable && (
              <motion.div key="select" className="text-center flex flex-col items-center justify-center h-full" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <i className="fas fa-hand-pointer text-7xl text-gray-400 mb-4 animate-bounce"></i>
                <h3 className="text-3xl font-bold text-gray-700">Please select a table</h3>
                <p className="text-lg text-gray-500">Click an available green table on the map to begin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SeatingArrangement;
