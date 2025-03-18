import { useState, useEffect } from 'react';
import cokeImage from '../assets/cocacola.png'; 
//import hawaii from '../assets/hawi.png';

function About() {
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

  const rotation = scrollY * 0.15; 


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
        
      </div>
    </div>
  );
}

export default About;
