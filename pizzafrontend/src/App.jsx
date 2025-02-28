import Orders from "./components/Orders";
import CreateOrder from "./components/CreateOrder";
 
function App() {
  return (
    <div>
      <h1>Pizza Rendelő</h1>
      <CreateOrder />
      <Orders />
    </div>
  );
}
 
export default App;