
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="w-24 h-24 bg-pokedex-light rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-pokedex-red rounded-full"></div>
        </div>
        <h1 className="text-6xl font-bold text-pokedex-red mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This Pokémon couldn't be found</p>
        <Link 
          to="/" 
          className="bg-pokedex-red text-white px-6 py-2 rounded-full inline-block hover:bg-pokedex-dark transition-colors"
        >
          Return to Pokédex
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
