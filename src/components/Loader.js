import React from 'react';
import loaderGif from '../imgs/loader.gif'; // Import your GIF

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <img src={loaderGif} alt="Loading..." className="w-48 h-48" />
      <h1 className="text-3xl font-bold text-gray-700 mt-4">Loading Tasty...</h1>
    </div>
  );
};

export default Loader;