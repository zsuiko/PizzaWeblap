import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Latest = () => {


const { products } = useContext(ShopContext);


console.log(products);

return (
    <div>

    </div>
)
}


export default Latest;