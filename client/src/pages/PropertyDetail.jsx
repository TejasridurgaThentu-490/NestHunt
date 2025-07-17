import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/properties/${id}`)
        .then(response => setProperty(response.data))
        .catch(error => console.error("Error fetching property:", error));
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {property ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Property Image */}
          <img
            src={property.image || "https://via.placeholder.com/600"}
            alt={property.name}
            className="w-full h-80 object-cover rounded-md mb-4"
          />

          {/* Property Details */}
          <h2 className="text-3xl font-bold">{property.name}</h2>
          <p className="text-gray-600">{property.location}</p>
          <p className="text-green-600 text-2xl font-semibold">₹{property.price}</p>

          {/* Property Description */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Description:</h3>
            <p className="text-gray-700 leading-relaxed">{property.description || "No description available."}</p>
          </div>

          {/* Enquire & Contact Buttons */}
          <div className="mt-6 flex gap-4">
            <a 
              href="mailto:vhvardhan.naidu@gmail.com?subject=Enquiry%20About%20Property&body=Hello,%20I%20am%20interested%20in%20this%20property.%20Please%20provide%20more%20details."
              className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Enquire
            </a>
            <a 
              href="mailto:vhvardhan.naidu@gmail.com"
              className="bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-700 transition"
            >
              Contact
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg">Loading...</div>
      )}
    </div>
  );
};

export default PropertyDetail;
