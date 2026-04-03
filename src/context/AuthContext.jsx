import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Fetch user info when the app loads or token changes 
  // (to get a fresh user state from the DB)
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await api.get('/me');
          const userData = data.data || data; // handle json wrapper if present
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Failed to fetch user', error);
          if (error.response?.status === 401) {
             // If token is invalid, log out
             setToken(null);
             setUser(null);
             localStorage.removeItem('token');
             localStorage.removeItem('user');
          }
        }
      }
    };
    
    fetchUser();
  }, [token]);

  async function login(email, password) {
    const { data } = await api.post('/login', { email, password });
    
    // Support different formats based on backend
    const receivedToken = data.token || data.access_token || data.plainTextToken;
    
    setToken(receivedToken);
    
    if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    if (receivedToken) {
        localStorage.setItem('token', receivedToken);
    } else {
        localStorage.setItem('token', 'authenticated'); // Fallback if cookies are used
    }
  }

  async function logout() {
    try {
      if (token && token !== 'authenticated') {
         await api.post('/logout');
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);