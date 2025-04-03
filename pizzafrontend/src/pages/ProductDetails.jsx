import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const ProductDetails = () => {
  const { pizzas, drinks, loading, error, addToCart, cartLoading } = useShop();
  const { productType, productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200 max-w-xl mx-auto mt-8">
      <p className="text-red-600 font-medium">Hiba történt: {error}</p>
    </div>
  );

  let product;
  let relatedProducts = [];
  
  if (productType === 'pizza') {
    product = pizzas.find(p => p.pizzaId === parseInt(productId, 10));
    relatedProducts = pizzas.filter(p => p.pizzaId !== parseInt(productId, 10)).slice(0, 4);
  } else if (productType === 'drink') {
    product = drinks.find(d => d.drinkId === parseInt(productId, 10));
    relatedProducts = drinks.filter(d => d.drinkId !== parseInt(productId, 10)).slice(0, 4);
  }

  if (!product) return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Termék nem található</h2>
        <p className="text-gray-600 mb-6">A keresett termék nem létezik vagy eltávolították.</p>
        <Link to="/products" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
          Vissza a termékekhez
        </Link>
      </div>
    </div>
  );

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login', { 
        state: { from: `/products/${productType}/${productId}` }
      });
      return;
    }

    try {
      setAddingToCart(true);
      
      // Debug information about the current user
      console.log("Current user before adding to cart:", user);
      console.log("User ID properties:", {
        id: user.id,
        Id: user.Id,
        userId: user.userId,
        UserId: user.UserId
      });
      
      await addToCart(product, quantity, productType);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000); // Reset added state after 3 seconds
    } catch (err) {
      console.error("Hiba a kosárhoz adás során:", err);
      alert(`Hiba történt: ${err.message}`);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + change;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-amber-600 hover:text-amber-800 transition-colors">Főoldal</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/products" className="text-amber-600 hover:text-amber-800 transition-colors">Termékek</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 font-medium">{product.name}</span>
        </nav>
        
        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100">
              <div className="relative h-96 md:h-full">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="absolute w-full h-full object-contain p-6"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              {productType === 'pizza' ? (
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">Pizza</div>
              ) : (
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">Üdítő</div>
              )}
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <p className="text-2xl font-bold text-amber-600 mb-6">{product.price} Ft</p>
              
              <p className="text-gray-600 mb-8">{product.description}</p>
              
              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Mennyiség</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-l-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="w-12 h-10 bg-gray-100 flex items-center justify-center border-t border-b border-gray-200">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-r-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || cartLoading}
                className={`w-full ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors ${(addingToCart || cartLoading) ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {addingToCart || cartLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Folyamatban...
                  </>
                ) : added ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Kosárba téve!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Kosárba teszem
                  </>
                )}
              </button>
              
              {added && (
                <div className="mt-4 text-center">
                  <Link to="/cart" className="text-amber-600 hover:text-amber-800 font-medium transition-colors">
                    Ugrás a kosárhoz →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div> 
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Hasonló termékek</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  to={`/products/${productType}/${productType === 'pizza' ? relProduct.pizzaId : relProduct.drinkId}`}
                  key={productType === 'pizza' ? relProduct.pizzaId : relProduct.drinkId}
                  className="group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relProduct.imageUrl} 
                        alt={relProduct.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 group-hover:text-amber-500 transition-colors">{relProduct.name}</h3>
                      <p className="text-amber-600 font-medium mt-2">{relProduct.price} Ft</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
