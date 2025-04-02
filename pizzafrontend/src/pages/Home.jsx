import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function Home() {
  const { pizzas, loading, error } = useShop();
  const [rotateDeg, setRotateDeg] = useState(-65);
  const [selectedText, setSelectedText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Termékek betöltése...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Hiba történt: {error}</div>;
  
  // Set default pizza if none selected and pizzas are loaded
  if (!selectedPizza && pizzas.length > 0 && !selectedText) {
    setSelectedPizza(pizzas[0]);
    setSelectedText(pizzas[0].description);
    setSelectedImage(pizzas[0].imageUrl);
  }

  const handleButtonClick = (index) => {
    const angle = -((360 / pizzas.length) * index) - 65;
    setRotateDeg(angle);
    setSelectedText(pizzas[index].description);
    setSelectedImage(pizzas[index].imageUrl);
    setSelectedPizza(pizzas[index]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="flex-1 bg-amber-500 flex flex-col items-center justify-center relative h-full min-h-screen">
        {/* White circle - hide on mobile */}
        {!isMobile && (
          <div className="w-250 h-250 bg-white rounded-full absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3 hidden md:block"></div>
        )}

        {/* Pizza wheel animation - only on desktop */}
        {!isMobile && (
          <motion.div
            animate={{ rotate: rotateDeg }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            className="absolute flex items-center justify-center w-[1000px] h-[1000px] rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/3 hidden md:flex"
          >
            {pizzas.map((pizza, index) => (
              <motion.div
                key={pizza.pizzaId}
                className="absolute flex items-center justify-center w-100 h-100 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${(360 / pizzas.length) * index}deg) translateY(-1000px)`,
                }}
              >
                <motion.img
                  src={pizza.imageUrl}
                  alt={pizza.name}
                  className={"w-full h-full object-cover rounded-full"}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile Layout - Pizza Grid */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-4 w-full p-4 mt-4">
            {pizzas.map((pizza, index) => (
              <div 
                key={pizza.pizzaId} 
                className={`flex flex-col items-center p-2 rounded-lg ${
                  selectedPizza?.pizzaId === pizza.pizzaId ? 'bg-white/30' : ''
                }`}
                onClick={() => handleButtonClick(index)}
              >
                <img 
                  src={pizza.imageUrl} 
                  alt={pizza.name} 
                  className="w-24 h-24 object-cover rounded-full mb-2"
                />
                <span className="text-center text-sm font-medium text-white">{pizza.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pizza description panel - position differently on mobile */}
        <div className={`${
          isMobile 
            ? 'static mt-6 mx-4 mb-4 w-full' 
            : 'absolute bottom-10 right-10 max-w-md'
        } text-black font-bold text-lg p-4 bg-white/70 rounded-lg shadow-lg`}>
          <h3 className="text-xl mb-2">{selectedPizza?.name || ''}</h3>
          <p>{selectedText || 'Válassz egy pizzát a leírás megjelenítéséhez'}</p>
          {selectedPizza && (
            <div className="mt-2 text-amber-700 font-semibold">
              {selectedPizza.price} Ft
            </div>
          )}
        </div>

        {/* Pizza selection buttons - only on desktop */}
        {!isMobile && (
          <div className="absolute bottom-10 left-10 flex flex-col">
            {pizzas.map((pizza, index) => (
              <button
                key={pizza.pizzaId}
                className="p-2 m-2 bg-transparent rounded-full focus:outline-none flex items-center"
                onClick={() => handleButtonClick(index)}
              >
                <img 
                  src={pizza.imageUrl} 
                  alt={pizza.name} 
                  className={`w-16 h-16 object-cover rounded-full transition-all ${
                    selectedImage === pizza.imageUrl ? 'ring-2 ring-white shadow-lg scale-110' : 'hover:scale-105'
                  }`}
                />
                <span className="ml-3 text-sm font-medium text-white">{pizza.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
