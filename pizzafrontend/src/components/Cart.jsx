import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCart, removeFromCart, checkout } from "../api/cart";

function Cart({ userId }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCart(userId);
                console.log("Kapott kosár adatok:", data); // 🔥 DEBUG: Ellenőrizzük az API választ
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [userId]);

    async function handleRemove(cartId) {
        if (await removeFromCart(cartId)) {
            setCartItems(cartItems.filter(item => item.id !== cartId));
        } else {
            alert("Nem sikerült törölni a tételt.");
        }
    }

    async function handleCheckout() {
        try {
            const result = await checkout(userId);
            alert("Sikeres rendelés! Rendelés azonosító: " + result.orderId);
            setCartItems([]); // 🔥 Kosár kiürítése sikeres rendelés után
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("Nem sikerült leadni a rendelést.");
        }
    }

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba: {error}</p>;
    if (cartItems.length === 0) return <p>A kosár üres.</p>;

    return (
        <div>
            <h2>Kosár</h2>
            <ul>
                {cartItems.map((item) => {
                    const unitPrice = item.unitPrice ?? 0; // 🔥 Ha undefined, akkor 0 lesz
                    const quantity = item.quantity ?? 1;
                    const total = unitPrice * quantity; // 🔥 Ha bármelyik 0, akkor az eredmény is 0 lesz

                    return (
                        <li key={item.id}>
                            <img src={item.pizza?.pizzaImgUrl || "default-image.jpg"} 
                                 alt={item.pizza?.pizzaName || "Ismeretlen pizza"} 
                                 width="100" />
                            <h3>{item.pizza?.pizzaName || "Ismeretlen pizza"}</h3>
                            <p>Mennyiség: {quantity}</p>
                            <p>Egységár: {unitPrice} Ft</p>
                            <p>Összesen: {total} Ft</p>
                            <button onClick={() => handleRemove(item.id)}>Eltávolítás</button>
                        </li>
                    );
                })}
            </ul>
            <h3>Végösszeg: {cartItems.reduce((sum, item) => sum + (item.unitPrice ?? 0) * (item.quantity ?? 1), 0)} Ft</h3>
            <button onClick={handleCheckout}>Megrendelés leadása</button>
        </div>
    );
}

Cart.propTypes = {
  userId: PropTypes.number.isRequired
};

export default Cart;
