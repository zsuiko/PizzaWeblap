import { useEffect, useState } from "react";
import { getPizzas, deletePizza } from "../api/pizzas";

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  async function fetchPizzas() {
    try {
      const data = await getPizzas();
      setPizzas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(pizzaId) {
    if (!window.confirm("Biztosan törlöd ezt a pizzát?")) return;

    try {
      await deletePizza(pizzaId);
      setPizzas(pizzas.filter((pizza) => pizza.id !== pizzaId)); // Frissítjük a listát
    } catch (err) {
      setError(`Hiba történt: ${err.message}`);
    }
  }

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba történt: {error}</p>;
  if (!pizzas || pizzas.length === 0) return <p>Nincsenek pizzák</p>;

  return (
    <div>
      <h2>Pizzák</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id} style={{ marginBottom: "20px" }}>
            <strong>{pizza.pizzaName}</strong> - {pizza.pizzaDescription} - {pizza.pizzaPrice} Ft
            <br />
            {pizza.pizzaImgUrl ? (
              <img
                src={pizza.pizzaImgUrl}
                alt={pizza.pizzaName}
                width="150"
                height="150"
                style={{ borderRadius: "10px", objectFit: "cover", marginTop: "10px" }}
              />
            ) : (
              <p>Nincs kép</p>
            )}
            <br />
            <button onClick={() => handleDelete(pizza.id)}>Törlés</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pizzas;
