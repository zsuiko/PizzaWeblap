import React, { useState, useEffect } from 'react';
import cokeImage from '../assets/cocacola.png'; 
import hawaii from '../assets/hawi.png';

function ScrollRotateImage() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  // Kép forgatása (Coca-Cola)
  const rotation = scrollY * 0.15; 

  // Hawaii pizza elmozdítása (úsztatás)
  const translateY = scrollY * 0.5; // A Hawaii pizza függőleges elmozdulása a görgetés mértékével

  return (
    <div className="flex h-screen">
      {/* Coca-Cola kép */}
      <div className="flex-1 bg-purple-500 p-6 flex justify-center items-center">
        <img
          src={cokeImage}
          alt="Coke"
          className="transition-transform duration-300 w-[500px] h-auto"
          style={{
            transform: `rotate(${rotation}deg)`, // A Coca-Cola kép forgatása
          }}
        />
      </div>

      {/* Hawaii pizza kép */}
      <div className="flex-1 bg-blue-700 p-6 flex justify-center items-center">
        <img
          src={hawaii}
          alt="Hawaii Pizza"
          className="transition-transform duration-300 w-[500px] h-auto"
          style={{
            transform: `translateY(${translateY}px) rotate(${rotation}deg)`, // A Hawaii pizza függőleges elmozdítása és forgatása
          }}
        />
      </div>
    </div>
  );
}

export default ScrollRotateImage;
