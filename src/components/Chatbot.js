import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 How can I help you today? (Try asking about "hours", "menu", or "location")' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello! Ask me about our menu, hours, or location.';
    }
    if (text.includes('menu') || text.includes('popular')) {
      return 'You can see all our popular dishes on the "Popular" and "Gallery" sections!';
    }
    if (text.includes('hours') || text.includes('open')) {
      return 'We are open 7 days a week, from 9:00 AM to 10:00 PM.';
    }
    if (text.includes('location') || text.includes('address')) {
      return 'You can find us at 132/4, Santhiveerappapuram Street, Punjai Sangenthi, Trichy!';
    }
    if (text.includes('order')) {
      return 'Just click the "Order Now" button on any food item or in the header!';
    }
    
    return "Sorry, I don't understand that. You can ask me about our menu, hours, or location.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { from: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = { from: 'bot', text: getBotResponse(inputValue) };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  return (
    // --- THIS IS THE FIXED LINE ---
    <div className="fixed top-24 right-8 z-[60]"> 
    {/* --- END FIX --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="w-96 h-[32rem] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: -50, scale: 0.5 }} // Changed y: 50 to y: -50 for a "drop down" feel
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 150 } }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }} // Changed y: 50 to y: -50
          >
            <header className="bg-sky-500 text-white p-4 flex justify-between items-center font-bold">
              <div className="flex items-center gap-3">
                <i className="fas fa-smile-beam text-2xl"></i>
                <span>Chat with us!</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="text-xl hover:scale-125 transition-transform"
              >
                <i className="fas fa-times"></i>
              </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto bg-sky-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`my-3 p-3 rounded-2xl max-w-[80%] shadow-sm ${
                    msg.from === 'bot'
                      ? 'bg-white text-gray-800 self-start'
                      : 'bg-sky-500 text-white self-end ml-auto'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <motion.button 
                type="submit" 
                className="w-12 h-12 bg-sky-500 text-white rounded-full flex-shrink-0
                           flex items-center justify-center text-lg
                           hover:bg-sky-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-paper-plane"></i>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;