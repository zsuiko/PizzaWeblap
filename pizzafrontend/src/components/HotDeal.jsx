import React, { useContext } from "react";
import Hotdeal from "../assets/hot_deal_donpepe.jpg";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function HotDeal() {
    const { addToCart } = useContext(ShopContext);

    const handleHotDealClick = () => {
        const HotDealId = "p7"; 
        const size = "Közepes"; 
        const price = 2500;
        
        addToCart(HotDealId, size, price);
    }

    return (
        <div className="w-[780px] h-[560px] ml-auto mr-auto mt-50">
            <Link onClick={handleHotDealClick} to="/cart">
                <img
                    src={Hotdeal}
                    alt="Hot Deal"
                    className="w-[780px] h-[560px] object-cover ml-auto mr-auto cursor-pointer"
                />
            </Link>
        </div>
    );
}

export default HotDeal;
