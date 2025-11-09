import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. --- REMOVED USEPARAMS ---
import { useNavigate } from 'react-router-dom';

// 2. --- REMOVED cafeData and BTSLogo ---

// 3. --- "CUTE" TABLE LAYOUT (Same as before) ---
const tablesLayout = [
  { id: 'T1', type: '2-seat', label: 'T1' },
  { id: 'T2', type: '2-seat', label: 'T2' },
  { id: 'B1', type: 'booth', label: 'Booth 1' },
  { id: 'T3', type: '4-seat', label: 'T3' },
  { id: 'T4', type: '4-seat', label: 'T4' },
  { id: 'T5', type: '2-seat', label: 'T5' },
  { id: 'T6', type: '2-seat', label: 'T6' },
  { id: 'B2', type: 'booth', label: 'Booth 2' },
];

const SeatingArrangement = () => {
  const navigate = useNavigate();
  // 4. --- REMOVED cafeId and cafe logic ---

  // This is the same logic as Parking.js, but for tables
  const [bookedTables, setBookedTables] = useState(['T2', 'B1']);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', time: '', cafeName: '' }); // 5. --- ADDED 'cafeName' field ---

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookedTables([...bookedTables, selectedTable.id]);
    setBookingSuccess(true);
    // 6. --- UPDATED EMAIL TO INCLUDE CAFE NAME ---
    const mailtoLink = `mailto:vigneshgbecse@gmail.com?subject=Table Reservation&body=Cafe Name: ${formData.cafeName}%0AName: ${formData.name}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ATable: ${selectedTable.label}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', date: '', time: '', cafeName: '' });
  };

  const handleTableClick = (table) => {
    if (bookedTables.includes(table.id)) return;
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

  // 7. --- "CUTE" BACKGROUND (Same as before) ---
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

  // 8. --- REMOVED !cafe check ---

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
      
      {/* 9. --- GENERIC TITLE --- */}
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
        
        {/* --- 10. "CUTE" SEATING MAP (Same as before) --- */}
        <motion.div
          className="bg-gray-700 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Select Your Table</h3>
          {/* ... (rest of the map is the same) ... */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
            {tablesLayout.map((table) => {
              const isBooked = bookedTables.includes(table.id);
              const isSelected = selectedTable?.id === table.id;
              return (
                <motion.button
                  key={table.id}
                  disabled={isBooked}
                  onClick={() => handleTableClick(table)}
                  className={`rounded-lg text-sm font-bold ... ${isBooked ? '... cursor-not-allowed' : ''} ...`}
                  whileHover={!isBooked ? { scale: 1.05 } : {}}
                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                >
                  {isBooked ? <i className="fas fa-times"></i> : table.label}
                </motion.button>
              );
            })}
          </div>
          {/* ... (Legend is the same) ... */}
        </motion.div>

        {/* --- 11. BOOKING FORM (Updated) --- */}
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
                        {selectedTable.label}
                      </span>
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      {/* 12. --- NEW INPUT FIELD --- */}
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
                    {/* ... (Success message is the same) ... */}
                    <p className="text-lg text-gray-700">Your table <span className="font-bold">{selectedTable.label}</span> is reserved.</p>
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
