
import React from "react";
import { getTypeClass } from "@/utils/typeUtils";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, className = "" }) => {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeClass(type)} ${className}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default TypeBadge;
