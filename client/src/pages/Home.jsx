import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const bgImage = "https://source.unsplash.com/random/1600x900/?architecture,building";


const Home = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/properties")
      .then(response => setProperties(response.data))
      .catch(error => console.error("Error fetching properties:", error));
  }, []);

  const filteredProperties = properties.filter(property =>
    property.location.toLowerCase().includes(search.toLowerCase()) &&
    (price ? property.price <= price : true)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Background Section */}
      <div className="relative h-96 w-full flex flex-col justify-center items-center text-white text-center bg-gradient-to-br from-slate-200 via-slate-500 to-slate-800">



        {/* Transparent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-60"></div>


        {/* Website Name & Quote */}
        <div className="relative z-10 px-4 py-2 rounded-lg">
          <h1 className="text-5xl font-bold">NestHunt</h1>
          <p className="text-lg italic bg-gray-0 bg-opacity-60 px-4 py-2 rounded-md">
            "Find your dream home with ease"
          </p>
        </div>


        {/* Search and Filters at Bottom */}
        <div className="absolute bottom-4 w-full px-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Property Listings */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`} className="group">
              <div className="border rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 p-4 bg-white overflow-hidden border-gray-300">
                <img
                  src={property.image || "https://via.placeholder.com/300"}
                  alt={property.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-3 group-hover:text-blue-500 transition">{property.name}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-green-600 font-semibold text-lg">₹{property.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
