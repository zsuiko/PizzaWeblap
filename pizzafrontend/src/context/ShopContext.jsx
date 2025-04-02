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
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
    setTokenChecked(true);
  }, []);

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
    if (connectionStatus !== ConnectionStatus.CONNECTED || !user) {
      return;
    }
    
    try {
      setCartLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token available for cart fetch');
        return;
      }
      
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        console.log(`Retrying cart fetch (attempt ${retryCount} of ${maxRetries})...`);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const response = await fetch(`${API_URL}/Cart`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.warn('Cart fetch failed:', response.status);
          throw new Error('Hiba történt a kosár betöltésekor');
        }
        
        const cartData = await response.json();
        
        const items = Array.isArray(cartData?.items) ? cartData.items : [];
        
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        setCart({
          items: items,
          totalItems,
          totalPrice
        });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (err) {
      console.error('Kosár betöltési hiba:', err);
      
      if (retryCount < maxRetries && 
         (err.name === 'TypeError' || err.message.includes('network') || err.message.includes('resource'))) {
        console.log(`Will retry cart fetch in ${retryCount + 1} seconds...`);
        return fetchCart(retryCount + 1, maxRetries);
      }
      
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
      setError(`Nem sikerült betölteni a kosarat: ${err.message}`);
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    // ...existing code...
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
        fetchCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
