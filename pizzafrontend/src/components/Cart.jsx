import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Context importálása
import { getCart, removeFromCart, checkout } from "../api/cart";

function Cart() {
    const { user } = useContext(AuthContext); // ✅ Innen kapjuk az `userId`-t
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("🔍 AuthContext felhasználó:", user);
        if (!user || !user.userId) {
            console.warn("⚠ Még nincs userId, ezért nem kérjük le a kosár tartalmát.");
            setLoading(false);
            return;
        }

        async function fetchCart() {
            try {
                console.log("📥 Lekérjük a kosár tartalmát userId-vel:", user.userId);
                const data = await getCart(user.userId);
                console.log("✅ Kosár adatok lekérve:", data);
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [user]); // 🔥 Újrafut, ha a `user` megváltozik

    async function handleRemove(cartId) {
        if (await removeFromCart(cartId)) {
            setCartItems(cartItems.filter(item => item.id !== cartId));
        } else {
            alert("Nem sikerült törölni a tételt.");
        }
    }

    async function handleCheckout() {
        try {
            const result = await checkout(user.userId);
            alert("✅ Sikeres rendelés! Rendelés azonosító: " + result.orderId);
            setCartItems([]); // 🔥 Kiürítjük a kosarat a rendelés után
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("❌ Nem sikerült leadni a rendelést.");
        }
    }

    if (loading) return <p>⏳ Betöltés...</p>;
    if (error) return <p>❌ Hiba: {error}</p>;
    if (cartItems.length === 0) return <p>🛒 A kosár üres.</p>;

    return (
        <div>
            <h2>🛍 Kosár</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <h3>{item.pizza?.pizzaName || "Ismeretlen pizza"}</h3>
                        <p>Mennyiség: {item.quantity}</p>
                        <p>Egységár: {item.unitPrice} Ft</p>
                        <p>Összesen: {item.quantity * item.unitPrice} Ft</p>
                        <button onClick={() => handleRemove(item.id)}>❌ Eltávolítás</button>
                    </li>
                ))}
            </ul>
            <h3>💰 Végösszeg: {cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)} Ft</h3>
            <button onClick={handleCheckout}>✅ Megrendelés leadása</button>
        </div>
    );
}

export default Cart;
