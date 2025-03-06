import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            setUser(data);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div>
            <h2>Bejelentkezés</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Bejelentkezés</button>
            </form>
        </div>
    );
}

export default Login;
