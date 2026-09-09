import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, ChevronRight } from 'lucide-react';

export const BusinessCard = ({ business, layout = 'grid' }) => {
  // Support both old /business/:id and new /:slug routes
  const profileUrl = `/${business.slug || business.id}`;

  if (layout === 'list') {
    return (
      <div className="bg-surface rounded-2xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] overflow-hidden border border-outline-variant/20 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col sm:flex-row group">
        <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-surface-variant overflow-hidden">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <Link to={profileUrl} className="hover:text-primary transition-colors">
                <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-1">
                  {business.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-primary font-semibold text-xs">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span>{business.rating}</span>
                <span className="text-outline font-normal">({business.reviewCount})</span>
              </div>
            </div>
            <p className="font-sans text-xs text-on-surface-variant mb-2">
              {business.category}
            </p>
            <p className="font-sans text-xs text-outline line-clamp-2 mb-3">
              {business.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-outline-variant/20">
            <span className="font-sans text-xs text-outline flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {business.distance || business.location}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${business.phone}`}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <Link
                to={profileUrl}
                className="px-4 py-1.5 bg-primary-container text-on-primary rounded-lg text-xs font-semibold hover:bg-primary transition-colors inline-flex items-center gap-1"
              >
                View Details <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={profileUrl}
      className="bg-surface rounded-[24px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden border border-outline-variant/20 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col group cursor-pointer"
    >
      <div className="relative w-full aspect-[16/9] bg-surface-variant overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="font-headline text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
              {business.name}
            </h3>
            <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-primary font-semibold text-xs flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span>{business.rating}</span>
            </div>
          </div>
          <p className="font-sans text-xs text-on-surface-variant mb-3 flex items-center gap-1">
            {business.category}
          </p>
        </div>
        <p className="font-sans text-xs text-outline flex items-center gap-1 mt-auto pt-2 border-t border-outline-variant/20">
          <MapPin className="w-3.5 h-3.5" />
          {business.distance || business.location}
        </p>
      </div>
    </Link>
  );
};
