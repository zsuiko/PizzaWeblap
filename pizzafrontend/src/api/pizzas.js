const API_URL = import.meta.env.VITE_API_URL;
 
// Pizzák lekérése
export async function getPizzas() {
  try {
      const response = await fetch(`${API_URL}/pizzas`);
      if (!response.ok) {
          throw new Error("Nem sikerült lekérni a pizzákat.");
      }
      return await response.json();
  } catch (error) {
      console.error("Hiba a pizzák lekérésekor:", error);
      return [];
  }
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

export async function deletePizza(pizzaId) {
  const response = await fetch(`${API_URL}/pizzas/${pizzaId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Hiba történt a pizza törlésekor");
  }
}