import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import HomePage from './components/HomePage';
import Parking from './components/Parking';
import Order from './components/Order';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MemeSuggester from './components/MemeSuggester';
import Loader from './components/Loader';     // <-- 1. IMPORT
import Login from './components/Login';       // <-- 2. IMPORT
import Cafes from './components/Cafes';
function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  // --- 3. LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true);
  
  // --- 4. HIDE HEADER/FOOTER on Login Page ---
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  // --- 5. LOADING TIMER ---
  useEffect(() => {
    // Show loader for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    // Clear timer if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty array means this runs only once

  // --- 6. RENDER LOADER ---
  if (isLoading) {
    return <Loader />;
  }

  // --- 7. RENDER APP ---
  return (
    <>
      {/* 8. Hide Header/Footer/Chat on Login Page */}
      {!isLoginPage && <Header setIsChatOpen={setIsChatOpen} />}

      <main>
        <Routes>
          {/* 9. NEW ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/suggester" element={<MemeSuggester />} />
          <Route path="/cafes" element={<Cafes />} />
          
          {/* Order is part of HomePage, but you could make it a page too */}
          <Route path="/order" element={<Order />} /> 
          
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
      {!isLoginPage && <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />}
    </>
  );
}

export default App;
