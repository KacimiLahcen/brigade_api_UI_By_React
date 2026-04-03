import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // Redirect to plates after login
      navigate('/plates');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Welcome</h2>
      
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
            placeholder="9asuuimi@example.com" 
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
