import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', form);
      alert("Registered Successfully!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || "Register Failed!!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative flex items-center justify-center bg-[url('/bg.jpg')]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-opacity-70 backdrop-blur-sm"></div>

      {/* Register Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-sm animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          Create Account ✨
        </h2>

        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          type="text"
          placeholder="Enter Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-pink-600 transition-all duration-300 hover:scale-105"
          type="submit"
        >
          Register
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-pink-300 underline hover:text-white"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
