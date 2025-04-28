
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchMultiplePokemon } from "@/services/pokemonService";
import TypeBadge from "@/components/TypeBadge";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { POKEMON_TYPES } from "@/utils/typeUtils";
import TypeEffectiveness from "@/components/TypeEffectiveness";

const TypesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("fire"); // Default selected type
  
  // Fetch all pokemon (using a larger limit to get more variety for all types)
  const { data: pokemonListData } = useQuery({
    queryKey: ['allPokemonList'],
    queryFn: () => fetchPokemonList(500, 0), // Increased limit to 500 to ensure all types have representatives
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
      <div className="bg-gradient-to-r from-pokemon-light to-pokemon-dark p-6 rounded-lg mb-6 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-white">Pokémon Types</h1>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {POKEMON_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`transition-all duration-200 ${
                selectedType === type 
                  ? "scale-110 ring-2 ring-white" 
                  : "hover:scale-105"
              }`}
            >
              <TypeBadge type={type} className="text-sm md:text-base px-3 py-1" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 capitalize">{selectedType} Type</h2>
          <TypeEffectiveness type={selectedType} />
        </div>
        
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4 capitalize">{selectedType} Pokémon</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loadingPlaceholders}
            </div>
          ) : filteredPokemon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredPokemon.slice(0, 9).map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-500">No Pokémon found for this type.</p>
              <p className="text-sm text-gray-400 mt-2">Try selecting a different type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypesPage;
