import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Add the .jsx extension

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Kérjük, adja meg az e-mail címét és jelszavát.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      console.log('Attempting login with:', { email });
      
      const response = await fetch('http://localhost:5278/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Log HTTP status
      console.log('Login response status:', response.status);
      
      // Get the raw text first for debugging
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      // Then parse it as JSON
      let data;
      try {
        data = JSON.parse(rawText);
        console.log('Login API response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Server response was not valid JSON');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Sikertelen bejelentkezés');
      }
      
      // After logging in successfully, fetch the current user to get the ID
      try {
        const userResponse = await fetch('http://localhost:5278/api/users/me', {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json'
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log('User API response data:', userData);
          
          // Combine the login response with user data
          const combinedData = {
            ...data,
            ...userData,
            // Ensure id is consistently available
            id: userData.id || userData.Id || data.id || data.Id
          };
          
          login(combinedData);
        } else {
          // If we can't get the user details, still log in with what we have
          login(data);
        }
      } catch (userError) {
        console.error('Error fetching user details:', userError);
        // Fall back to just using the login data
        login(data);
      }
      
      navigate(from);
      
    } catch (err) {
      setError(err.message || 'Hiba történt a bejelentkezés során');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bejelentkezés
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email cím</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Email cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Jelszó</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500">
                Még nincs fiókod? Regisztrálj!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
