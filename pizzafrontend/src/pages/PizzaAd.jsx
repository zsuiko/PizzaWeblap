import { useState } from "react";
import { motion } from "framer-motion";
import Hawai from "../assets/hawi.png";
import Coke from "../assets/cocacola.png";
import bin from "../assets/bin.png";
import cash from "../assets/cash.png";
import { Link } from "react-router-dom";

function PizzaAd() {
  const [rotateDeg, setRotateDeg] = useState(20); 
  const [selectedText, setSelectedText] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null); 

  
  const items = [
    { id: 1, image: Hawai, text: "friss, ropogós, nagyszerű íz" }, // Kép 1
    { id: 2, image: Coke, text: "kenyér, banán, alma" },  // Kép 2
    { id: 3, image: cash, text: "bence, zsombor, bertold" }, // Kép 3
    { id: 4, image: bin, text: "Szemetes" },  // Kép 4
    { id: 5, image: Hawai, text: "finom pizza" }, // Kép 5
    { id: 6, image: Coke, text: "friss üdítő" },  // Kép 6
    { id: 7, image: Hawai, text: "friss és ízletes" }, // Kép 7
    { id: 8, image: Coke, text: "üdítő ital" },  // Kép 8
  ];

  // Gombnyomáshoz rendelünk egy-egy szöveget
  const handleButtonClick = (index) => {
    // Gombnyomásra új szöget állítunk be a forgatáshoz
    setRotateDeg((prevRotate) => prevRotate + 45);

    // Beállítjuk a szöveget, amely a gombhoz tartozik
    setSelectedText(items[index].text); // A gombhoz tartozó szöveg jelenik meg
    setSelectedImage(items[index].image); // A kiválasztott képet tároljuk
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="flex-1 bg-amber-500 flex items-center justify-center relative h-full">
        {/* Nagy fehér kör (Ferris kerék háttér) */}
        <div className="w-250 h-250 bg-white rounded-full absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3"></div>

        {/* Forgó Ferris kerék tartó (1000px sugár) */}
        <motion.div
          animate={{ rotate: rotateDeg }} // Az állapotot figyeljük, hogy folyamatosan frissüljön
          transition={{
            duration: 1, // Forgás időtartama
            ease: "easeInOut", // Zökkenőmentes forgás
          }}
          className="absolute flex items-center justify-center w-[1000px] h-[1000px] rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/3"
        >
          {/* Térjünk végig az elemeket, hogy létrehozzuk a "kabint" */}
          {items.map((item, index) => {
            // Számoljuk ki az egyes pontok szögét és pozícióját
            const angle = (360 / items.length) * index; // A pontok közötti szög  
            const x = Math.cos((angle * Math.PI) / 180) * 1000; // X pozíció (szögtől függően)
            const y = Math.sin((angle * Math.PI) / 180) * 1000; // Y pozíció (szögtől függően)

            return (
              <motion.div
                key={item.id}
                className="absolute flex items-center justify-center bg-red-500 w-50 h-50 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                {/* Kép elhelyezése a piros körökben */}
                <motion.img
                  src={item.image}  // A képet a "item.image"-ből használjuk
                  alt={`item-${item.id}`}
                  className={`w-full h-full object-cover rounded-full ${selectedImage === item.image ? 'border-4 border-blue-500' : ''}`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Kijelölt szöveg */}
        <div className="absolute bottom-10 right-10 text-black font-bold text-lg">
          {selectedText ? selectedText : "Válassz egy gombot a szöveg megjelenítéséhez"}
        </div>

        {/* Gombok a forgatás vezérlésére */}
        <div className="flex flex-col mr-[90%] bottom-10">
          {items.map((item, index) => (
            <Link
              key={index}
              className="p-2 m-2 border-2 rounded-2xl"
              onClick={() => handleButtonClick(index)} // Gombnyomáskor az adott item indexe
            >
              <img src={item.image} alt="" className="w-10 h-10 object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PizzaAd;
