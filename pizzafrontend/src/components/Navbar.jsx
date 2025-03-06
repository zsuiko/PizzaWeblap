import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <h1>Slice & Spice</h1>
            {user ? (
                <div>
                    <p>Felhasználó: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p>Cím: {user.address}</p>
                    <p>Város: {user.city}</p>
                    <button onClick={logout}>Kijelentkezés</button>
                </div>
            ) : (
                <p>Nem vagy bejelentkezve.</p>
            )}
        </nav>
    );
}

export default Navbar;
