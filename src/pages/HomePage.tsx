
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchMultiplePokemon, Pokemon } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import TypeFilter from "@/components/TypeFilter";

const HomePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  
  const { data: pokemonListData, isLoading: isLoadingList } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => fetchPokemonList(151, 0), // First generation (151 Pokémon)
  });
  
  const { data: detailedPokemon, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails'],
    queryFn: () => {
      if (!pokemonListData?.results) return Promise.resolve([]);
      return fetchMultiplePokemon(pokemonListData.results.map(p => p.url));
    },
    enabled: !!pokemonListData?.results,
  });
  
  useEffect(() => {
    if (detailedPokemon) {
      let filteredPokemon = [...detailedPokemon];
      
      if (selectedType) {
        filteredPokemon = detailedPokemon.filter((pokemon) =>
          pokemon.types.some((t) => t.type.name === selectedType)
        );
      }
      
      setDisplayedPokemon(filteredPokemon);
    }
  }, [detailedPokemon, selectedType]);
  
  const isLoading = isLoadingList || isLoadingDetails;
  
  // Create loading placeholders for initial load
  const loadingPlaceholders = Array(12).fill(0).map((_, index) => (
    <PokemonCardSkeleton key={`skeleton-${index}`} />
  ));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pokemon-dragon to-pokemon-dark p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">Pokémon React-Verse</h1>
        <p className="text-white/90 mb-4">Explore the world of Pokémon with this interactive Pokédex</p>
        
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/search" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
          >
            Search Pokémon
          </Link>
          <Link 
            to="/types" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
          >
            Explore Types
          </Link>
          <Link 
            to="/compare" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
          >
            Compare Pokémon
          </Link>
        </div>
      </div>
      
      <TypeFilter selectedType={selectedType} onTypeSelect={setSelectedType} />
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loadingPlaceholders}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedPokemon.slice(0, loadMore ? undefined : 12).map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          
          {!loadMore && displayedPokemon.length > 12 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setLoadMore(true)}
                className="bg-pokedex-red hover:bg-pokedex-dark text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Load More
              </button>
            </div>
          )}
          
          {displayedPokemon.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No Pokémon found for this type.</p>
              <p className="mt-4">
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-pokedex-red hover:underline"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
