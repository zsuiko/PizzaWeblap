const API_URL = import.meta.env.VITE_API_URL;
 
// Pizzák lekérése
export async function getPizzas() {
  const response = await fetch(`${API_URL}/pizzas`);
  if (!response.ok) {
    throw new Error("Hiba történt a pizzák lekérdezésekor");
  }
  return await response.json();
}
 
// Új pizza hozzáadása
export async function createPizza(pizzaData) {
  const response = await fetch(`${API_URL}/pizzas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizzaData),
  });
 
  if (!response.ok) {
    throw new Error("Hiba történt a pizza létrehozásakor");
  }
 
  return await response.json();
}