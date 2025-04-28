
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchPokemon } from '@/services/pokemonService';
import TypeEffectiveness from '@/components/TypeEffectiveness';
import { toast } from 'sonner';

const ComparePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemon1Query = searchParams.get('pokemon1') || '';
  const pokemon2Query = searchParams.get('pokemon2') || '';
  const navigate = useNavigate();

  const { data: pokemon1, isLoading: isLoading1 } = useQuery({
    queryKey: ['pokemon', pokemon1Query.toLowerCase()],
    queryFn: () => fetchPokemon(pokemon1Query.toLowerCase()),
    enabled: pokemon1Query.length > 0,
  });

  const { data: pokemon2, isLoading: isLoading2 } = useQuery({
    queryKey: ['pokemon', pokemon2Query.toLowerCase()],
    queryFn: () => fetchPokemon(pokemon2Query.toLowerCase()),
    enabled: pokemon2Query.length > 0,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search1 = formData.get('pokemon1')?.toString() || '';
    const search2 = formData.get('pokemon2')?.toString() || '';
    
    if (!search1 || !search2) {
      toast.error('Please enter both Pokémon names');
      return;
    }
    
    setSearchParams({ pokemon1: search1, pokemon2: search2 });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center text-gray-600 mb-4 hover:underline">
        <ArrowLeft className="mr-1" size={16} /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Compare Pokémon Types</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              name="pokemon1"
              placeholder="Enter first Pokémon"
              defaultValue={pokemon1Query}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              name="pokemon2"
              placeholder="Enter second Pokémon"
              defaultValue={pokemon2Query}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <Button type="submit">Compare</Button>
      </form>

      {(isLoading1 || isLoading2) && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading Pokémon data...</p>
        </div>
      )}

      {pokemon1 && pokemon2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={pokemon1.sprites.other["official-artwork"].front_default || pokemon1.sprites.front_default}
                alt={pokemon1.name}
                className="w-24 h-24 object-contain"
              />
              <h2 className="text-2xl font-bold capitalize">{pokemon1.name}</h2>
            </div>
            {pokemon1.types.map((type) => (
              <TypeEffectiveness key={type.type.name} type={type.type.name} />
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={pokemon2.sprites.other["official-artwork"].front_default || pokemon2.sprites.front_default}
                alt={pokemon2.name}
                className="w-24 h-24 object-contain"
              />
              <h2 className="text-2xl font-bold capitalize">{pokemon2.name}</h2>
            </div>
            {pokemon2.types.map((type) => (
              <TypeEffectiveness key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
