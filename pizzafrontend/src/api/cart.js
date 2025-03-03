const API_URL = import.meta.env.VITE_API_URL; // 🔥 Csak az alap API URL jön a .env-ből

export async function getCart(userId) {
    try {
        const response = await fetch(`${API_URL}/cart?userId=${userId}`); // 🔥 Itt adjuk hozzá a `/cart` végpontot
        if (!response.ok) {
            throw new Error("Nem sikerült lekérni a kosár tartalmát.");
        }
        return await response.json();
    } catch (error) {
        console.error("Hiba a kosár lekérésekor:", error);
        return [];
    }
}

export async function removeFromCart(cartId) {
    try {
        const response = await fetch(`${API_URL}/cart/${cartId}`, { // 🔥 `/cart` itt is a végponton van
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Nem sikerült eltávolítani a tételt a kosárból.");
        }
        return true;
    } catch (error) {
        console.error("Hiba a kosárból való törléskor:", error);
        return false;
    }
}

export async function addToCart(userId, pizzaId, quantity = 1) {
    try {
        const response = await fetch(`${API_URL}/cart`, { // 🔥 `/cart` itt is a végponton van
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                pizzaId,
                quantity,
            }),
        });

        if (!response.ok) {
            throw new Error("Nem sikerült hozzáadni a pizzát a kosárhoz.");
        }

        return await response.json();
    } catch (error) {
        console.error("Hiba a pizza kosárba helyezésekor:", error);
        return null;
    }
}

export async function checkout(userId) {
    try {
        const response = await fetch(`${API_URL}/orders/checkout?userId=${userId}`, { // 🔥 `/orders/checkout`
            method: "POST"
        });
        if (!response.ok) {
            throw new Error("Nem sikerült leadni a rendelést.");
        }
        return await response.json();
    } catch (error) {
        console.error("Hiba a rendelés során:", error);
        throw error;
    }
}
