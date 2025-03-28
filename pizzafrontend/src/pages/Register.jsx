import { useState } from "react";
//import { register } from "../api/auth";

function Register() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    address: "",
    city: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(userData);
      alert("Sikeres regisztráció!");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Felhasználónév" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} required />
        <input type="email" placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
        <input type="password" placeholder="Jelszó" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />
        <input type="text" placeholder="Cím" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} required />
        <input type="text" placeholder="Város" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} required />
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
}

export default Register;
