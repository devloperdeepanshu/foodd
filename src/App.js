import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import HomePage from './components/HomePage';
import Parking from './components/Parking';
import Order from './components/Order';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MemeSuggester from './components/MemeSuggester'; // <-- 1. IMPORT IT

function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <>
      <Header setIsChatOpen={setIsChatOpen} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/order" element={<Order />} />
          <Route path="/suggester" element={<MemeSuggester />} /> {/* <-- 2. ADD THE ROUTE */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </>
  );
}

export default App;