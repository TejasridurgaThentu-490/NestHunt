import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import "./../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?location=${searchTerm}`);
    }
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Nest</span>
            <span className="text-slate-700">Hunt</span>
          </h1>
        </Link>
        <form onSubmit={handleSearch} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/"><li className="hidden sm:inline text-slate-700 hover:underline">Home</li></Link>
          <Link to="/about"><li className="hidden sm:inline text-slate-700 hover:underline">About</li></Link>
          <Link to="/profile">
            {currentUser && currentUser.avatar ? (
              <img src={currentUser.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
