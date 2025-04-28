
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">Pokédex</Link>
          <div className="flex space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-800">Search</Link>
            <Link to="/types" className="text-gray-600 hover:text-gray-800">Types</Link>
            <Link to="/compare" className="text-gray-600 hover:text-gray-800">Compare</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
