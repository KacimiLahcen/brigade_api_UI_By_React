import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';


// 1. Zod Schema: validation rules for the registration form
const registerSchema = z.object({

  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});


const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  // 3. Logic to store data in DB (Linking with Laravel)
  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // make API call to Laravel backend to register the user
      const response = await api.post('/register', {
        ...data,
        role: 'client'
      });

      // handle the token 
      const tokenObj = response.data?.token || response.data?.access_token || response.data?.plainTextToken;

      if (tokenObj) {
        localStorage.setItem('token', tokenObj);
      } else {
        localStorage.setItem('token', 'authenticated');
      }

      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // redirect to profile and update application state
      window.location.href = '/profile';

    } catch (err) {
      console.error(err);
      // Display error message from backend 
      setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };







  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 w-full max-w-md shadow-2xl relative overflow-hidden">

        {/* Decorative Element */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#7cfc00]/5 rounded-full blur-3xl"></div>

        <h2 className="text-4xl font-black text-white mb-2 text-center uppercase tracking-tighter italic">
          Create <span className="text-[#7cfc00]">Account</span>
        </h2> 
        <p className="text-gray-500 text-center mb-8 text-sm uppercase tracking-widest">Join RESTO BRIGADE</p>

        {/* Global Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-xs font-bold uppercase tracking-tight">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Full Name</label>
            <input
              {...register("name")}
              placeholder="e.g. Lahcen"
              className={`w-full bg-gray-950 border ${errors.name ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Email Address</label>
            <input
              {...register("email")}
              placeholder="lahcen@example.com"
              className={`w-full bg-gray-950 border ${errors.email ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full bg-gray-950 border ${errors.password ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-400 text-[10px] font-black uppercase ml-1 mb-2 block tracking-[0.2em]">Confirm Password</label>
            <input
              type="password"
              {...register("password_confirmation")}
              placeholder="••••••••"
              className={`w-full bg-gray-950 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-800'} p-4 rounded-2xl text-white focus:border-[#7cfc00] outline-none transition-all placeholder:text-gray-700`}
            />
            {errors.password_confirmation && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.password_confirmation.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7cfc00] text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-[#6be000] transition-all shadow-xl shadow-[#7cfc00]/10 disabled:bg-gray-800 disabled:text-gray-600 active:scale-95"
          >
            {loading ? 'Processing...' : 'Register Now'}
          </button>
        </form>

        <p className="text-gray-500 text-center mt-8 text-[10px] uppercase font-bold tracking-widest">
          Already a member? <Link to="/login" className="text-[#7cfc00] hover:underline ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;