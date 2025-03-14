import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";







function Cart() {

    const { products, currency, cartItems } = useContext(ShopContext);

    const {cartData, setCartData} = useState([]) ;

    useEffect(() => {

        const tempData = [];
        for(const item in cartItems){
            for(const item in cartItems[item]){
                if(cartItems[item][item] > 0){
                    tempData.push({
                        _id: item,
                        size: item, 
                        quantity: cartItems[item][item]});
                };
            }
        }
        console.log(tempData);
    }, [cartItems]);


    return (
        <div>

        </div>
    );
}




export default Cart;
