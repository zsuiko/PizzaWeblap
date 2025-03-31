import { useEffect, useState } from "react";
import HotDeal from "../components/HotDeal";
import Latest from "../components/latest";
import PizzaAd from "./PizzaAd";
import ColaAd from "./ColaAd";
import Contact from "../pages/Connection";

function Home() {
  // Állapot a lekért adatok tárolására
  const [products, setProducts] = useState([]);
  return (
    <div>
      <HotDeal />
      <Latest />
      <ColaAd />
      <PizzaAd />
      <Contact />
      
      {/* Az API-ból lekért termékek megjelenítése */}
      <div>
  <h2>Termékek</h2>
  <ul>
    {products.map((product) => (
      <li key={product.id}>{product.name}</li>  
    ))}
  </ul>
</div>
    </div>
  );
}

export default Home;
