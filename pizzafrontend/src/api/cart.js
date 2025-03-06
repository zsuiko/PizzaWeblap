const API_URL = import.meta.env.VITE_API_URL; // 🔥 API URL betöltése a környezeti változókból

/**
 * 🔍 Kosár lekérése a backendről adott felhasználóhoz (`userId` alapján)
 */
export async function getCart(userId) {
    if (!userId) {
        console.warn("⚠ Nincs userId, ezért nem kérjük le a kosár tartalmát.");
        return [];
    }

    try {
        console.log(`📥 Kosár lekérése: ${API_URL}/cart?userId=${userId}`); // Debug log
        const response = await fetch(`${API_URL}/cart?userId=${userId}`);

        if (!response.ok) {
            throw new Error("❌ Nem sikerült lekérni a kosár tartalmát.");
        }

        const data = await response.json();
        console.log("✅ Kosár adatok sikeresen lekérve:", data);
        return data;
    } catch (error) {
        console.error("❌ Hiba a kosár lekérésekor:", error);
        return [];
    }
}

/**
 * ❌ Pizzatétel eltávolítása a kosárból (`cartId` alapján)
 */
export async function removeFromCart(cartId) {
    if (!cartId) {
        console.error("⚠ Hiba: Hiányzó cartId!");
        alert("⚠ Hiba! Nincs megadva kosár azonosító.");
        return false;
    }

    try {
        console.log(`🗑 Kosár tétel törlése: ${API_URL}/cart/${cartId}`); // Debug log
        const response = await fetch(`${API_URL}/cart/${cartId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("❌ Nem sikerült eltávolítani a tételt a kosárból.");
        }

        console.log("✅ Kosár tétel sikeresen törölve!");
        return true;
    } catch (error) {
        console.error("❌ Hiba a kosárból való törléskor:", error);
        return false;
    }
}

/**
 * ➕ Pizza hozzáadása a kosárhoz
 */
export async function addToCart(userId, pizzaId, quantity = 1) {
    console.log("📤 Kosárba helyezés (ellenőrzés):", { userId, pizzaId, quantity }); // Debug log

    // Ha valamelyik azonosító hiányzik, ne küldjünk API hívást
    if (!userId || !pizzaId) {
        console.error("❌ Hiba: Hiányzó userId vagy pizzaId!", { userId, pizzaId });
        alert("⚠ Hiba! Hiányzó felhasználó vagy pizza azonosító.");
        return;
    }

    // Token ellenőrzése (ha szükséges)
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("❌ Hiba: Hiányzó token! A felhasználó nincs bejelentkezve.");
        alert("⚠ Hiba! Először jelentkezz be.");
        return;
    }

    try {
        console.log(`🛒 Pizza hozzáadása a kosárhoz: ${API_URL}/cart`); // Debug log
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` // ✅ Token ellenőrzése
            },
            body: JSON.stringify({
                userId,
                pizzaId,
                quantity
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`❌ Nem sikerült hozzáadni a pizzát a kosárhoz: ${errorText}`);
        }

        console.log("✅ Sikeres pizza hozzáadás a kosárhoz!");
        return await response.json();
    } catch (error) {
        console.error("❌ Hiba a pizza kosárba helyezésekor:", error);
        alert("⚠ Hiba történt a pizza kosárba helyezésekor.");
        throw error;
    }
}

/**
 * ✅ Rendelés leadása a backendnek (`userId` alapján)
 */
export async function checkout(userId) {
    if (!userId) {
        console.warn("⚠ Nincs userId, ezért nem tudjuk leadni a rendelést.");
        alert("⚠ Hiba! Hiányzó felhasználó azonosító.");
        return;
    }

    try {
        console.log(`📦 Rendelés leadása: ${API_URL}/orders/checkout?userId=${userId}`); // Debug log
        const response = await fetch(`${API_URL}/orders/checkout?userId=${userId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ Token ellenőrzése
            }
        });

        if (!response.ok) {
            throw new Error("❌ Nem sikerült leadni a rendelést.");
        }

        const result = await response.json();
        console.log("✅ Rendelés sikeresen leadva!", result);
        return result;
    } catch (error) {
        console.error("❌ Hiba a rendelés során:", error);
        alert("⚠ Hiba történt a rendelés során.");
        throw error;
    }
}
