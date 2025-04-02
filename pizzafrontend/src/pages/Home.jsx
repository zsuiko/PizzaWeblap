import { useState } from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function Home() {
  const { pizzas, loading, error } = useShop();
  const [rotateDeg, setRotateDeg] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) return <div>Termékek betöltése...</div>;
  if (error) return <div>Hiba történt: {error}</div>;

  const handleButtonClick = (index) => {
    const angle = (360 / pizzas.length) * index;
    setRotateDeg(angle);
    setSelectedText(pizzas[index].description);
    setSelectedImage(pizzas[index].imageUrl);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="flex-1 bg-amber-500 flex items-center justify-center relative h-full">
        <div className="w-250 h-250 bg-white rounded-full absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3"></div>

        <motion.div
          animate={{ rotate: rotateDeg }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          className="absolute flex items-center justify-center w-[1000px] h-[1000px] rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/3"
        >
          {pizzas.map((pizza, index) => {
            return (
              <motion.div
                key={pizza.pizzaId}
                className="absolute flex items-center justify-center bg-red-500 w-50 h-50 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${(360 / pizzas.length) * index}deg) translateY(-400px)`,
                }}
              >
                <motion.img
                  src={pizza.imageUrl}
                  alt={pizza.name}
                  className={`w-full h-full object-cover rounded-full ${
                    selectedImage === pizza.imageUrl ? 'border-4 border-blue-500' : ''
                  }`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="absolute bottom-10 right-10 text-black font-bold text-lg">
          {selectedText || 'Válassz egy gombot a szöveg megjelenítéséhez'}
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col">
          {pizzas.map((pizza, index) => (
            <button
              key={pizza.pizzaId}
              className="p-2 m-2 border-2 rounded-2xl"
              onClick={() => handleButtonClick(index)}
            >
              <img src={pizza.imageUrl} alt={pizza.name} className="w-10 h-10 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
