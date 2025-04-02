// App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import Layout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Routes>
          {/* Layout köré csomagolt útvonalak */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productType/:productId" element={<ProductDetails />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 404-es oldal */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
