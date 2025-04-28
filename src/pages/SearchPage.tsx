
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, Pokemon } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch pokemon by name or ID
  const { data, isLoading, isError } = useQuery({
    queryKey: ['searchPokemon', query],
    queryFn: () => fetchPokemon(query.toLowerCase()),
    retry: false,
    enabled: query.length > 0,
  });

  useEffect(() => {
    // Update search results when data changes
    if (data) {
      setSearchResult(data);
      setError(null);
    } else if (isError) {
      setSearchResult(null);
      setError(`No Pokémon found matching "${query}"`);
    }
  }, [data, isError, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput.trim() });
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-pokedex-red to-pokedex-dark py-8 px-4 mb-8">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="mr-1" size={16} /> Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-6">
            {query ? `Search Results for "${query}"` : "Search for a Pokémon"}
          </h1>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter a Pokémon name or ID"
                className="pl-10 bg-white/10 text-white placeholder:text-white/70 border-white/20"
              />
            </div>
            <Button type="submit" variant="secondary" className="bg-white text-pokedex-dark hover:bg-white/90">Search</Button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PokemonCardSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">{error}</p>
            <p className="mt-4 text-gray-500">Try searching for a different Pokémon name or ID</p>
          </div>
        ) : searchResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PokemonCard pokemon={searchResult} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
