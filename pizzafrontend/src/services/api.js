const API_URL = 'http://localhost:5278/api'; // Updated to port 5278

// Custom fetch with authentication and error handling
const fetchWithAuth = async (url, options = {}) => {
  // Add default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authentication token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Prepare the request
  const config = {
    ...options,
    headers,
  };

  // Make the request
  const response = await fetch(`${API_URL}${url}`, config);
  
  // Handle token expiration
  if (response.status === 401) {
    // Try to refresh the token
    const refreshResult = await refreshToken();
    
    if (refreshResult) {
      // Retry the original request with new token
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const retryResponse = await fetch(`${API_URL}${url}`, {
        ...config,
        headers,
      });
      
      return handleResponse(retryResponse);
    } else {
      // If refresh failed, redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }
  
  return handleResponse(response);
};

// Helper function to handle response and parse JSON
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    const error = data.message || response.statusText;
    return Promise.reject({ response: { data: data, status: response.status }, message: error });
  }
  
  return data;
};

// Function to refresh token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const token = localStorage.getItem('token');
  
  if (!refreshToken || !token) return false;
  
  try {
    const response = await fetch(`${API_URL}/account/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, refreshToken }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('tokenExpiration', data.tokenExpiration);
    
    return true;
  } catch (error) {
    return false;
  }
};

// Authentication Service
export const authService = {
  login: async (email, password) => {
    return fetchWithAuth('/account/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData) => {
    return fetchWithAuth('/account/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getCurrentUser: async () => {
    return fetchWithAuth('/users/me');
  }
};

// User Service
export const userService = {
  getUser: async (id) => {
    return fetchWithAuth(`/users/${id}`);
  },
  
  updateUser: async (id, userData) => {
    return fetchWithAuth(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  changePassword: async (oldPassword, newPassword) => {
    return fetchWithAuth('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }
};

// Make the entire API interface available
const api = {
  get: (url) => fetchWithAuth(url),
  post: (url, data) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => fetchWithAuth(url, { method: 'DELETE' }),
};

export default api;
