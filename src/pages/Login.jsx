import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      
      // Support different Laravel token formats ('token' or 'access_token')
      const token = response.data?.token || response.data?.access_token || response.data?.plainTextToken;
      
      // If the API sends a token, save it. Otherwise (if Sanctum cookies are used), save a dummy flag to update Navbar
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.setItem('token', 'authenticated');
      }

      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Redirect to profile and update Navbar
      window.location.href = '/profile'; 

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Welcome Back</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="johndoe@example.com" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="••••••••" 
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 font-bold rounded-lg transition shadow-lg ${loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-gray-950 text-[#7cfc00] hover:bg-gray-800'}`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
