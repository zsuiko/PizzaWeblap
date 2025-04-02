import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Products = () => {
  const { pizzas, drinks, loading, error } = useShop();

  if (loading) return <div>Termékek betöltése...</div>;
  if (error) return <div>Hiba történt: {error}</div>;

  return (
    <div className="products-page">
      <h1>Termékeink</h1>
      <div className="product-grid">
        {pizzas.map((pizza) => (
          <div key={pizza.pizzaId} className="product-card">
            <Link to={`/Products/pizza/${pizza.pizzaId}`}>
              <img src={pizza.imageUrl} alt={pizza.name} />
              <h3>{pizza.name}</h3>
              <p>{pizza.price} HUF</p>
            </Link>
          </div>
        ))}
        {drinks.map((drink) => (
          <div key={drink.drinkId} className="product-card">
            <Link to={`/Products/drink/${drink.drinkId}`}>
              <img src={drink.imageUrl} alt={drink.name} />
              <h3>{drink.name}</h3>
              <p>{drink.price} HUF</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
