import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/register', { 
        name, 
        email, 
        password,
        password_confirmation: passwordConfirmation,
        role: 'client'
      });

      // Support different Laravel token formats ('token' or 'access_token')
      const tokenObj = response.data?.token || response.data?.access_token || response.data?.plainTextToken;
      
      // If the API sends a token, save it. Otherwise (if Sanctum cookies are used), save a dummy flag to update Navbar
      if (tokenObj) {
        localStorage.setItem('token', tokenObj);
      } else {
        localStorage.setItem('token', 'authenticated');
      }

      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Force reload or redirect to profile to update Navbar state
      window.location.href = '/profile';

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="John Doe" 
            required
          />
        </div>
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
        <div>
          <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
          <input 
            type="password" 
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="••••••••" 
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 font-black rounded-lg transition shadow-lg ${loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-[#7cfc00] text-gray-950 hover:bg-[#6be000]'}`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
