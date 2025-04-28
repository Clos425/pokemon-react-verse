
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Dragon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear the search input after searching
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pokedex-red to-pokedex-dark shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center text-xl font-bold text-white">
            <Dragon className="mr-2 h-6 w-6" />
            Pokédex
          </Link>
          
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1">
            <Input 
              type="text" 
              placeholder="Search Pokémon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent text-white placeholder-white/80 focus:outline-none focus:ring-0 w-40 lg:w-60"
            />
            <button type="submit" className="p-1 ml-1">
              <Search className="h-5 w-5 text-white" />
            </button>
          </form>
          
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/search" className="text-white hover:text-gray-200 px-3 py-2">
                  Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/types" className="text-white hover:text-gray-200 px-3 py-2">
                  Types
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/compare" className="text-white hover:text-gray-200 px-3 py-2">
                  Compare
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile menu links */}
          <div className="flex space-x-4 md:hidden">
            <Link to="/search" className="text-white hover:text-gray-200">Search</Link>
            <Link to="/types" className="text-white hover:text-gray-200">Types</Link>
            <Link to="/compare" className="text-white hover:text-gray-200">Compare</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
