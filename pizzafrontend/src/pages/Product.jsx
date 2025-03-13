import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";

function Product() {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-1">
      <div className="min-w-60">
        <p>Filter</p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"}`}>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Vegán" onChange={toggleCategory} /> Vegán
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Húsos" onChange={toggleCategory}/> Húsos
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Olasz" onChange={toggleCategory}/> Olasz
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <Link to={`/pizza/${item.id}`} key={index}>
              <ProductItem 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
