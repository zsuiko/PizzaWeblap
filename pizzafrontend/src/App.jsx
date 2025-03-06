import { useContext } from "react";
import Orders from "./components/Orders";
import CreateOrder from "./components/CreateOrder";
import CreatePizza from "./components/CreatePizza";
import Pizzas from "./components/Pizzas";
import Cart from "./components/Cart";
import PizzaList from "./components/PizzaList";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Named import
import { AuthContext } from "./context/AuthContext"; // ✅ Named import
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider> {/* ✅ Az egész alkalmazás itt legyen becsomagolva */}
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user } = useContext(AuthContext); // ✅ Most már biztosan elérhető lesz

  return (
    <div>
      <h1>Slice & Spice</h1>
      <Navbar />

      {!user ? (
        <div>
          <Register />
          <Login />
        </div>
      ) : (
        <div>
          <CreateOrder />
          <Orders />
          <CreatePizza />
          <Pizzas />
          <PizzaList />
          <Cart />
        </div>
      )}
    </div>
  );
}

export default App;
