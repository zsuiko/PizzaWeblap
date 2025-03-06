const API_URL = import.meta.env.VITE_API_URL;

/**
 * Regisztráció API hívás
 * @param {Object} user - { userName, email, password, address, city }
 */
export async function register(user) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Regisztráció sikertelen: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Regisztráció hiba:", error);
        throw error;
    }
}

/**
 * Bejelentkezés API hívás
 * @param {Object} credentials - { email, password }
 */
export async function login(credentials) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Bejelentkezés sikertelen: ${errorText}`);
        }

        const data = await response.json();
        console.log("🔍 Bejelentkezési válasz:", data);

        if (!data.token || !data.userId) {
            throw new Error("Hibás válasz a szervertől.");
        }

        // 🔹 Token és felhasználói adatok mentése
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName || "Ismeretlen");
        localStorage.setItem("email", data.email || "");
        localStorage.setItem("address", data.address || "Nincs megadva");
        localStorage.setItem("city", data.city || "Nincs megadva");

        return data;
    } catch (error) {
        console.error("❌ Bejelentkezés hiba:", error);
        throw error;
    }
}

/**
 * Kijelentkezés
 */
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("address");
    localStorage.removeItem("city");
}

/**
 * Bejelentkezett felhasználó adatainak lekérése
 */
export function getUserData() {
    return {
        userId: localStorage.getItem("userId") || null,
        userName: localStorage.getItem("userName"),
        email: localStorage.getItem("email"),
        address: localStorage.getItem("address"),
        city: localStorage.getItem("city"),
    };
}

/**
 * Token lekérése az API hívásokhoz
 */
export function getToken() {
    return localStorage.getItem("token");
}
