import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 How can I help you today? (Try asking about "hours", "menu", or "location")' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // ... (getBotResponse function is the same) ...
  const getBotResponse = (userInput) => { /* ... */ };

  // ... (handleSubmit function is the same) ...
  const handleSubmit = (e) => { /* ... */ };

  return (
    // --- THIS IS THE FIX ---
    // 1. Changed 'fixed' to 'absolute'
    // 2. Changed 'top-24' to 'top-full' (positions it right below the header)
    // 3. Changed z-[60] to z-40 (so it's below the z-50 header)
    <div className="absolute top-full right-8 z-40"> 
    {/* --- END FIX --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="w-96 h-[32rem] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: -50, scale: 0.5 }} 
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 150 } }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
          >
            {/* ... (The rest of your cute chatbot is exactly the same) ... */}
            <header className="bg-sky-500 ...">
              {/* ... */}
            </header>
            <div className="flex-1 p-4 ...">
              {/* ... */}
            </div>
            <form onSubmit={handleSubmit} className="p-4 ...">
              {/* ... */}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;