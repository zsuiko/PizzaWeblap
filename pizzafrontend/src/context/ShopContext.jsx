import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();
const API_URL = 'http://localhost:5278/api';

// Development mode flag - set to true to force using mock data
const USE_MOCK_DATA = false;

// Connection status enum
export const ConnectionStatus = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting'
};

export const ShopProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.CONNECTING);
  const [user, setUser] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  // Get user from localStorage directly instead of using useAuth
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('ShopContext loaded user from localStorage:', parsedUser);
        // Make sure we have a consistent user ID
        if (!parsedUser.id && (parsedUser.Id || parsedUser.userId || parsedUser.UserId)) {
          parsedUser.id = parsedUser.Id || parsedUser.userId || parsedUser.UserId;
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user'); // Clear invalid data
      }
    } else {
      console.log('No user found in localStorage');
    }
    setTokenChecked(true);
  }, []);

  // Get current user details from the API to ensure we have the correct ID
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch current user:', response.status);
        return null;
      }

      const userData = await response.json();
      console.log('Fetched current user from API:', userData);
      return userData;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  // Fetch products on initial load
  useEffect(() => {
    if (!tokenChecked) return; // Wait for token check before fetching data
    
    const fetchData = async () => {
      try {
        setConnectionStatus(ConnectionStatus.CONNECTING);
        
        if (USE_MOCK_DATA) {
          console.log('Using mock data (forced mode)');
          setConnectionStatus(ConnectionStatus.DISCONNECTED);
          setLoading(false);
          return;
        }

        console.log('Attempting to connect to API at:', API_URL);
        
        try {
          let pizzasData = [];
          let drinksData = [];
          
          try {
            const pizzasResponse = await fetch(`${API_URL}/Pizza`, { 
              headers: { 'Accept': 'application/json' }
            });
            
            if (pizzasResponse.ok) {
              pizzasData = await pizzasResponse.json();
              console.log('Pizzas loaded successfully:', pizzasData.length);
            } else {
              console.warn('Failed to load pizzas:', pizzasResponse.status);
            }
          } catch (pizzaErr) {
            console.error('Pizza fetch error:', pizzaErr);
          }
          
          try {
            const drinksResponse = await fetch(`${API_URL}/Drink`, { 
              headers: { 'Accept': 'application/json' }
            });
            
            if (drinksResponse.ok) {
              drinksData = await drinksResponse.json();
              console.log('Drinks loaded successfully:', drinksData.length);
            } else {
              console.warn('Failed to load drinks:', drinksResponse.status);
            }
          } catch (drinkErr) {
            console.error('Drink fetch error:', drinkErr);
          }

          if (pizzasData.length > 0 || drinksData.length > 0) {
            setPizzas(pizzasData);
            setDrinks(drinksData);
            setConnectionStatus(ConnectionStatus.CONNECTED);
            console.log('Successfully connected to backend API');
          } else {
            throw new Error('No data received from API');
          }
        } catch (err) {
          console.warn('Failed to connect to API:', err.message);
          setConnectionStatus(ConnectionStatus.DISCONNECTED);
          setError('Nem sikerült kapcsolódni a szerverhez.');
        }
      } catch (err) {
        console.error('Unexpected error in fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenChecked]);

  // Fetch cart data when connection status changes or user changes
  useEffect(() => {
    setCart({ items: [], totalPrice: 0, totalItems: 0 });
    
    let timeoutId = null;
    
    if (connectionStatus === ConnectionStatus.CONNECTED && user) {
      if (timeoutId) clearTimeout(timeoutId);
      
     timeoutId = setTimeout(() => {
      fetchCart();
 }, 500);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [connectionStatus, user]);

  // Fetch cart from backend with retry logic
  const fetchCart = async (retryCount = 0, maxRetries = 3) => {
    if (!user) return;
    
    try {
      setCartLoading(true);
      
      const response = await fetch(`${API_URL}/Cart`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`);
      }
      
      const carts = await response.json();
      const userCart = carts.find(cart => cart.userId === user.id && cart.isActive);
      
      if (userCart) {
        const formattedCart = {
          cartId: userCart.cartId,
          items: [
            ...userCart.pizzaCartItems.map(item => ({
              itemId: item.pizzaCartItemId,
              productType: 'pizza',
              productId: item.pizzaId,
              name: item.pizza.name,
              price: item.price,
              quantity: item.quantity,
              imageUrl: item.pizza.imageUrl
            })),
            ...userCart.drinkCartItems.map(item => ({
              itemId: item.drinkCartItemId,
              productType: 'drink',
              productId: item.drinkId,
              name: item.drink.name,
              price: item.price,
              quantity: item.quantity,
              imageUrl: item.drink.imageUrl
            }))
          ],
          totalItems: userCart.pizzaCartItems.reduce((sum, item) => sum + item.quantity, 0) + 
                      userCart.drinkCartItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: userCart.pizzaCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) +
                      userCart.drinkCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        setCart(formattedCart);
      } else {
        setCart({ items: [], totalPrice: 0, totalItems: 0 });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart data.');
      
      if (retryCount < maxRetries) {
        console.log(`Retrying fetch cart... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          fetchCart(retryCount + 1, maxRetries);
        }, 1000 * Math.pow(2, retryCount));
      }
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1, productType) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    
    try {
      setCartLoading(true);
      console.log('Current user in addToCart:', user);
      
      // First try to get a fresh user from the API to ensure we have the correct ID
      let userId;
      try {
        const currentUser = await fetchCurrentUser();
        if (currentUser && currentUser.id) {
          userId = currentUser.id;
          console.log('Using user ID from API:', userId);
        }
      } catch (e) {
        console.error('Error fetching current user:', e);
      }
      
      // Fall back to stored user if API call fails
      if (!userId) {
        // Try all possible ID properties
        userId = user.id || user.Id || user.userId || user.UserId;
        console.log('Using user ID from local storage:', userId);
      }
      
      if (!userId) {
        console.error('User ID is missing in user object:', user);
        
        // Last resort - check localStorage directly
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userId = parsedUser.id || parsedUser.Id || parsedUser.userId || parsedUser.UserId;
            console.log('Using user ID from parsed localStorage:', userId);
          } catch (e) {
            console.error('Error parsing user from localStorage:', e);
          }
        }
        
        if (!userId) {
          throw new Error('User ID not found. Please log in again.');
        }
      }
      
      let endpoint;
      let requestBody;
      
      if (productType === 'pizza') {
        endpoint = `${API_URL}/Cart/add-pizza`;
        requestBody = {
          userId: userId,
          pizzaId: product.pizzaId,
          quantity: quantity
        };
      } else if (productType === 'drink') {
        endpoint = `${API_URL}/Cart/add-drink`;
        requestBody = {
          userId: userId,
          drinkId: product.drinkId,
          quantity: quantity
        };
      } else {
        throw new Error('Invalid product type');
      }
      
      console.log('Adding to cart with request:', requestBody);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestBody)
      });
      
      // Log the raw response for debugging
      console.log('Cart add response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        
        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          // Not JSON, use text as message
        }
        
        throw new Error(errorData.message || `Failed to add item to cart: ${response.statusText}`);
      }
      
      await fetchCart();
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message);
      throw error;
    } finally {
      setCartLoading(false);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    // ...existing code...
  };

  const removeFromCart = async (itemId) => {
    // ...existing code...
  };

  const clearCart = async () => {
    // ...existing code...
  };

  const checkout = async (orderDetails) => {
    // ...existing code...
  };

  return (
    <ShopContext.Provider 
      value={{ 
        pizzas, 
        drinks, 
        loading, 
        error,
        cart,
        cartLoading,
        connectionStatus,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        checkout,
        fetchCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
