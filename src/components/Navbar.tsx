
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <header className="bg-pokedex-red text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-white rounded-full p-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-pokedex-red rounded-full border-2 border-white animate-pulse-light"></div>
            </span>
            <span className="text-2xl font-bold">Pokédex</span>
          </Link>
          
          <form onSubmit={handleSearch} className="relative hidden md:block max-w-md flex-grow mx-4">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full py-1.5 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-pokedex-dark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
          
          <nav className="flex items-center space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/types" className="hover:underline">Types</Link>
          </nav>
        </div>
        
        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="relative mt-2 md:hidden">
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="w-full py-1.5 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-pokedex-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
