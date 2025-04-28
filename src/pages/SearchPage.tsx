
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, Pokemon } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { ArrowLeft } from "lucide-react";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
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

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center text-gray-600 mb-4 hover:underline">
        <ArrowLeft className="mr-1" size={16} /> Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      
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
  );
};

export default SearchPage;
