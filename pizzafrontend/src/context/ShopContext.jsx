import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Keep this import

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
  // Safely try to use AuthContext if available
  let authUser = null;
  try {
    const auth = useAuth();
    authUser = auth?.user;
    console.log('Successfully connected to AuthContext, user:', authUser);
  } catch (error) {
    console.warn('AuthContext not available:', error.message);
  }
  
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.CONNECTING);
  const [user, setUser] = useState(null); // Keep this for backward compatibility
  const [tokenChecked, setTokenChecked] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);  // Track if cart is open
  const [lastCartFetch, setLastCartFetch] = useState(0);  // Track last fetch time
  const [deletedItems, setDeletedItems] = useState([]); // Track deleted items

  // Update local user state when authUser changes
  useEffect(() => {
    if (authUser) {
      console.log('User from AuthContext:', authUser);
      setUser(authUser);
    }
  }, [authUser]);

  // Keep existing useEffect for localStorage backup (as fallback)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) { // Only use localStorage if we don't have a user yet
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
    }
    setTokenChecked(true);
  }, [user]);

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

  // Modified: Only fetch cart when explicitly needed instead of on every user/connection change
  useEffect(() => {
    // Reset cart when user changes
    if (!user) {
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
    }
  }, [user]);

  // Function to open cart and load data if needed
  const openCart = () => {
    setCartOpen(true);
    
    // Only fetch if we're connected and have a user
    if (connectionStatus === ConnectionStatus.CONNECTED && user) {
      const now = Date.now();
      // Only fetch if it's been more than 10 seconds since the last fetch
      if (now - lastCartFetch > 10000) {
        fetchCart();
      }
    }
  };

  // Function to close cart
  const closeCart = () => {
    setCartOpen(false);
  };

  // Fetch cart from backend with retry logic
  const fetchCart = async (retryCount = 0, maxRetries = 3, force = false) => {
    if (!user) return;
    
    // If not forced, check if we've fetched recently
    if (!force) {
      const now = Date.now();
      if (now - lastCartFetch < 2000) {
        console.log('Skipping cart fetch - too soon since last fetch');
        return;
      }
    }
    
    setLastCartFetch(Date.now());
    
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
      console.log('All carts from API:', carts);
      
      const userCart = carts.find(cart => cart.userId === user.id && cart.isActive);
      
      if (userCart) {
        console.log('Found user cart:', userCart);
        
        // Filter out items that were locally deleted
        const filteredPizzaItems = userCart.pizzaCartItems.filter(item => 
          !deletedItems.includes(`pizza-${item.pizzaCartItemId}`)
        );
        
        const filteredDrinkItems = userCart.drinkCartItems.filter(item => 
          !deletedItems.includes(`drink-${item.drinkCartItemId}`)
        );
        
        // Create a modified userCart with filtered items
        const filteredUserCart = {
          ...userCart,
          pizzaCartItems: filteredPizzaItems,
          drinkCartItems: filteredDrinkItems
        };
        
        // Create a map of pizzas/drinks from our loaded product data for quick lookup
        const pizzaMap = pizzas.reduce((map, pizza) => {
          map[pizza.pizzaId] = pizza;
          return map;
        }, {});
        
        const drinkMap = drinks.reduce((map, drink) => {
          map[drink.drinkId] = drink;
          return map;
        }, {});
        
        // Safely process pizza items with null checks and use local data when possible
        const pizzaItems = filteredUserCart.pizzaCartItems
          .filter(item => item && item.pizzaId)
          .map(item => {
            // Try to use our loaded pizza data first
            const pizzaData = pizzaMap[item.pizzaId] || item.pizza;
            
            if (!pizzaData) {
              console.warn(`Pizza with ID ${item.pizzaId} not found in cart item or local data`, item);
              return {
                itemId: item.pizzaCartItemId,
                productType: 'pizza',
                productId: item.pizzaId,
                name: `Pizza #${item.pizzaId}`,
                price: item.price || 0,
                quantity: item.quantity || 1,
                imageUrl: '/placeholder.jpg'
              };
            }
            
            return {
              itemId: item.pizzaCartItemId,
              productType: 'pizza',
              productId: item.pizzaId,
              name: pizzaData.name || `Pizza #${item.pizzaId}`,
              price: item.price || pizzaData.price || 0,
              quantity: item.quantity || 1,
              imageUrl: pizzaData.imageUrl || '/placeholder.jpg'
            };
          });
        
        // Safely process drink items with null checks and use local data when possible
        const drinkItems = filteredUserCart.drinkCartItems
          .filter(item => item && item.drinkId)
          .map(item => {
            // Try to use our loaded drink data first
            const drinkData = drinkMap[item.drinkId] || item.drink;
            
            if (!drinkData) {
              console.warn(`Drink with ID ${item.drinkId} not found in cart item or local data`, item);
              return {
                itemId: item.drinkCartItemId,
                productType: 'drink',
                productId: item.drinkId,
                name: `Drink #${item.drinkId}`,
                price: item.price || 0,
                quantity: item.quantity || 1,
                imageUrl: '/placeholder.jpg'
              };
            }
            
            return {
              itemId: item.drinkCartItemId,
              productType: 'drink',
              productId: item.drinkId,
              name: drinkData.name || `Drink #${item.drinkId}`,
              price: item.price || drinkData.price || 0,
              quantity: item.quantity || 1,
              imageUrl: drinkData.imageUrl || '/placeholder.jpg'
            };
          });
        
        const formattedCart = {
          cartId: userCart.cartId,
          items: [...pizzaItems, ...drinkItems],
          totalItems: 
            filteredUserCart.pizzaCartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0) + 
            filteredUserCart.drinkCartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0),
          totalPrice:
            filteredUserCart.pizzaCartItems.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0) +
            filteredUserCart.drinkCartItems.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0)
        };
        
        setCart(formattedCart);
      } else {
        setCart({ items: [], totalPrice: 0, totalItems: 0 });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart data.');
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1, productType) => {
    // Use the user state that may have been populated from AuthContext or localStorage
    const currentUser = user;
    
    if (!currentUser) {
      console.error('User not authenticated');
      setError('Please log in to add items to your cart.');
      return;
    }
    
    try {
      setCartLoading(true);
      console.log('Current user in addToCart:', currentUser);
      
      // First try to get a fresh user from the API to ensure we have the correct ID
      let userId;
      try {
        const fetchedUser = await fetchCurrentUser();
        if (fetchedUser && fetchedUser.id) {
          userId = fetchedUser.id;
          console.log('Using user ID from API:', userId);
        }
      } catch (e) {
        console.error('Error fetching current user:', e);
      }
      
      // Fall back to stored user if API call fails
      if (!userId) {
        // Try all possible ID properties
        userId = currentUser.id || currentUser.Id || currentUser.userId || currentUser.UserId;
        console.log('Using user ID from context:', userId);
      }
      
      if (!userId) {
        console.error('User ID is missing in user object:', currentUser);
        throw new Error('User ID not found. Please log in again.');
      }
      
      let endpoint;
      let requestBody;
      
      console.log('Product being added to cart:', product);
      console.log('Product type:', productType);
      
      if (productType === 'pizza') {
        endpoint = `${API_URL}/Cart/add-pizza`;
        // Ensure we have a valid pizzaId, handling different property names
        const pizzaId = product.pizzaId || product.id || product.Id || product.PizzaId;
        if (!pizzaId) {
          throw new Error('Invalid pizza: Missing pizzaId');
        }
        
        requestBody = {
          userId: userId,
          pizzaId: pizzaId,
          quantity: quantity
        };
      } else if (productType === 'drink') {
        endpoint = `${API_URL}/Cart/add-drink`;
        // Ensure we have a valid drinkId, handling different property names
        const drinkId = product.drinkId || product.id || product.Id || product.DrinkId;
        if (!drinkId) {
          throw new Error('Invalid drink: Missing drinkId');
        }
        
        requestBody = {
          userId: userId,
          drinkId: drinkId,
          quantity: quantity
        };
      } else {
        throw new Error(`Invalid product type: ${productType}`);
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
        
        let errorMessage = `Failed to add item to cart: ${response.statusText}`;
        
        try {
          // Try to parse error as JSON
          const errorData = JSON.parse(errorText);
          if (errorData.message || errorData.title || errorData.error) {
            errorMessage = errorData.message || errorData.title || errorData.error;
          }
        } catch (e) {
          // If not JSON, check for specific error messages
          if (errorText.includes("not available")) {
            errorMessage = `Az üdítő jelenleg nem elérhető.`;
          } else if (errorText.includes("not found")) {
            errorMessage = `A termék nem található.`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Force refresh the cart data after adding an item
      await fetchCart(0, 3, true); // Force fetch with true parameter
      
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
    if (!user) {
      console.error('User not authenticated');
      setError('Please log in to update your cart.');
      return;
    }

    try {
      setCartLoading(true);
      
      // Determine if it's a pizza or drink item
      const item = cart.items.find(item => item.itemId === itemId);
      if (!item) {
        throw new Error(`Item with ID ${itemId} not found in cart`);
      }
      
      let endpoint;
      let requestBody;
      
      if (item.productType === 'pizza') {
        endpoint = `${API_URL}/Cart/update-pizza-quantity`;
        requestBody = {
          pizzaCartItemId: itemId,
          quantity: quantity
        };
      } else if (item.productType === 'drink') {
        endpoint = `${API_URL}/Cart/update-drink-quantity`;
        requestBody = {
          drinkCartItemId: itemId,
          quantity: quantity
        };
      } else {
        throw new Error('Unknown product type');
      }
      
      console.log(`Updating ${item.productType} quantity:`, requestBody);
      
      // Since the backend may not have update endpoints yet, we'll implement our own solution
      // that works with the current data structure
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return removeFromCart(itemId);
      }
      
      const currentItem = { ...item };
      
      // Update the item in the local cart
      const updatedItems = cart.items.map(item => {
        if (item.itemId === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      // Calculate the price difference
      const priceDifference = (quantity - currentItem.quantity) * currentItem.price;
      
      // Update the cart in state
      setCart({
        ...cart,
        items: updatedItems,
        totalItems: cart.totalItems + (quantity - currentItem.quantity),
        totalPrice: cart.totalPrice + priceDifference
      });
      
      // Try to update on the server if possible
      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          console.warn('Failed to update item quantity on server, will refresh cart from server');
          await fetchCart(0, 3, true); // Force refresh from server
        }
      } catch (error) {
        console.error('Error updating quantity on server:', error);
        await fetchCart(0, 3, true); // Force refresh from server on error
      }
      
      return true;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      setError(error.message);
      throw error;
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) {
      console.error('User not authenticated');
      setError('Please log in to remove items from your cart.');
      return;
    }

    try {
      setCartLoading(true);
      
      // Determine if it's a pizza or drink item
      const item = cart.items.find(item => item.itemId === itemId);
      if (!item) {
        throw new Error(`Item with ID ${itemId} not found in cart`);
      }
      
      console.log(`Removing ${item.productType} item:`, itemId);
      
      // Update the local cart state first (optimistic update)
      const updatedItems = cart.items.filter(item => item.itemId !== itemId);
      const removedItem = cart.items.find(item => item.itemId === itemId);
      const priceDifference = removedItem ? removedItem.quantity * removedItem.price : 0;
      const quantityDifference = removedItem ? removedItem.quantity : 0;
      
      // Track this item as deleted locally
      const deleteKey = `${item.productType}-${itemId}`;
      setDeletedItems(prev => [...prev, deleteKey]);
      
      // Update the cart in state immediately for better UX
      setCart({
        ...cart,
        items: updatedItems,
        totalItems: cart.totalItems - quantityDifference,
        totalPrice: cart.totalPrice - priceDifference
      });
      
      // Since there's no backend support for removal, we'll just keep the local state
      // and NOT fetch from the server as that would reintroduce the "deleted" item
      return true;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError(error.message);
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) {
      console.error('User not authenticated');
      setError('Please log in to clear your cart.');
      return;
    }

    try {
      setCartLoading(true);
      
      // Get the IDs of all current cart items for tracking as deleted
      const allDeletedKeys = cart.items.map(item => `${item.productType}-${item.itemId}`);
      setDeletedItems(prev => [...prev, ...allDeletedKeys]);
      
      // Clear the cart locally
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
      
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(error.message);
      return false;
    } finally {
      setCartLoading(false);
    }
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
        openCart,
        closeCart,
        cartOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
