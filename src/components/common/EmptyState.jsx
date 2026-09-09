import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = "No results found",
  description = "We couldn't find any business matching your search criteria. Try adjusting your filters or search terms.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-2xl my-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="font-sans text-sm text-on-surface-variant max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
