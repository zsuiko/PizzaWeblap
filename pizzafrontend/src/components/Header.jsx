import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Logo</Link>

        {/* Desktop menü */}
        <div className="hidden md:flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Mobil menü gomb */}
        <div className="md:hidden flex items-center gap-2">
            <Hamburger size={25} toggled={isMenuOpen} toggle={setIsMenuOpen}/>
        </div>
      </nav>

      {/* Mobil menü */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
