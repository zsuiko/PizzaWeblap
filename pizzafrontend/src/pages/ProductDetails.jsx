import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const ProductDetails = () => {
  const { pizzas, drinks, loading, error } = useShop();
  const { productType, productId } = useParams();

  if (loading) return <div>Termékek betöltése...</div>;
  if (error) return <div>Hiba történt: {error}</div>;

  let product;
  if (productType === 'pizza') {
    product = pizzas.find(p => p.pizzaId === parseInt(productId, 10));
  } else if (productType === 'drink') {
    product = drinks.find(d => d.drinkId === parseInt(productId, 10));
  }

  if (!product) return <div>Termék nem található</div>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Ár: {product.price} HUF</p>
      <p>Leírás: {product.description}</p>
      {/* További termékadatok */}
    </div>
  );
};

export default ProductDetails;
