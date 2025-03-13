import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; // A context importálása
import Star from "../assets/star.png";

const Pizza = () => {
  const { productId } = useParams(); // Az URL-ből kiolvassuk a productId-t
  const { products, currency } = useContext(ShopContext); // A currency-t és a products-ot a contextből olvassuk ki
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState(""); // Méret állapot inicializálása

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  if (!productData) {
    return <div className="text-center text-xl">Loading...</div>; // Ha még nem találjuk meg a terméket
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto transition-opacity ease-in duration-500 opacity-100">
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <img src={image} alt={productData.name} className="w-80 h-80 object-cover rounded-lg shadow-lg"/>
      </div>
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <img src={Star} alt="Star" className="w-5 h-5" />
          <img src={Star} alt="Star" className="w-5 h-5"/>
          <img src={Star} alt="Star" className="w-5 h-5"/>
          <img src={Star} alt="Star" className="w-5 h-5"/>
          <img src={Star} alt="Star" className="w-5 h-5"/>
          <p className="pl-2">(122)</p>
        </div>
        <p className="mt-5 text-3xl font-medium">{productData.price} {currency}</p> {/* A currency most a contextből jön */}
        <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
        <div className="flex flex-col gap-4 my-8">
          <p>Select Size</p>
          <div className="flex gap-2">
            {productData.sizes.map((item, index) => (
              <button
                onClick={() => setSize(item)} 
                className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ""}`} 
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-600">ADD TO CART</button>
        <hr className="mt-8 sm:w-auto"/>
      </div>
    </div>
  );
};

export default Pizza;
