import { createContext } from "react";
import {products } from 




export const ShopContext = createContext(); // ✅ Létrehozzuk a contextet

const ShopContextProvider = (props) => {

    const currency = "HUF";
    const deliveryCost = 1000;


    const value = {
        currency,
        deliveryCost
    };


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider; // ✅ Exportáljuk a providert

