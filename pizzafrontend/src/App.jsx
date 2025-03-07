import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Connection from "./pages/Connection";
import CartPage from "./pages/CartPage";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  return (
    <AuthContext> {/* 🔥 Itt csomagoljuk be az egész appot */}
      <Router>
        <Navbar />
        
        <div>
          {/* Alap szakaszok (pl. Home, About) */}
          <section
            id="home"
            style={{
              height: "100vh",
              backgroundColor: "#f0f0f0",
              marginTop: "60px",
            }}
          >
            <h1>Home</h1>
          </section>

          <section id="about" style={{ height: "100vh", backgroundColor: "#e0e0e0" }}>
            <h1>About</h1>
            <p>about us</p>
          </section>

          <section id="connection" style={{ height: "100vh", backgroundColor: "#c0c0c0" }}>
            <h1>Kapcsolat</h1>
          </section>
        </div>

        {/* 🔥 A Routes NEM MEHET a div-be! */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </AuthContext>
  );
}
