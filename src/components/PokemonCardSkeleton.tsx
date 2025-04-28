
import React from "react";

const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-200 p-4 flex justify-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-5 bg-gray-300 rounded w-12"></div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;
