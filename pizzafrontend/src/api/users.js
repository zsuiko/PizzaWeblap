const API_URL = import.meta.env.VITE_API_URL;
 
// Felhasználók lekérése
export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Hiba történt a felhasználók lekérdezésekor");
  }
  return await response.json();
}
 
// Új felhasználó létrehozása (Regisztráció)
export async function createUser(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
 
  if (!response.ok) {
    throw new Error("Hiba történt a felhasználó létrehozásakor");
  }
 
  return await response.json();
}