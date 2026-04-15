import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 1. Zod Schema: validation rules for the login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Fetch the login function from your Auth Context

  // 2. Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // 3. Logic to handle Authentication
  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Send the email and password to the login function in the Auth Context
      await login(data.email, data.password);
      
      // Redirect to the plates page after successful login
      navigate('/plates');
    } catch (err) {
      console.error(err);
      // Display server error (e.g., invalid credentials)
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Decorative Light Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7cfc00]/10 rounded-full blur-3xl"></div>

        <h2 className="text-4xl font-black text-white mb-2 text-center uppercase tracking-tighter italic">
          Welcome <span className="text-[#7cfc00]">Back</span>
        </h2>
        <p className="text-gray-500 text-center mb-10 text-sm uppercase tracking-widest font-medium">Access your Brigade account</p>

        {/* Global Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-xs font-bold uppercase tracking-tight text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Email Address</label>
            <input 
              {...register("email")}
              type="email"
              placeholder="9asuuimi@example.com"
              className={`w-full bg-gray-950 border ${errors.email ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Password</label>
            <input 
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full bg-gray-950 border ${errors.password ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-[#7cfc00] transition-all shadow-xl shadow-white/5 disabled:bg-gray-800 disabled:text-gray-600 active:scale-95"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-500 text-center mt-8 text-[10px] uppercase font-bold tracking-widest">
          New to the Brigade? <Link to="/register" className="text-[#7cfc00] hover:underline ml-1">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;