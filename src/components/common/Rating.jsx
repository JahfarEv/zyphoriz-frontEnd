import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ score = 4.5, reviewsCount, showCount = true, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="inline-flex items-center gap-1.5 bg-surface-container px-2 py-1 rounded-md text-primary font-semibold">
      <Star className={`${iconSize} fill-primary text-primary`} />
      <span className="text-xs">{score.toFixed(1)}</span>
      {showCount && reviewsCount && (
        <span className="text-xs text-outline font-normal">({reviewsCount})</span>
      )}
    </div>
  );
};
