const API_URL = import.meta.env.VITE_API_URL; // API URL betöltése az .env-ből
 
export async function getOrders() {
  try {
    console.log("API URL:", API_URL); // Ellenőrzés
    const response = await fetch(`${API_URL}/orders`);
 
    console.log("HTTP Response Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
 
    if (!response.ok) {
      throw new Error(`Hiba: ${response.status} - ${response.statusText}`);
    }
 
    const text = await response.text();
    console.log("Backend válasz (nyers szöveg):", text);
 
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("A szerver nem JSON adatot küldött vissza.");
    }
 
    return JSON.parse(text);
  } catch (error) {
    console.error("API hívás hiba:", error);
    throw error;
  }
}
 
 
// Új rendelés létrehozása
export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
 
  if (!response.ok) {
    throw new Error("Hiba történt a rendelés létrehozásakor");
  }
 
  return await response.json();
}