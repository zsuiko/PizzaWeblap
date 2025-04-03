import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if (storedUser && storedToken && new Date(tokenExpiration) > new Date()) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Loaded user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Ensure user data has an id field (use consistent property name)
    const processedUserData = { ...userData };

    // Debug the raw user data from backend
    console.log('Raw user data from login:', userData);
    
    // We need to ensure the user has an 'id' property - check all possible formats
    if (!processedUserData.id && !processedUserData.Id && !processedUserData.userId && !processedUserData.UserId) {
      // If no ID property is present, use the ID from the JWT token claim
      // This is a hack but ensures we have an ID if the API doesn't return one directly
      try {
        const tokenData = userData.token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenData));
        console.log('Decoded token:', decodedToken);
        
        // Try to find ID in standard JWT claim formats
        processedUserData.id = decodedToken.sub || 
                             decodedToken.nameid || 
                             decodedToken.userId ||
                             decodedToken.id;
                             
        console.log('Extracted ID from token:', processedUserData.id);
      } catch (e) {
        console.error('Failed to extract user ID from token:', e);
      }
    }
    
    // Normalize ID field to use 'id' as the standard property
    processedUserData.id = processedUserData.id || 
                           processedUserData.Id || 
                           processedUserData.userId || 
                           processedUserData.UserId || 
                           'unknown-id';

    console.log('Processed user data before storage:', processedUserData);
    
    setUser(processedUserData);
    localStorage.setItem('user', JSON.stringify(processedUserData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken || '');
    localStorage.setItem('tokenExpiration', userData.tokenExpiration || new Date(Date.now() + 86400000).toISOString()); // Default 24h if not provided
    
    setError(null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Add isAuthenticated helper function
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      logout, 
      updateUser, 
      setError,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
