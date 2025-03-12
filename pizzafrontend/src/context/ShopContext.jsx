import { createContext } from "react";
import { products } from "../assets/pizza_props";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "HUF";
    const deliveryCost = 1000;

    const value = {
        products,
        currency,
        deliveryCost
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

