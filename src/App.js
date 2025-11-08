import React from 'react';
// 1. Remove useState and Chatbot import
import Header from './components/Header';
import Home from './components/Home';
import Speciality from './components/Speciality';
import Popular from './components/Popular';
import Gallery from './components/Gallery';
import Review from './components/Review';
import Order from './components/Order';
import Footer from './components/Footer';
// 2. No more Chatbot import here

function App() {
  // 3. All state is removed from here
  return (
    <>
      {/* 4. Header is now self-contained */}
      <Header />
      <Home />
      <Speciality />
      <Popular />
      <Gallery />
      <Review />
      <Order />
      <Footer />
      {/* 5. Chatbot is no longer rendered here */}
    </>
  );
}

export default App;