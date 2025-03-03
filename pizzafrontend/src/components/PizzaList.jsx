import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getPizzas } from "../api/pizzas";
import { addToCart } from "../api/cart";

function PizzaList({ userId }) {
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
        const result = await addToCart(userId, pizzaId);
        if (result) {
            alert("A pizza sikeresen hozzáadva a kosárhoz!");
        } else {
            alert("Hiba történt a pizza hozzáadása során.");
        }
    }

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba: {error}</p>;

    return (
        <div>
            <h2>Pizzák</h2>
            <ul>
                {pizzas.map((pizza) => (
                    <li key={pizza.id}>
                        <img src={pizza.pizzaImgUrl} alt={pizza.pizzaName} width="100" />
                        <h3>{pizza.pizzaName}</h3>
                        <p>{pizza.pizzaDescription}</p>
                        <p>Ár: {pizza.pizzaPrice} Ft</p>
                        <button onClick={() => handleAddToCart(pizza.id)}>Kosárba</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

PizzaList.propTypes = {
    userId: PropTypes.number.isRequired
};

export default PizzaList;
