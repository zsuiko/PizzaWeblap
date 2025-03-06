import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext"; // ✅ Importáljuk a contextet
import { getUserData, logout } from "../api/auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getUserData();
        console.log("🔍 Betöltött felhasználó az AuthProvider-ben:", storedUser);

        if (storedUser.userId) {
            setUser(storedUser);
        }
    }, []);

    function handleLogout() {
        logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ✅ PropTypes validálás a `children`-hez
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
