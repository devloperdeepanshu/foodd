import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. --- IMPORT THE BACKGROUND IMAGE ---
import homeBg from '../imgs/home-bg.jpg';

// --- DATA (Same as before) ---
const allMemes = [
  { id: 1, mood: 'silly', img: 'https://cataas.com/cat/says/Pizza%20Time!?fontSize=50&fontColor=white&type=square' },
  { id: 2, mood: 'happy', img: 'https://cataas.com/cat/says/No%20Homework!%20:D?fontSize=50&fontColor=white&type=square' },
  { id: 3, mood: 'tired', img: 'https://cataas.com/cat/says/So...%20sleepy...?fontSize=50&fontColor=white&type=square' },
  { id: 4, mood: 'happy', img: 'https://cataas.com/cat/says/Best%20Day%20Ever!%20:)?fontSize=50&fontColor=white&type=square' },
  { id: 5, mood: 'silly', img: 'https://cataas.com/cat/says/Feeling%20Goofy!?fontSize=50&fontColor=white&type=square' }
];
const foodSuggestions = {
  silly: { name: 'Yummy Pizza!', img: 'https://placehold.co/500x300/FFD6D6/FF5656?text=Pizza+Party!', desc: 'You\'re feeling super silly! A fun pizza with your favorite toppings is the perfect match!' },
  happy: { name: 'Awesome Ice Cream!', img: 'https://placehold.co/500x300/D1FAFF/00B8D9?text=Ice+Cream+Treat!', desc: 'You\'re in a great mood! Celebrate with a delicious, sweet ice cream cone!' },
  tired: { name: 'Energy-Boost Breakfast!', img: 'https://placehold.co/500x300/D4FADD/00C853?text=Energy+Boost!', desc: 'A little sleepy? A tasty, healthy breakfast will give you the energy boost you need!' }
};
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// --- The Component (No Framer Motion) ---
const MemeSuggester = () => {
  const navigate = useNavigate();
  const initialMemes = useMemo(() => shuffleArray(allMemes).slice(0, 4), []);
  
  const [memes, setMemes] = useState(initialMemes);
  const [moodScores, setMoodScores] =useState({ silly: 0, happy: 0, tired: 0 });
  const [suggestion, setSuggestion] = useState(null);
  const [animationClass, setAnimationClass] = useState('');

  const getSuggestion = () => {
    if (memes.length > 0) return; 
    
    const winningMood = Object.keys(moodScores).reduce((a, b) =>
      moodScores[a] > moodScores[b] ? a : b
    );
    if (moodScores[winningMood] === 0) {
      setSuggestion(foodSuggestions['silly']);
    } else {
      setSuggestion(foodSuggestions[winningMood]);
    }
  };

  const resetGame = () => {
    setMemes(shuffleArray(allMemes).slice(0, 4));
    setMoodScores({ silly: 0, happy: 0, tired: 0 });
    setSuggestion(null);
    setAnimationClass('');
  };

  const handleSwipe = (direction) => {
    if (animationClass || memes.length === 0) return; 

    const meme = memes[memes.length - 1]; 

    if (direction === 'right') {
      setMoodScores(prev => ({
        ...prev,
        [meme.mood]: (prev[meme.mood] || 0) + 1
      }));
    }

    setAnimationClass(direction === 'right' ? 'animate-slide-out-right' : 'animate-slide-out-left');

    setTimeout(() => {
      setAnimationClass(''); 
      setMemes(prev => prev.slice(0, -1)); // Remove the top meme
    }, 300); // Match animation time in index.css
  };

  // Run getSuggestion when memes array changes
  React.useEffect(() => {
    if (memes.length === 0 && !animationClass) {
      getSuggestion();
    }
  }, [memes, animationClass]); 

  return (
    // 2. --- ADDED BACKGROUND ---
    <section 
      id="suggester" 
      className="p-8 pt-32 bg-cover bg-center bg-no-repeat overflow-hidden min-h-screen flex flex-col items-center"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <button
        onClick={() => navigate('/')}
        // 3. --- CHANGED TEXT COLOR FOR VISIBILITY ---
        className="flex items-center gap-2 text-gray-200 hover:text-white mb-8 text-lg font-medium self-start md:self-center"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </button>
      
      {/* 4. --- MADE GAME AREA WIDER --- */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-center"> {/* Was max-w-sm */}

        {/* 5. --- MADE CARD STACK TALLER --- */}
        <div className="relative w-full h-[600px] flex items-center justify-center"> {/* Was h-[500px] */}
          
          {/* Suggestion Card */}
          {suggestion && (
            <div className="bg-white p-6 rounded-3xl shadow-xl text-center w-full animate-pop-in">
              <span className="text-7xl mb-4 inline-block">🥳</span>
              <h3 className="text-3xl font-bold text-gray-800">Your flavor profile is...</h3>
              <h2 className="text-4xl font-bold text-sky-500 my-2">{suggestion.name}</h2>
              <p className="text-gray-600 text-lg my-4">{suggestion.desc}</p>
              {/* 6. --- MADE SUGGESTION IMAGE TALLER --- */}
              <img src={suggestion.img} alt={suggestion.name} className="w-full h-64 object-cover rounded-2xl my-4" /> {/* Was h-56 */}
              <button
                onClick={resetGame}
                className="p-3 px-8 bg-sky-500 text-white rounded-full font-bold text-lg
                           transform transition-transform hover:scale-110 hover:rotate-6"
              >
                Play Again?
              </button>
            </div>
          )}

          {/* 7. --- MADE MEME CARDS TALLER --- */}
          {!suggestion &&
            memes.map((meme, index) => {
              const isTopCard = index === memes.length - 1;
              let style = {};
              
              if (!isTopCard) {
                const scale = 1 - (memes.length - 1 - index) * 0.05;
                const translateY = (memes.length - 1 - index) * 10;
                style = { 
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  zIndex: index 
                };
              } else {
                style = { zIndex: 10 }; 
              }

              return (
                <div
                  key={meme.id}
                  className={`absolute w-full h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden {/* Was h-[500px] */}
                    ${isTopCard ? animationClass : ''}
                    transition-all duration-300
                  `}
                  style={style}
                >
                  <img src={meme.img} alt="meme" className="w-full h-full object-cover pointer-events-none" />
                </div>
              );
            })}

          {/* 8. --- MADE EMPTY STATE TALLER --- */}
          {!suggestion && memes.length === 0 && (
            <div className="w-full h-[600px] bg-gray-200 rounded-3xl flex items-center justify-center text-center p-8"> {/* Was h-[500px] */}
              <h3 className="text-3xl font-bold text-gray-500">Finding your flavor...</h3>
            </div>
          )}
        </div>
        
        {/* 9. --- TITLE (MOVED DOWN) --- */}
        {!suggestion && (
          <div className="text-center mt-8">
            {/* 10. --- CHANGED TEXT COLOR FOR VISIBILITY --- */}
            <h1 className="heading text-4xl mb-2 font-bold text-white">
              What's Your <span className="text-sky-500">Food Mood?</span>
            </h1>
            <p className="text-lg text-gray-200">Click the buttons to find your flavor!</p>
          </div>
        )}
        
        {/* 10. --- SWIPE BUTTONS (MOVED DOWN) --- */}
        {!suggestion && memes.length > 0 && (
          <div className="flex justify-center gap-16 mt-6">
            <button
              onClick={() => handleSwipe('left')}
              className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center
                         transform transition-transform hover:scale-110 hover:bg-red-50"
            >
              <i className="fas fa-times text-4xl text-red-500"></i>
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center
                         transform transition-transform hover:scale-110 hover:bg-green-50"
            >
              <span className="text-4xl">😋</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemeSuggester;