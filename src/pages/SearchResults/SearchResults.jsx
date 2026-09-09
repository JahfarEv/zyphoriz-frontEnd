import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, MapPin, Search } from 'lucide-react';
import { BusinessGrid } from '../../components/business/BusinessGrid';
import { Button } from '../../components/common/Button';
import { Breadcrumb } from '../../components/common/Breadcrumb';

import { categories } from '../../data/categories';
import { getAllBusinesses } from '../../data/mockBusinesses';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('cat') || '';
  const locationParam = searchParams.get('loc') || 'Malappuram';

  const [searchTerm, setSearchTerm] = useState(query);
  const [locationTerm, setLocationTerm] = useState(locationParam);
  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const businesses = getAllBusinesses();

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      const matchesQuery =
        !searchTerm ||
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = !selectedCategory || b.categoryId === selectedCategory;
      const matchesVerified = !verifiedOnly || b.verified;
      const matchesTop = !topRatedOnly || b.rating >= 4.8;

      return matchesQuery && matchesCat && matchesVerified && matchesTop;
    });
  }, [searchTerm, selectedCategory, verifiedOnly, topRatedOnly, businesses]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (locationTerm) params.append('loc', locationTerm);
    if (selectedCategory) params.append('cat', selectedCategory);
    setSearchParams(params);
  };

  const currentCategoryName = categories.find((c) => c.id === selectedCategory)?.name || 'Businesses';

  return (
    <main className="w-full px-margin-mobile md:px-margin-desktop py-6">
      <Breadcrumb items={[{ label: 'Search Results' }]} />

      {/* Search Header Context */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl md:text-4xl font-bold text-on-background mb-4">
          {filteredBusinesses.length} {currentCategoryName} in {locationTerm || 'All Locations'}
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search category or business name..."
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 pl-11 pr-4 font-sans text-sm text-on-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder="Location"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 pl-11 pr-4 font-sans text-sm text-on-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex-1 rounded-full"
              icon={SlidersHorizontal}
            >
              Filters
            </Button>
            <Button type="submit" variant="primary" className="rounded-full px-6">
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters (Desktop) */}
        <aside className={`lg:block w-full lg:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'}`}>
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-lg font-bold text-on-background">Filters</h3>
              {(verifiedOnly || topRatedOnly || selectedCategory) && (
                <button
                  onClick={() => {
                    setVerifiedOnly(false);
                    setTopRatedOnly(false);
                    setSelectedCategory('');
                  }}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <h4 className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                Quick Filters
              </h4>
              <label className="flex items-center gap-3 mb-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/50"
                />
                <span className="font-sans text-sm text-on-background">Verified Only</span>
              </label>
              <label className="flex items-center gap-3 mb-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={topRatedOnly}
                  onChange={(e) => setTopRatedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/50"
                />
                <span className="font-sans text-sm text-on-background">Top Rated (4.8+)</span>
              </label>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    !selectedCategory ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex justify-between items-center ${
                      selectedCategory === cat.id ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-xs text-outline">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-outline-variant/20">
            <span className="font-sans text-xs text-on-surface-variant">
              Showing {filteredBusinesses.length} results
            </span>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-outline hidden sm:inline">View:</span>
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'grid' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'list' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <BusinessGrid
            businesses={filteredBusinesses}
            layout={layout}
            emptyStateProps={{
              title: "No businesses found",
              description: "No local businesses match your specified filters. Try changing category or search terms.",
              actionLabel: "Clear Filters",
              onAction: () => {
                setSearchTerm('');
                setSelectedCategory('');
                setVerifiedOnly(false);
                setTopRatedOnly(false);
              }
            }}
          />
        </div>
      </div>
    </main>
  );
};
