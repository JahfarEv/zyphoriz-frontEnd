import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, Search, SlidersHorizontal, X } from 'lucide-react';
import { BusinessCard } from '../../components/business/BusinessCard';
import { categories } from '../../data/categories';
import { getAllBusinesses } from '../../data/mockBusinesses';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const businesses = getAllBusinesses();

  const filteredBusinesses = businesses.filter((b) => {
    const matchCat = activeCategory ? b.categoryId === activeCategory : true;
    const q = searchQuery.toLowerCase();
    const matchSearch = q
      ? b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.location?.toLowerCase().includes(q)
      : true;
    return matchCat && matchSearch;
  });

  const activeCategoryName = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name
    : null;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative pt-10 pb-14 px-4 md:px-8 overflow-hidden hero-gradient">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-3 leading-tight">
            Find Local Businesses & Shops
          </h1>
          <p className="font-sans text-base text-on-surface-variant mb-8 max-w-xl mx-auto">
            Browse trusted businesses by category — restaurants, medical, beauty, electronics &amp; more.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses, shops, services..."
              className="w-full pl-12 pr-12 py-4 bg-surface rounded-2xl border border-outline-variant/40 shadow-md font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* List CTA */}
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-6 py-3 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md"
          >
            <PlusCircle className="w-5 h-5" />
            List Your Business — ₹499/yr
          </Link>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Business Listings */}
      <section className="w-full py-8 px-4 md:px-8 pb-16">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden inline-flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface font-sans text-sm font-semibold text-on-surface"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {activeCategory && <span className="w-2 h-2 rounded-full bg-primary" />}
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 flex-shrink-0`}>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline text-base font-bold text-on-surface">Categories</h2>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeCategory ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  All Businesses
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 ${
                      activeCategory === category.id ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="truncate">{category.name}</span>
                    <span className="text-xs text-outline">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-headline text-xl md:text-2xl font-bold text-on-background">
                  {activeCategoryName || 'All Businesses'}
                </h2>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                  {filteredBusinesses.length} listing{filteredBusinesses.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-2">No businesses found</h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6">
                  {searchQuery
                    ? `No results for "${searchQuery}" in this category.`
                    : 'No businesses listed in this category yet.'}
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Be the first — List Your Business
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 md:px-8 bg-primary-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-primary mb-3">
            Own a Business?
          </h2>
          <p className="font-sans text-sm text-on-primary/80 mb-6">
            Get discovered by thousands of local customers. List your shop or service today for just ₹499/year.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-primary font-sans font-bold px-8 py-3.5 rounded-xl hover:bg-surface-bright transition-all shadow-md text-base"
          >
            <PlusCircle className="w-5 h-5" />
            List Your Business
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
