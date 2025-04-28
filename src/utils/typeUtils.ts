
// Utility functions for handling Pokémon types

// Pokemon types constant
export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
];

// Get badge class based on Pokémon type
export const getTypeClass = (type: string): string => {
  const typeMap: Record<string, string> = {
    normal: 'bg-pokemon-normal text-white',
    fire: 'bg-pokemon-fire text-white',
    water: 'bg-pokemon-water text-white',
    electric: 'bg-pokemon-electric text-black',
    grass: 'bg-pokemon-grass text-white',
    ice: 'bg-pokemon-ice text-black',
    fighting: 'bg-pokemon-fighting text-white',
    poison: 'bg-pokemon-poison text-white',
    ground: 'bg-pokemon-ground text-black',
    flying: 'bg-pokemon-flying text-white',
    psychic: 'bg-pokemon-psychic text-white',
    bug: 'bg-pokemon-bug text-white',
    rock: 'bg-pokemon-rock text-white',
    ghost: 'bg-pokemon-ghost text-white',
    dragon: 'bg-pokemon-dragon text-white',
    dark: 'bg-pokemon-dark text-white',
    steel: 'bg-pokemon-steel text-black',
    fairy: 'bg-pokemon-fairy text-white'
  };

  return typeMap[type.toLowerCase()] || 'bg-gray-400 text-white';
};

// Format ID to display with leading zeros (e.g., #001)
export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, '0')}`;
};

// Format height from decimeters to meters
export const formatHeight = (height: number): string => {
  const meters = height / 10;
  return `${meters.toFixed(1)} m`;
};

// Format weight from hectograms to kilograms
export const formatWeight = (weight: number): string => {
  const kg = weight / 10;
  return `${kg.toFixed(1)} kg`;
};

// Format stat name to be more readable
export const formatStatName = (statName: string): string => {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  
  return statMap[statName] || statName.charAt(0).toUpperCase() + statName.slice(1).replace('-', ' ');
};

// Get color based on stat value for progress bars
export const getStatColor = (value: number): string => {
  if (value < 50) return 'bg-red-500';
  if (value < 75) return 'bg-yellow-500';
  if (value < 100) return 'bg-blue-500';
  return 'bg-green-500';
};
