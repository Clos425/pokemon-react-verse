
type TypeEffectiveness = {
  [key: string]: {
    strongAgainst: string[];
    weakAgainst: string[];
  };
};

export const typeEffectiveness: TypeEffectiveness = {
  normal: {
    strongAgainst: [],
    weakAgainst: ['fighting']
  },
  fire: {
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    weakAgainst: ['water', 'ground', 'rock']
  },
  water: {
    strongAgainst: ['fire', 'ground', 'rock'],
    weakAgainst: ['electric', 'grass']
  },
  electric: {
    strongAgainst: ['water', 'flying'],
    weakAgainst: ['ground']
  },
  grass: {
    strongAgainst: ['water', 'ground', 'rock'],
    weakAgainst: ['fire', 'ice', 'poison', 'flying', 'bug']
  },
  ice: {
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    weakAgainst: ['fire', 'fighting', 'rock', 'steel']
  },
  fighting: {
    strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
    weakAgainst: ['flying', 'psychic', 'fairy']
  },
  poison: {
    strongAgainst: ['grass', 'fairy'],
    weakAgainst: ['ground', 'psychic']
  },
  ground: {
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    weakAgainst: ['water', 'grass', 'ice']
  },
  flying: {
    strongAgainst: ['grass', 'fighting', 'bug'],
    weakAgainst: ['electric', 'ice', 'rock']
  },
  psychic: {
    strongAgainst: ['fighting', 'poison'],
    weakAgainst: ['bug', 'ghost', 'dark']
  },
  bug: {
    strongAgainst: ['grass', 'psychic', 'dark'],
    weakAgainst: ['fire', 'flying', 'rock']
  },
  rock: {
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    weakAgainst: ['water', 'grass', 'fighting', 'ground', 'steel']
  },
  ghost: {
    strongAgainst: ['psychic', 'ghost'],
    weakAgainst: ['ghost', 'dark']
  },
  dragon: {
    strongAgainst: ['dragon'],
    weakAgainst: ['ice', 'dragon', 'fairy']
  },
  dark: {
    strongAgainst: ['psychic', 'ghost'],
    weakAgainst: ['fighting', 'bug', 'fairy']
  },
  steel: {
    strongAgainst: ['ice', 'rock', 'fairy'],
    weakAgainst: ['fire', 'fighting', 'ground']
  },
  fairy: {
    strongAgainst: ['fighting', 'dragon', 'dark'],
    weakAgainst: ['poison', 'steel']
  }
};

export const getTypeEffectiveness = (type: string) => {
  return typeEffectiveness[type.toLowerCase()] || {
    strongAgainst: [],
    weakAgainst: []
  };
};
