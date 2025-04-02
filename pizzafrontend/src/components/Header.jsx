import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Logo</Link>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link to="/Cart">Cart</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;