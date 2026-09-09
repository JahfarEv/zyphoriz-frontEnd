import React from 'react';

export const LoadingState = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-surface rounded-3xl border border-outline-variant/20 overflow-hidden shadow-sm animate-pulse">
          <div className="w-full aspect-[16/9] bg-surface-variant"></div>
          <div className="p-5 space-y-3">
            <div className="h-5 bg-outline-variant/30 rounded w-3/4"></div>
            <div className="h-4 bg-outline-variant/20 rounded w-1/2"></div>
            <div className="h-4 bg-outline-variant/20 rounded w-1/3 mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
