import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import Paypal from "../assets/paypal.png";
import CreditCard from "../assets/creditcard.png";
import Cash from "../assets/Cash.png"
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {

  const [method, setMethod] = useState('cash');

  const {navigate} = useContext(ShopContext);



  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Vezetéknév"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Keresztnév"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Utca Házszám"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Város"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Irányítószám"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Telefonszám"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('paypal')} className="flex items-center gap-3 border p-3 px-5 cursor-pointer rounded-lg hover:shadow-lg">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
              <img
                className="h-7 mx-4"
                src={Paypal}
                alt="Paypal"
                style={{ width: "30px", height: "30px" }}
              />
              <p>PayPal</p>
            </div>
            <div onClick={()=>setMethod('card')} className="flex items-center gap-3 border p-3 px-5 cursor-pointer rounded-lg hover:shadow-lg">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'card' ? 'bg-green-400' : ''}`}></p>
              <img
                className="h-7 mx-4"
                src={CreditCard}
                alt="Credit Card"
                style={{ width: "30px", height: "30px" }}
              />
              <p>Credit Card</p>
            </div>
            <div onClick={()=>setMethod('cash')} className="flex items-center gap-3 border p-3 px-5 cursor-pointer rounded-lg hover:shadow-lg">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cash' ? 'bg-green-400' : ''}`}></p>
              <img
                className="h-7 mx-4"
                src={Cash}
                alt="Készpénz"
                style={{ width: "30px", height: "30px" }}
              />
              <p>Készpénz</p>
            </div>
            <div className="w-full text-end mt-8">
              <button onClick={()=> navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm">Fizetés</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
