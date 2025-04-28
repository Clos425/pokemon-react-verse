
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchMultiplePokemon } from "@/services/pokemonService";
import TypeBadge from "@/components/TypeBadge";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { POKEMON_TYPES } from "@/utils/typeUtils";

const TypesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("fire"); // Default selected type
  
  // Fetch all pokemon (larger limit to get more for filtering)
  const { data: pokemonListData } = useQuery({
    queryKey: ['allPokemonList'],
    queryFn: () => fetchPokemonList(100, 0),
  });

  // Fetch detailed pokemon data
  const { data: detailedPokemonData, isLoading } = useQuery({
    queryKey: ['allPokemonDetails'],
    queryFn: () => {
      if (!pokemonListData || !pokemonListData.results.length) return Promise.resolve([]);
      return fetchMultiplePokemon(pokemonListData.results.map(p => p.url));
    },
    enabled: !!pokemonListData && pokemonListData.results.length > 0,
  });
  
  // Filter pokemon by the selected type
  const filteredPokemon = detailedPokemonData?.filter(pokemon => 
    pokemon.types.some(typeInfo => typeInfo.type.name === selectedType)
  ) || [];

  // Loading placeholders
  const loadingPlaceholders = Array(8).fill(0).map((_, index) => (
    <PokemonCardSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Pokémon Types</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`transition-all duration-200 ${selectedType === type ? "scale-110 ring-2 ring-gray-400" : ""}`}
          >
            <TypeBadge type={type} className="text-sm md:text-base px-3 py-1" />
          </button>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mb-4 capitalize">{selectedType} Pokémon</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? loadingPlaceholders : (
          filteredPokemon.length > 0 ? (
            filteredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">No Pokémon found for this type.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TypesPage;
