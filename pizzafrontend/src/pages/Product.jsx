import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";



function Product(){


  const { products } = useContext(ShopContext);


  return(

 <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 broder-1">
        <div className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">Filter</p>

          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'}`}>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Vegán'} /> Vegán
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Húsos'}/> Húsos
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Olasz'} /> Olasz
            </p>

          </div>
          </div>
        </div>
      </div>



  )






}


export default Product