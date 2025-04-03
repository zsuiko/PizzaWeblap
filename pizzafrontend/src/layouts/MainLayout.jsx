import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingBagIcon } from "@heroicons/react/24/outline"; // Updated import for Heroicons v2

function MainLayout() {
  const { user, logout } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Nav bar */}
      <header className="bg-amber-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo and main nav */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">Pizza Shop</Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-amber-200 transition">Főoldal</Link>
              <Link to="/products" className="hover:text-amber-200 transition">Termékek</Link>
              {/* ...existing navigation links... */}
            </nav>
          </div>
          
          {/* Auth and cart links */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center hover:text-amber-200 transition">
              <ShoppingBagIcon className="h-6 w-6 mr-1" />
            </Link>
            
            {/* Conditional rendering based on auth status */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Üdv, {user.firstName || 'Felhasználó'}!</span>
                <button 
                  onClick={logout}
                  className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded text-sm transition"
                >
                  Kijelentkezés
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded text-sm transition"
                >
                  Bejelentkezés
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-amber-700 hover:bg-amber-100 px-4 py-2 rounded text-sm transition"
                >
                  Regisztráció
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer - keep your existing footer */}
      <footer className="bg-gray-800 text-white py-8">
        {/* ...existing footer content... */}
      </footer>
    </div>
  );
}

export default MainLayout;