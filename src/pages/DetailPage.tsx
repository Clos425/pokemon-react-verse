
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { 
  fetchPokemon, 
  fetchPokemonSpecies, 
  getEnglishDescription 
} from "@/services/pokemonService";
import TypeBadge from "@/components/TypeBadge";
import { 
  formatPokemonId, 
  formatHeight, 
  formatWeight, 
  formatStatName, 
  getStatColor 
} from "@/utils/typeUtils";
import { ArrowLeft } from "lucide-react";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch pokemon details
  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id || ''),
  });

  // Fetch pokemon species for description
  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => {
      if (pokemon) {
        return fetchPokemonSpecies(pokemon.id);
      }
      return null;
    },
    enabled: !!pokemon,
  });

  const description = getEnglishDescription(species);
  const isLoading = isLoadingPokemon || isLoadingSpecies;
  
  // Background gradient based on primary type
  const primaryType = pokemon?.types[0]?.type.name || 'normal';
  const bgClass = `bg-pokemon-${primaryType}`;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 animate-pulse">
        <div className="bg-gray-200 h-64 rounded-lg mb-6"></div>
        <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
        <div className="bg-gray-200 h-4 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 rounded mb-2"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Pokemon not found</h2>
        <Link to="/" className="text-blue-500 hover:underline flex items-center justify-center">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default || 
                   pokemon.sprites.other.home.front_default || 
                   pokemon.sprites.front_default;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className={`${bgClass} text-white pt-12 pb-24`}>
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="mr-1" size={16} /> Back
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map((typeInfo, index) => (
                  <TypeBadge 
                    key={index} 
                    type={typeInfo.type.name} 
                    className="text-sm md:text-base px-3 py-1"
                  />
                ))}
              </div>
              <p className="mt-2 text-lg font-mono">{formatPokemonId(pokemon.id)}</p>
            </div>
            <img 
              src={imageUrl} 
              alt={pokemon.name} 
              className="w-48 h-48 md:w-64 md:h-64 object-contain animate-float z-10"
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-12">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Details</h2>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{formatHeight(pokemon.height)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{formatWeight(pokemon.weight)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Abilities</p>
                    <div>
                      {pokemon.abilities.map((abilityInfo, index) => (
                        <p key={index} className="font-medium capitalize">
                          {abilityInfo.ability.name.replace('-', ' ')}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-2">Base Stats</h2>
              <div className="bg-gray-100 rounded-lg p-4">
                {pokemon.stats.map((statInfo, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 capitalize">
                        {formatStatName(statInfo.stat.name)}
                      </span>
                      <span className="text-sm font-medium">{statInfo.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getStatColor(statInfo.base_stat)}`} 
                        style={{ width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
