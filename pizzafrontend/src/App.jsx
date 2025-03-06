import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Navbar />

      <div>
        {/* Alap szakaszok (pl. Home, About) */}
        <section
          id="home"
          style={{
            height: "100vh",
            backgroundColor: "#f0f0f0",
            marginTop: "60px", // A navbar magasságának figyelembevétele
          }}
        >
          <h1>Home</h1>
        </section>

        <section id="about" style={{ height: "100vh", backgroundColor: "#e0e0e0" }}>
          <h1>About</h1>
          <p>about us</p>
        </section>

        <section id="ingridients" style={{ height: "100vh", backgroundColor: "#d0d0d0" }}>
          <h1>Amiből készül</h1>
        </section>

        <section id="connection" style={{ height: "100vh", backgroundColor: "#c0c0c0" }}>
          <h1>Kapcsolat</h1>
        </section>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ingridients" element={<Ingridients />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
