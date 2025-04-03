// src/pages/Cart.jsx
import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, cartLoading, error, fetchCart, removeFromCart, updateCartItemQuantity, clearCart } = useShop();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    // Call openCart to use the optimized cart loading logic
    fetchCart();
  }, [user, navigate, fetchCart]);

  // Delivery cost and tax calculation
  const deliveryCost = cart.totalPrice > 5000 ? 0 : 990;
  const taxRate = 0.27; // 27% ÁFA
  const subtotal = cart.totalPrice;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + deliveryCost;

  // Handle quantity changes with proper error handling
  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    try {
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) {
        await removeFromCart(itemId);
      } else {
        await updateCartItemQuantity(itemId, newQuantity);
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      // Optionally show an error message to the user
    }
  };

  // Handle item removal with proper error handling
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (err) {
      console.error("Failed to remove item:", err);
      // Optionally show an error message to the user
    }
  };

  // Handle cart clearing with proper error handling
  const handleClearCart = async () => {
    if (window.confirm('Biztosan kiüríti a kosarat?')) {
      try {
        await clearCart();
      } catch (err) {
        console.error("Failed to clear cart:", err);
        // Optionally show an error message to the user
      }
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // This would typically navigate to a checkout page or open a checkout modal
    navigate('/checkout');
  };

  if (cartLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Kosár</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">A kosár üres</h2>
              <p className="text-gray-500 mb-8">Nincs még termék a kosaradban.</p>
              <Link to="/products" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                Vásárlás folytatása
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:flex lg:gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Kosár tartalma ({cart.totalItems} termék)</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors focus:outline-none"
                    >
                      Kosár ürítése
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <div key={item.itemId} className="p-6 flex flex-col md:flex-row md:items-center">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-grow md:mr-6">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.productType === 'pizza' ? 'Pizza' : 'Üdítő'}
                        </p>
                        <div className="mt-2 text-amber-600 font-medium">
                          {item.price} Ft
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 md:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => handleQuantityChange(item.itemId, item.quantity, -1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-700 select-none">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.itemId, item.quantity, 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.itemId)}
                          className="ml-6 text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Rendelés összesítése</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Részösszeg</span>
                    <span className="font-medium">{subtotal} Ft</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">ÁFA ({(taxRate * 100).toFixed(0)}%)</span>
                    <span className="font-medium">{tax} Ft</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Szállítási díj</span>
                    <span className="font-medium">
                      {deliveryCost === 0 ? (
                        <span className="text-green-500">Ingyenes</span>
                      ) : (
                        `${deliveryCost} Ft`
                      )}
                    </span>
                  </div>
                  
                  {deliveryCost > 0 && (
                    <div className="text-xs text-gray-500">
                      Még {5000 - subtotal} Ft vásárlás és ingyenes lesz a kiszállítás!
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 my-4 pt-4"></div>
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Összesen</span>
                    <span className="text-amber-600">{total} Ft</span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors flex items-center justify-center ${
                      isCheckingOut ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Feldolgozás...
                      </>
                    ) : (
                      'Tovább a fizetéshez'
                    )}
                  </button>
                  
                  <div className="mt-6">
                    <Link to="/products" className="text-amber-600 hover:text-amber-800 font-medium text-sm transition-colors flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Vásárlás folytatása
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
