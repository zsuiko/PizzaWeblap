import { useEffect, useState } from "react";
import HotDeal from "../components/HotDeal";
import Latest from "../components/latest";
import PizzaAd from "./PizzaAd";
import ColaAd from "./ColaAd";
import Contact from "../pages/Connection";

function Home() {
  // Állapot a lekért adatok tárolására
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API hívás
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/pizza"); // Itt a backend API URL-je
        if (!response.ok) {
          throw new Error("Hiba történt a lekérés során");
        }
        const data = await response.json();
        setProducts(data);  // A válaszban lévő adatokat tároljuk
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // A useEffect csak egyszer fut le, amikor a komponens betöltődik

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
