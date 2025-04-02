import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pizzasResponse, drinksResponse] = await Promise.all([
          fetch('http://localhost:5278/api/Pizza'),
          fetch('http://localhost:5278/api/Drink'),
        ]);

        if (!pizzasResponse.ok || !drinksResponse.ok) {
          throw new Error('Hiba történt az adatok lekérésekor');
        }

        const [pizzasData, drinksData] = await Promise.all([
          pizzasResponse.json(),
          drinksResponse.json(),
        ]);

        setPizzas(pizzasData);
        setDrinks(drinksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ShopContext.Provider value={{ pizzas, drinks, loading, error }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('A useShop hookot a ShopProvider-en belül kell használni');
  }
  return context;
};
