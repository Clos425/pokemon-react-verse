
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchMultiplePokemon, Pokemon } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import TypeFilter from "@/components/TypeFilter";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const LIMIT = 20;

  // Fetch pokemon list
  const { data: pokemonListData, isLoading: isLoadingList } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => fetchPokemonList(LIMIT, offset),
  });

  // Fetch detailed pokemon data
  const { data: detailedPokemonData, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails', offset],
    queryFn: () => {
      if (!pokemonListData || !pokemonListData.results.length) return Promise.resolve([]);
      return fetchMultiplePokemon(pokemonListData.results.map(p => p.url));
    },
    enabled: !!pokemonListData && pokemonListData.results.length > 0,
  });

  // Update all pokemon when detailed data is fetched
  useEffect(() => {
    if (detailedPokemonData && detailedPokemonData.length > 0) {
      setAllPokemon(prevPokemon => {
        // Merge new pokemon with existing ones, avoiding duplicates
        const newPokemonMap = new Map([
          ...prevPokemon.map(p => [p.id, p]),
          ...detailedPokemonData.map(p => [p.id, p])
        ]);
        return Array.from(newPokemonMap.values());
      });
    }
  }, [detailedPokemonData]);

  // Filter pokemon by type
  const filteredPokemon = selectedType
    ? allPokemon.filter(pokemon => 
        pokemon.types.some(typeInfo => typeInfo.type.name === selectedType)
      )
    : allPokemon;

  // Load more pokemon
  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + LIMIT);
  };

  // Loading placeholders
  const loadingPlaceholders = Array(LIMIT).fill(0).map((_, index) => (
    <PokemonCardSkeleton key={`skeleton-${index}`} />
  ));

  const isLoading = isLoadingList || isLoadingDetails;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Pokémon Collection</h1>
      
      <TypeFilter selectedType={selectedType} onTypeSelect={setSelectedType} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {isLoading && loadingPlaceholders}
      </div>
      
      {!selectedType && !isLoading && pokemonListData?.next && (
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleLoadMore} 
            variant="outline"
            className="bg-pokedex-red text-white hover:bg-pokedex-dark"
          >
            Load More
          </Button>
        </div>
      )}
      
      {filteredPokemon.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No Pokémon found. Try changing the filter.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
