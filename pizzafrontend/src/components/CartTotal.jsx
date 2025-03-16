import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

    return (
        <div className='w-full'>
           <div className='text-2xl'>
           </div>

           <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>subtotal</p>
                    <p>{currency} {getCartAmount()}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>szállítás</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>összesen</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>

                </div>

           </div>
        </div>
    )
}



export default CartTotal;