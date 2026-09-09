import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ initialQuery = '', initialLocation = '', className = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (location) params.append('loc', location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`max-w-4xl mx-auto bg-surface p-2 rounded-2xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant/30 flex flex-col md:flex-row gap-2 transition-all hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(26,20,107,0.2)] ${className}`}
    >
      <div className="flex-1 flex items-center bg-surface px-4 py-3 rounded-xl">
        <Search className="w-5 h-5 text-outline mr-3 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-sans text-sm md:text-base text-on-surface placeholder:text-outline p-0"
        />
      </div>
      <div className="hidden md:block w-px bg-outline-variant/50 my-2"></div>
      <div className="flex-1 flex items-center bg-surface px-4 py-3 rounded-xl border-t border-outline-variant/30 md:border-t-0">
        <MapPin className="w-5 h-5 text-outline mr-3 flex-shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Malappuram)"
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-sans text-sm md:text-base text-on-surface placeholder:text-outline p-0"
        />
      </div>
      <button
        type="submit"
        className="bg-primary-container text-on-primary font-label-md text-sm font-semibold px-8 py-3.5 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2 flex-shrink-0"
      >
        <Search className="w-4 h-4 md:hidden" />
        Search
      </button>
    </form>
  );
};
