import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("location") || "";
  const maxPrice = searchParams.get("price") || "";

  useEffect(() => {
    axios.get(`http://localhost:3000/api/properties?location=${searchQuery}`)
      .then(response => setProperties(response.data))
      .catch(error => console.error("Error fetching properties:", error));
  }, [searchQuery]);

  const filteredProperties = properties.filter(property =>
    (searchQuery ? property.location.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (maxPrice ? property.price <= maxPrice : true)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {searchQuery && <h2 className="text-2xl font-semibold mb-6 text-blue-600">Results for "{searchQuery}"</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`} className="group">
              <div className="border rounded-lg shadow-md hover:shadow-xl transition p-4 bg-white">
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

export default SearchResults;
