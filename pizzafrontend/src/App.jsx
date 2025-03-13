import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Connection from "./pages/Connection";
import Cart from "./pages/Cart";
import { AuthContext   } from "./context/AuthContext";
//import Contact from "./pages/Contact"
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <AuthContext  > {/* 🔥 Itt csomagoljuk be az egész appot */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/cart" element={<Cart/>} />
                   
                   {/* <Route path="/contact" element={<Contact />} /> */}
          {/*/:productId */}
          <Route path="/product" element={<Product/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext  >
  );
}
