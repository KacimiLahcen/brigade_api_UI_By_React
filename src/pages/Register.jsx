import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Create Account</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="John Doe" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="johndoe@example.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input 
            type="password" 
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cfc00] focus:border-transparent outline-none transition"
            placeholder="••••••••" 
          />
        </div>
        <button 
          type="button" 
          className="w-full py-3 bg-[#7cfc00] text-gray-950 font-black rounded-lg hover:bg-[#6be000] transition shadow-lg"
        >
          Register
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
