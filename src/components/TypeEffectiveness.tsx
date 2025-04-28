import React from 'react';
import TypeBadge from './TypeBadge';
import { getTypeEffectiveness } from '@/utils/typeEffectiveness';
import { SearchCheck } from 'lucide-react';

interface TypeEffectivenessProps {
  type: string;
}

const TypeEffectiveness: React.FC<TypeEffectivenessProps> = ({ type }) => {
  const { strongAgainst, weakAgainst } = getTypeEffectiveness(type);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <SearchCheck className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Type Effectiveness</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Strong against:</p>
          <div className="flex flex-wrap gap-2">
            {strongAgainst.length > 0 ? (
              strongAgainst.map((type) => (
                <TypeBadge key={type} type={type} />
              ))
            ) : (
              <span className="text-sm text-gray-500">No advantages</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Weak against:</p>
          <div className="flex flex-wrap gap-2">
            {weakAgainst.length > 0 ? (
              weakAgainst.map((type) => (
                <TypeBadge key={type} type={type} />
              ))
            ) : (
              <span className="text-sm text-gray-500">No weaknesses</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeEffectiveness;
