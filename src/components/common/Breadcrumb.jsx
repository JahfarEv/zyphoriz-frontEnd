import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-outline" />
          {item.link ? (
            <Link to={item.link} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-on-surface">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
