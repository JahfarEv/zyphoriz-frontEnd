import React from 'react';
import { BusinessCard } from './BusinessCard';
import { EmptyState } from '../common/EmptyState';

export const BusinessGrid = ({ businesses = [], layout = 'grid', emptyStateProps }) => {
  if (!businesses || businesses.length === 0) {
    return <EmptyState {...emptyStateProps} />;
  }

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} layout="grid" />
      ))}
    </div>
  );
};
