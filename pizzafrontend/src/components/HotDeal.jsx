//import React from "react";
import hot_deal_picture from "../assets/hot_deal_picture.jpg";

function HotDeal() {
    return (
        <div className="w-[780px] h-[560px ] ml-auto mr-auto mt-50">
            <img src={hot_deal_picture} alt="Hot Deal" className="w-[780px] h-[560px] object-cover ml-auto mr-auto" />
        </div>
    );
}

export default HotDeal;