
import React from "react";
import { POKEMON_TYPES } from "@/utils/typeUtils";
import TypeBadge from "./TypeBadge";

interface TypeFilterProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Filter by Type</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTypeSelect(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedType === null
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={selectedType === type ? "scale-110 transform transition-transform" : ""}
          >
            <TypeBadge type={type} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
