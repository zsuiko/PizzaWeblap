import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Connection from "./pages/Connection";
import Cart from "./pages/Cart";
import { AuthContext } from "./context/AuthContext";
import Product from "./pages/Product";
import Pizza from "./pages/Pizza"; 
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <AuthContext>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pizza/:productId" element={<Pizza />} /> {/* Új útvonal a pizza részletekhez */}
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext>
  );
}
