import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.author}
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
          />
          <div>
            <h4 className="font-headline text-sm font-bold text-on-surface">{review.author}</h4>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span>{review.date}</span>
              {review.verifiedPurchase && (
                <span className="inline-flex items-center gap-0.5 text-secondary font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> Verified Customer
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 bg-surface-container px-2 py-0.5 rounded text-xs font-semibold text-primary">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span>{review.rating}.0</span>
        </div>
      </div>

      <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};
