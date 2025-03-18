import { useState, useEffect } from "react";
import cokeImage from "../assets/cocacola.png";

function Ad() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // **Reszponzív breakpointek**
  const isMobile = windowWidth < 768; // pl. mobilon más legyen

  // Mikor induljon az animáció?
  const startScroll = isMobile ? 80 : 750;  

  // Mennyire legyen erős az elmozdulás?
  const maxTranslateX = isMobile ? 150 : 300;

  // Számított értékek (hogy ne menjen ki a képből)
  const translateXValue = Math.max(0, maxTranslateX - (scrollY - startScroll));
  const opacityValue = Math.min(1, (scrollY - startScroll) / 200);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900">
      {/* Kép - Balról beúszás */}
      <div
        className="flex-1 flex justify-center items-center transition-all duration-500"
        style={{
          transform: `translateX(${translateXValue}px)`,
          opacity: opacityValue,
        }}
      >
        <img src={cokeImage} alt="Coca-Cola" className="w-[250px] md:w-[400px] h-auto" />
      </div>

      {/* Szöveg - Jobbról beúszás */}
      <div
        className="flex-1 flex justify-center items-center text-white text-4xl md:text-6xl font-bold transition-all duration-500"
        style={{
          transform: `translateX(${-translateXValue}px)`,
          opacity: opacityValue,
        }}
      >
        LEGFINOMABB ÍZ
      </div>
    </div>
  );
}

export default Ad;
