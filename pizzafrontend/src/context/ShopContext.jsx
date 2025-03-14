import { createContext, useState, useEffect } from "react";
import { products } from "../assets/pizza_props";
import PropTypes from 'prop-types';
//import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "HUF";
    const deliveryCost = 1000;
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {

        if(!size){
            onclick=alert('Please select a size!');
            return;
        }


    /*    if(!size){
            toast.error('Please select a size!');
            return;
        }*/   



        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } 
            else {
                cartData[itemId][size] = 1;
            }
        } 
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }


    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }


    const value = {
        products,
        currency,
        deliveryCost,
        cartItems,
        addToCart,
        getCartCount,

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
