import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Bin_icon from "../assets/bin.png";
import CartTotal from "../components/CartTotal";

function Cart() {
    const { cartItems, products, currency, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    const handleQuantityChange = (itemId, size, value) => {
        const newQuantity = Number(value);
        if (newQuantity > 0) {
            updateQuantity(itemId, size, newQuantity);
        }
    };

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <h1 className="font-bold">A TE KOSARAD</h1>
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    return (
                        <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                            <div className="flex items-start gap-6">
                                <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                                <div className="flex items-center gap-5 mt-2">
                                    <p>{currency}{productData.price}</p>
                                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                                </div>
                            </div>
                            <input
                                onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />
                            <img onClick={() => updateQuantity(item._id, item.size, 0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={Bin_icon} alt="" />
                        </div>
                    );
                })}
            </div>

            <div className="felx justify-end my-20">
                <div className="w-full sm:w-[450px] border-t pt-4">
                    <CartTotal />
                </div>

            </div>
        </div>
    );
}

export default Cart;
