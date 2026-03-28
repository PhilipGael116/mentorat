import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  onRate?: (newRating: number) => void; // Optional callback for interaction
}

const StarRating = ({ rating, size = 16, showNumber = false, onRate }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((starIdx) => {
          // Calculation for partial fill: 100 for full, 0 for empty, or percentage between
          const fillPercent = Math.max(0, Math.min(100, (displayRating - (starIdx - 1)) * 100));
          
          return (
            <div
              key={starIdx}
              className={`relative ${onRate ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
              onMouseEnter={() => onRate && setHoverRating(starIdx)}
              onMouseLeave={() => onRate && setHoverRating(null)}
              onClick={() => onRate && onRate(starIdx)}
            >
              {/* Empty background star */}
              <Star size={size} className="text-gray-300" />
              {/* Filled star with clip effect */}
              <div
                className="absolute top-0 left-0 overflow-hidden h-full pointer-events-none"
                style={{ width: `${fillPercent}%` }}
              >
                <Star size={size} className="text-accent fill-accent" />
              </div>
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-secondary">
          {Number(displayRating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
