
import React from "react";
import { Pokemon } from "@/services/pokemonService";
import { formatPokemonId } from "@/utils/typeUtils";
import TypeBadge from "@/components/TypeBadge";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const imageUrl = pokemon.sprites.other["official-artwork"].front_default || 
                  pokemon.sprites.other.home.front_default || 
                  pokemon.sprites.front_default;

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="bg-gray-100 p-4 flex justify-center">
          <img 
            src={imageUrl} 
            alt={pokemon.name}
            className="w-32 h-32 object-contain animate-float"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
            <span className="text-gray-500 font-mono">
              {formatPokemonId(pokemon.id)}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((typeInfo, index) => (
              <TypeBadge key={index} type={typeInfo.type.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
