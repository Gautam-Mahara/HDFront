// AdventureCard.tsx
import React from "react";
import type { Adventure } from "../types/adventure";

interface Props {
  adventure: Adventure;
  onViewDetails: () => void;
}

const AdventureCard: React.FC<Props> = ({ adventure, onViewDetails }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={adventure.image}
          alt={adventure.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{adventure.title}</h3>
          <p className="text-sm text-gray-600 font-medium">{adventure.location}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Curated small-group experience. Certified guide. Safety first with gear included.
        </p>

        {/* Price and CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-lg font-bold text-blue-600">₹{adventure.price}</span>
          </div>
          <button
            onClick={onViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdventureCard;