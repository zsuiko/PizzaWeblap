import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Pizza = () => {
  const { productId } = useParams(); // Az URL-ből kiolvassuk a productId-t
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    // A termékek keresése az id alapján
    const product = products.find(item => item.id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return <div>Loading...</div>; // Ha még nem találjuk meg a terméket
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex">
        {productData.image.map((item, index) => (
          <img
            src={item}
            key={index}
            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            alt={productData.name}
          />
        ))}
      </div>
      <h2>{productData.name}</h2>
      <p>{productData.description}</p>
      <p>{productData.price} Ft</p>
    </div>
  );
};

export default Pizza;
