import { set } from "mongoose";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../style/Signup.css';

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setLoading(false);
      setError(null);
      navigate("/signin")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id="username" className='border p-3 rounded-lg' onChange={handleChange} value={formData.username} />
        <input type="email" placeholder='Email' id="email" className='border p-3 rounded-lg' onChange={handleChange} value={formData.email} />
        <input type="password" placeholder='Password' id="password" className='border p-3 rounded-lg' onChange={handleChange} value={formData.password} />
        <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/signin"}/>
        <span className='text-blue-700'><Link to="/signin">Sign In</Link></span>
      </div>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
};

export default Signup;
