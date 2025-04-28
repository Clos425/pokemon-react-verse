
import { toast } from "@/components/ui/sonner";

// Pokemon types
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  species: {
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}

// Base URL for Pokemon API
const API_BASE_URL = "https://pokeapi.co/api/v2";

// Fetch Pokemon list with pagination
export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonList> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    toast.error("Failed to load Pokémon list");
    return { count: 0, next: null, previous: null, results: [] };
  }
};

// Fetch detailed Pokemon data by ID or name
export const fetchPokemon = async (idOrName: number | string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon ${idOrName}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokémon ${idOrName}:`, error);
    toast.error(`Failed to load Pokémon details for ${idOrName}`);
    return null;
  }
};

// Fetch Pokemon species information for descriptions
export const fetchPokemonSpecies = async (id: number): Promise<PokemonSpecies | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon-species/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon species ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokémon species ${id}:`, error);
    return null;
  }
};

// Fetch multiple Pokemon details in parallel
export const fetchMultiplePokemon = async (urls: string[]): Promise<Pokemon[]> => {
  try {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    return await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching multiple Pokémon:", error);
    toast.error("Failed to load some Pokémon details");
    return [];
  }
};

// Get color for Pokemon type
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
    unknown: "#68A090",
    shadow: "#4A4A4A",
  };
  
  return typeColors[type.toLowerCase()] || "#777777";
};

// Get the English description from species data
export const getEnglishDescription = (species: PokemonSpecies | null): string => {
  if (!species) return "No description available";
  
  const englishEntry = species.flavor_text_entries.find(
    entry => entry.language.name === "en"
  );
  
  return englishEntry 
    ? englishEntry.flavor_text.replace(/\f/g, ' ') 
    : "No English description available";
};
