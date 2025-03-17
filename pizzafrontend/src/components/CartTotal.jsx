import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {

    const {currency,deliveryCost,getCartAmount} = useContext(ShopContext);

    return (
        <div className='w-full'>
           <div className='text-2xl'>
           </div>

           <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>subtotal</p>
                    <p>{getCartAmount()} {currency} </p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>szállítás</p>
                    <p>{deliveryCost} {currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>összesen</b>
                    <b> {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryCost} {currency}</b>

                </div>

           </div>
        </div>
    )
}



export default CartTotal;