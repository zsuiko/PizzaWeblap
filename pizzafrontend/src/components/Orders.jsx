import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
 
function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        console.log("Frontend megkapta az adatokat:", data); // Debug kiírás
        setOrders(data);
      } catch (err) {
        console.error("Hiba történt:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
 
  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba történt: {error}</p>;
  if (!orders || orders.length === 0) return <p>Nincsenek rendelések</p>;
 
  return (
    <div>
      <h2>Rendelések</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <strong>Rendelés #{order.id}</strong> - Státusz: {order.status} - Összeg: {order.totalPrice} Ft
            <ul>
              {order.cartItems?.map((item, idx) => (
                <li key={idx}>
                  Pizza: {item.pizzaName}, Mennyiség: {item.quantity}, Ár: {item.unitPrice} Ft
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default Orders;