import { useState } from "react";
import Orders from "./components/Orders";
import CreateOrder from "./components/CreateOrder";
import CreatePizza from "./components/CreatePizza";
import Pizzas from "./components/Pizzas";
import Cart from "./components/Cart";
import PizzaList from "./components/PizzaList";

function App() {
  const [userId] = useState(1); // Példa felhasználó ID, később bejelentkezéssel kezelhető

  return (
    <div>
      <h1>Slice & Spice</h1>
      <CreateOrder />
      <Orders />
      <CreatePizza />
      <Pizzas />
      <PizzaList userId={userId}/>
      <Cart userId={userId} />
    </div>
  );
}

export default App;
