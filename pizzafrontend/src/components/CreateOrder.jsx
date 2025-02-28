import { useState } from "react";
import { createOrder } from "../api/orders";
 
function CreateOrder() {
  const [userId, setUserId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
 
  async function handleSubmit(e) {
    e.preventDefault();
 
    const orderData = {
      userId: parseInt(userId),
      cartItems: [
        {
          pizzaId: parseInt(pizzaId),
          quantity: parseInt(quantity),
          unitPrice: 0, // A backend kiszámolja
        },
      ],
    };
 
    try {
      const newOrder = await createOrder(orderData);
      setMessage(`Sikeres rendelés: #${newOrder.id}`);
    } catch (error) {
      setMessage(`Hiba történt: ${error.message}`);
    }
  }
 
  return (
    <div>
      <h2>Új rendelés</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Felhasználó ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          Pizza ID:
          <input
            type="number"
            value={pizzaId}
            onChange={(e) => setPizzaId(e.target.value)}
            required
          />
        </label>
        <label>
          Mennyiség:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Rendelés leadása</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
 
export default CreateOrder;
 
