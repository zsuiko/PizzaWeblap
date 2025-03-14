import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem"; // Make sure ProductItem is imported


const Latest = () => {
    const { products } = useContext(ShopContext); 

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grap-6">
            {
                products.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    );
}

export default Latest;
