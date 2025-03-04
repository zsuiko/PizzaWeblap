import { useState, useEffect, useContext } from "react";
import { getPizzas } from "../api/pizzas";
import { addToCart } from "../api/cart";
import { AuthContext } from "../context/AuthContext"; // ✅ Importáljuk az AuthContext-et

function PizzaList() {
    const { user } = useContext(AuthContext); // ✅ Innen kapjuk az `userId`-t
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        fetchPizzas();
    }, []);

    async function handleAddToCart(pizzaId) {
        console.log("🔍 AuthContext user:", user); // Debug log

        if (!user || !user.userId) {
            console.warn("⚠ Hiányzó userId! A felhasználó nincs bejelentkezve.");
            alert("Először jelentkezz be, hogy hozzáadhass egy pizzát a kosárhoz!");
            return;
        }

        console.log("📤 Kosárba helyezés:", { userId: user.userId, pizzaId });

        try {
            const result = await addToCart(user.userId, pizzaId, 1);
            if (result) {
                alert("✅ A pizza sikeresen hozzáadva a kosárhoz!");
            } else {
                alert("❌ Hiba történt a pizza hozzáadása során.");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("⚠ Hiba történt a pizza kosárba helyezésekor.");
        }
    }

    if (loading) return <p>⏳ Betöltés...</p>;
    if (error) return <p>❌ Hiba: {error}</p>;

    return (
        <div>
            <h2>🍕 Pizzák</h2>
            <ul>
                {pizzas.map((pizza) => (
                    <li key={pizza.id}>
                        <img src={pizza.pizzaImgUrl} alt={pizza.pizzaName} width="100" />
                        <h3>{pizza.pizzaName}</h3>
                        <p>{pizza.pizzaDescription}</p>
                        <p>💰 Ár: {pizza.pizzaPrice} Ft</p>
                        <button onClick={() => handleAddToCart(pizza.id)}>🛒 Kosárba</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PizzaList;
