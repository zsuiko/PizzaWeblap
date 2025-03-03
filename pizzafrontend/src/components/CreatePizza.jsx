import { useState } from "react";
import { createPizza } from "../api/pizzas";

function CreatePizza() {
  const [pizzaName, setPizzaName] = useState("");
  const [pizzaDescription, setPizzaDescription] = useState("");
  const [pizzaPrice, setPizzaPrice] = useState("");
  const [pizzaImgUrl, setPizzaImgUrl] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const pizzaData = {
      PizzaName: pizzaName,
      PizzaDescription: pizzaDescription,
      PizzaPrice: parseFloat(pizzaPrice),
      PizzaImgUrl: pizzaImgUrl,
    };

    try {
      const newPizza = await createPizza(pizzaData);
      setMessage(`Sikeresen hozzáadva: ${newPizza.pizzaName}`);
      setPizzaName("");
      setPizzaDescription("");
      setPizzaPrice("");
      setPizzaImgUrl("");
    } catch (error) {
      setMessage(`Hiba történt: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>Új Pizza Hozzáadása</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza név:
          <input
            type="text"
            value={pizzaName}
            onChange={(e) => setPizzaName(e.target.value)}
            required
          />
        </label>
        <label>
          Leírás:
          <input
            type="text"
            value={pizzaDescription}
            onChange={(e) => setPizzaDescription(e.target.value)}
          />
        </label>
        <label>
          Ár:
          <input
            type="number"
            step="0.01"
            value={pizzaPrice}
            onChange={(e) => setPizzaPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Kép URL:
          <input
            type="text"
            value={pizzaImgUrl}
            onChange={(e) => setPizzaImgUrl(e.target.value)}
          />
        </label>
        <button type="submit">Pizza hozzáadása</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePizza;
