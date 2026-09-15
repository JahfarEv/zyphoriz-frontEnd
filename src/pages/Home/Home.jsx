// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, PlusCircle, Search, SlidersHorizontal, X } from 'lucide-react';
// import { BusinessCard } from '../../components/business/BusinessCard';

// export const Home = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const businesses = getAllBusinesses();

//   const filteredBusinesses = businesses.filter((b) => {
//     const matchCat = activeCategory ? b.categoryId === activeCategory : true;
//     const q = searchQuery.toLowerCase();
//     const matchSearch = q
//       ? b.name.toLowerCase().includes(q) ||
//         b.category.toLowerCase().includes(q) ||
//         b.location?.toLowerCase().includes(q)
//       : true;
//     return matchCat && matchSearch;
//   });

//   const activeCategoryName = activeCategory
//     ? categories.find((c) => c.id === activeCategory)?.name
//     : null;

//   return (
//     <div className="w-full">
//       {/* Hero */}
//       <section className="relative pt-10 pb-14 px-4 md:px-8 overflow-hidden hero-gradient">
//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-3 leading-tight">
//             Find Local Businesses & Shops
//           </h1>
//           <p className="font-sans text-base text-on-surface-variant mb-8 max-w-xl mx-auto">
//             Browse trusted businesses by category — restaurants, medical, beauty, electronics &amp; more.
//           </p>

//           {/* Search Bar */}
//           <div className="relative max-w-xl mx-auto mb-6">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search businesses, shops, services..."
//               className="w-full pl-12 pr-12 py-4 bg-surface rounded-2xl border border-outline-variant/40 shadow-md font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* List CTA */}
//           <Link
//             to="/create"
//             className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-6 py-3 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md"
//           >
//             <PlusCircle className="w-5 h-5" />
//             List Your Business — ₹499/yr
//           </Link>
//         </div>

//         {/* Decorative blobs */}
//         <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
//         <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
//       </section>

//       {/* Business Listings */}
//       <section className="w-full py-8 px-4 md:px-8 pb-16">
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="lg:hidden inline-flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface font-sans text-sm font-semibold text-on-surface"
//         >
//           <SlidersHorizontal className="w-4 h-4" /> Filters
//           {activeCategory && <span className="w-2 h-2 rounded-full bg-primary" />}
//         </button>

//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 flex-shrink-0`}>
//             <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 lg:sticky lg:top-24">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-headline text-base font-bold text-on-surface">Categories</h2>
//                 {activeCategory && (
//                   <button
//                     onClick={() => setActiveCategory(null)}
//                     className="text-xs font-semibold text-primary hover:underline"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-1">
//                 <button
//                   onClick={() => setActiveCategory(null)}
//                   className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
//                     !activeCategory ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
//                   }`}
//                 >
//                   All Businesses
//                 </button>
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 ${
//                       activeCategory === category.id ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
//                     }`}
//                   >
//                     <span className="truncate">{category.name}</span>
//                     <span className="text-xs text-outline">{category.count}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </aside>

//           <div className="flex-1 min-w-0 w-full">
//             <div className="flex items-center justify-between mb-5">
//               <div>
//                 <h2 className="font-headline text-xl md:text-2xl font-bold text-on-background">
//                   {activeCategoryName || 'All Businesses'}
//                 </h2>
//                 <p className="font-sans text-xs text-on-surface-variant mt-0.5">
//                   {filteredBusinesses.length} listing{filteredBusinesses.length !== 1 ? 's' : ''} found
//                   {searchQuery && ` for "${searchQuery}"`}
//                 </p>
//               </div>
//             </div>

//             {filteredBusinesses.length === 0 ? (
//               <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
//                 <div className="text-5xl mb-4">🔍</div>
//                 <h3 className="font-headline text-lg font-bold text-on-surface mb-2">No businesses found</h3>
//                 <p className="font-sans text-sm text-on-surface-variant mb-6">
//                   {searchQuery
//                     ? `No results for "${searchQuery}" in this category.`
//                     : 'No businesses listed in this category yet.'}
//                 </p>
//                 <Link
//                   to="/create"
//                   className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm"
//                 >
//                   <PlusCircle className="w-4 h-4" /> Be the first — List Your Business
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                 {filteredBusinesses.map((business) => (
//                   <BusinessCard key={business.id} business={business} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Bottom CTA */}
//       <section className="py-12 px-4 md:px-8 bg-primary-container">
//         <div className="max-w-2xl mx-auto text-center">
//           <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-primary mb-3">
//             Own a Business?
//           </h2>
//           <p className="font-sans text-sm text-on-primary/80 mb-6">
//             Get discovered by thousands of local customers. List your shop or service today for just ₹499/year.
//           </p>
//           <Link
//             to="/create"
//             className="inline-flex items-center gap-2 bg-white text-primary font-sans font-bold px-8 py-3.5 rounded-xl hover:bg-surface-bright transition-all shadow-md text-base"
//           >
//             <PlusCircle className="w-5 h-5" />
//             List Your Business
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, PlusCircle, Search, SlidersHorizontal, X, Sparkles, TrendingUp, Star } from 'lucide-react';
// import { BusinessCard } from '../../components/business/BusinessCard';

// export const Home = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const businesses = getAllBusinesses();

//   const filteredBusinesses = businesses.filter((b) => {
//     const matchCat = activeCategory ? b.categoryId === activeCategory : true;
//     const q = searchQuery.toLowerCase();
//     const matchSearch = q
//       ? b.name.toLowerCase().includes(q) ||
//         b.category.toLowerCase().includes(q) ||
//         b.location?.toLowerCase().includes(q)
//       : true;
//     return matchCat && matchSearch;
//   });

//   const activeCategoryName = activeCategory
//     ? categories.find((c) => c.id === activeCategory)?.name
//     : null;

//   return (
//     <div className="w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
//       {/* Hero - Modern Gradient with Animation */}
//       <section className="relative pt-12 pb-16 px-4 md:px-8 overflow-hidden">
//         {/* Animated Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-95" />
        
//         {/* Floating Orbs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
//         <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-delayed" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl" />
        
//         {/* Grid Pattern Overlay - Fixed SVG URL */}
//         <div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}
//         />

//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
//             <Sparkles className="w-4 h-4" />
//             Discover Amazing Local Businesses
//           </div>

//           <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
//             Find Local Businesses
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
//               & Shops Near You
//             </span>
//           </h1>
          
//           <p className="font-sans text-lg text-white/90 mb-10 max-w-2xl mx-auto backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/20">
//             Browse trusted businesses by category — restaurants, medical, beauty, electronics &amp; more.
//           </p>

//           {/* Search Bar - Glassmorphism */}
//           <div className="relative max-w-xl mx-auto mb-8">
//             <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
//             <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search businesses, shops, services..."
//                 className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl font-sans text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/create"
//               className="inline-flex items-center gap-2 bg-white text-indigo-600 font-sans font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 active:scale-[0.98] transition-all duration-300 text-base"
//             >
//               <PlusCircle className="w-5 h-5" />
//               List Your Business — ₹499/yr
//             </Link>
//             <Link
//               to="#businesses"
//               className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-sans font-medium px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
//             >
//               Browse All
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-white/20">
//             <div className="text-white">
//               <div className="text-2xl font-bold">500+</div>
//               <div className="text-sm text-white/70">Listings</div>
//             </div>
//             <div className="text-white">
//               <div className="text-2xl font-bold">50+</div>
//               <div className="text-sm text-white/70">Categories</div>
//             </div>
//             <div className="text-white">
//               <div className="text-2xl font-bold">4.8</div>
//               <div className="text-sm text-white/70">Avg. Rating</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Business Listings */}
//       <section id="businesses" className="w-full py-10 px-4 md:px-8 pb-20">
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="lg:hidden inline-flex items-center gap-2 mb-6 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm font-sans text-sm font-semibold text-slate-700 hover:shadow-md transition-all"
//         >
//           <SlidersHorizontal className="w-4 h-4" /> Filters
//           {activeCategory && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
//         </button>

//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           {/* Categories Sidebar - Modern Design */}
//           <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
//             <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:sticky lg:top-24">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="font-headline text-lg font-bold text-slate-800 flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-indigo-500" />
//                   Categories
//                 </h2>
//                 {activeCategory && (
//                   <button
//                     onClick={() => setActiveCategory(null)}
//                     className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-1.5">
//                 <button
//                   onClick={() => setActiveCategory(null)}
//                   className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
//                     !activeCategory 
//                       ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 font-semibold' 
//                       : 'text-slate-600 hover:bg-slate-50'
//                   }`}
//                 >
//                   All Businesses
//                 </button>
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between gap-2 ${
//                       activeCategory === category.id 
//                         ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 font-semibold' 
//                         : 'text-slate-600 hover:bg-slate-50'
//                     }`}
//                   >
//                     <span className="truncate">{category.name}</span>
//                     <span className={`text-xs px-2 py-0.5 rounded-full ${
//                       activeCategory === category.id 
//                         ? 'bg-white/20 text-white' 
//                         : 'bg-slate-100 text-slate-400'
//                     }`}>
//                       {category.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </aside>

//           <div className="flex-1 min-w-0 w-full">
//             {/* Header */}
//             <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//               <div>
//                 <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
//                   {activeCategoryName || 'All Businesses'}
//                   <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
//                     {filteredBusinesses.length}
//                   </span>
//                 </h2>
//                 <p className="font-sans text-sm text-slate-500 mt-1">
//                   {searchQuery && `Showing results for "${searchQuery}"`}
//                 </p>
//               </div>
//             </div>

//             {/* Results */}
//             {filteredBusinesses.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-slate-100">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <h3 className="font-headline text-xl font-bold text-slate-800 mb-2">No businesses found</h3>
//                 <p className="font-sans text-sm text-slate-500 mb-8">
//                   {searchQuery
//                     ? `No results for "${searchQuery}" in this category.`
//                     : 'No businesses listed in this category yet.'}
//                 </p>
//                 <Link
//                   to="/create"
//                   className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-sans font-bold px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
//                 >
//                   <PlusCircle className="w-4 h-4" /> Be the first — List Your Business
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredBusinesses.map((business) => (
//                   <BusinessCard key={business.id} business={business} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Bottom CTA - Modern */}
//       <section className="relative py-16 px-4 md:px-8 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
//         <div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}
//         />
        
//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
//             <Star className="w-4 h-4 fill-current" />
//             Join 500+ Business Owners
//           </div>
          
//           <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
//             Own a Business?
//           </h2>
//           <p className="font-sans text-lg text-white/90 mb-8 max-w-xl mx-auto">
//             Get discovered by thousands of local customers. List your shop or service today for just ₹499/year.
//           </p>
//           <Link
//             to="/create"
//             className="inline-flex items-center gap-3 bg-white text-indigo-600 font-sans font-bold px-10 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
//           >
//             <PlusCircle className="w-6 h-6" />
//             List Your Business
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </section>

//       {/* Add custom styles */}
//       <style>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 8s ease infinite;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float 8s ease-in-out infinite;
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   PlusCircle,
//   Search,
//   SlidersHorizontal,
//   X,
//   Sparkles,
//   TrendingUp,
//   Star,
//   Globe,
//   ShieldCheck,
//   Phone,
// } from 'lucide-react';
// import { BusinessCard } from '../../components/business/BusinessCard';
// import { api } from '../../lib/api';

// export const Home = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [businesses, setBusinesses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [categoryPage, setCategoryPage] = useState(1);
//   const [categoryPagination, setCategoryPagination] = useState({ pages: 1 });
//   const [businessPage, setBusinessPage] = useState(1);
//   const [businessPagination, setBusinessPagination] = useState({ total: 0, pages: 1 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     api.categories.list(`?page=${categoryPage}&limit=8`)
//       .then((data) => {
//         setCategories(data.categories || []);
//         setCategoryPagination(data.pagination || { pages: 1 });
//       })
//       .catch(() => {});
//   }, [categoryPage]);

//   useEffect(() => {
//     setLoading(true);
//     setError('');
//     const params = new URLSearchParams({ page: businessPage, limit: 9 });
//     if (activeCategory) params.set('category', activeCategory);
//     if (searchQuery.trim()) params.set('q', searchQuery.trim());
//     api.businesses.list(`?${params.toString()}`)
//       .then((data) => {
//         setBusinesses(data.businesses || []);
//         setBusinessPagination(data.pagination || { total: 0, pages: 1 });
//       })
//       .catch((requestError) => setError(requestError.message))
//       .finally(() => setLoading(false));
//   }, [activeCategory, businessPage, searchQuery]);

//   const activeCategoryName = activeCategory
//     ? categories.find((c) => c.id === activeCategory)?.name
//     : null;

//   const changeSearch = (value) => {
//     setSearchQuery(value);
//     setBusinessPage(1);
//   };

//   const selectCategory = (categoryId) => {
//     setActiveCategory(categoryId);
//     setBusinessPage(1);
//   };

//   return (
//     <div className="w-full 
     
//          "
//           >
//       {/* Hero */}
//       <section className="relative pt-14 pb-20 px-4 md:px-8 overflow-hidden ">
//         {/* Subtle bunting-dot pattern instead of a generic grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.15]"
//           style={{
//             backgroundImage: `radial-gradient(#E8A23D 1.5px, transparent 1.5px)`,
//             backgroundSize: '22px 22px',
//           }}
//         />
//         {/* One quiet ink-to-transparent wash at the base, not a rainbow gradient */}
//         <div className="absolute inset-x-0 bottom-0 h-40 " />

//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           {/* Badge — solid, not glass */}
//           <div className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] px-4 py-2 rounded-full text-sm font-bold mb-6">
//             <Sparkles className="w-4 h-4" />
//             Discover amazing local businesses
//           </div>

//           <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-[#FBF6EC] mb-3 leading-tight">
//             Find local businesses
//             <span className="block">& shops near you</span>
//           </h1>
//           <div className="w-16 h-1 bg-[#E8A23D] mx-auto mb-8 rounded-full" />

//           <p className="font-sans text-lg text-[#FBF6EC]/80 mb-10 max-w-2xl mx-auto">
//             Browse trusted businesses by category — restaurants, medical, beauty, electronics &amp; more.
//           </p>

//           {/* Search Bar — solid paper card, marigold focus ring, no blur */}
//           <div className="relative max-w-xl mx-auto mb-8">
//             <div className="relative bg-[#FBF6EC] rounded-2xl shadow-lg border-2 border-[#E8A23D]/40 focus-within:border-[#E8A23D] transition-colors">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16292C]/40" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => changeSearch(e.target.value)}
//                 placeholder="Search businesses, shops, services..."
//                 className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl font-sans text-sm text-[#241F1A] placeholder:text-[#241F1A]/40 focus:outline-none"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => changeSearch('')}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-[#241F1A]/40 hover:text-[#241F1A] transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/create"
//               className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] font-sans font-bold px-8 py-4 rounded-2xl hover:bg-[#F4C874] active:scale-[0.98] transition-all duration-200 text-base"
//             >
//               <PlusCircle className="w-5 h-5" />
//               List your business — ₹499
//             </Link>
//             {/* <Link
//               to="#businesses"
//               className="inline-flex items-center gap-2 bg-transparent text-[#FBF6EC] font-sans font-medium px-8 py-4 rounded-2xl border-2 border-[#FBF6EC]/30 hover:border-[#FBF6EC]/60 transition-all duration-200"
//             >
//               Browse all
//               <ArrowRight className="w-4 h-4" />
//             </Link> */}
//           </div>

//           {/* Stats */}
//           <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-[#FBF6EC]/15">
//             <div className="text-[#FBF6EC]">
//               <div className="text-2xl font-bold text-[#E8A23D]">500+</div>
//               <div className="text-sm text-[#FBF6EC]/60">Listings</div>
//             </div>
//             <div className="text-[#FBF6EC]">
//               <div className="text-2xl font-bold text-[#E8A23D]">50+</div>
//               <div className="text-sm text-[#FBF6EC]/60">Categories</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Business Listings */}

      
//       <section id="businesses" className="w-full py-10 px-4 md:px-8 pb-20 shadow-[0_-12px_30px_rgba(22,41,44,0.18)]">
//        <div
//           className="absolute inset-0 opacity-[0.12]"
//           style={{
//             backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
//             backgroundSize: '22px 22px',
//           }}
//         />
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="lg:hidden inline-flex items-center gap-2 mb-6 px-5 py-3 rounded-xl bg-white border border-[#241F1A]/10 shadow-sm font-sans text-sm font-semibold text-[#241F1A] hover:shadow-md transition-all"
//         >
//           <SlidersHorizontal className="w-4 h-4" /> Filters
//           {activeCategory && <span className="w-2 h-2 rounded-full bg-[#B94630]" />}
//         </button>

//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           {/* Categories Sidebar */}
//           <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
//             <div className="bg-white rounded-2xl shadow-lg border border-[#241F1A]/10 p-6 lg:sticky lg:top-24">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="font-headline text-lg font-bold text-[#241F1A] flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-[#B94630]" />
//                   Categories
//                 </h2>
//                 {activeCategory && (
//                   <button
//                     onClick={() => selectCategory(null)}
//                     className="text-xs font-semibold text-[#B94630] hover:underline"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-1.5">
//                 <button
//                   onClick={() => selectCategory(null)}
//                   className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${
//                     !activeCategory
//                       ? 'bg-[#16292C] text-[#FBF6EC] font-semibold'
//                       : 'text-[#241F1A]/70 hover:bg-[#FBF6EC]'
//                   }`}
//                 >
//                   All businesses
//                 </button>
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => selectCategory(category.id)}
//                     className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-150 flex items-center justify-between gap-2 ${
//                       activeCategory === category.id
//                         ? 'bg-[#16292C] text-[#FBF6EC] font-semibold'
//                         : 'text-[#241F1A]/70 hover:bg-[#FBF6EC]'
//                     }`}
//                   >
//                     <span className="truncate">{category.name}</span>
//                   </button>
//                 ))}
//               </div>
//               {categoryPagination.pages > 1 && (
//                 <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[#241F1A]/10">
//                   <button
//                     type="button"
//                     onClick={() => setCategoryPage((page) => Math.max(page - 1, 1))}
//                     disabled={categoryPage === 1}
//                     className="text-xs font-semibold text-[#16292C] disabled:opacity-35 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <span className="text-[11px] text-[#241F1A]/50">{categoryPage} / {categoryPagination.pages}</span>
//                   <button
//                     type="button"
//                     onClick={() => setCategoryPage((page) => Math.min(page + 1, categoryPagination.pages))}
//                     disabled={categoryPage >= categoryPagination.pages}
//                     className="text-xs font-semibold text-[#B94630] disabled:opacity-35 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </div>
//           </aside>

//           <div className="flex-1 min-w-0 w-full">
//             {/* Header */}
//             <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//               <div>
//                 <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#F1E8D8] flex items-center gap-3">
//                   {activeCategoryName || 'All businesses'}
//                   <span className="text-sm font-normal text-[#241F1A]/40 bg-[#F1E8D8] px-3 py-1 rounded-full">
//                     {loading ? '...' : businessPagination.total}
//                   </span>
//                 </h2>
//                 <p className="font-sans text-sm text-[#241F1A]/50 mt-1">
//                   {searchQuery && `Showing results for "${searchQuery}"`}
//                 </p>
//               </div>
//             </div>

//             {/* Results */}
//             {error ? (
//               <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-[#241F1A]/10">
//                 <h3 className="font-headline text-xl font-bold text-[#241F1A] mb-2">Unable to load businesses</h3>
//                 <p className="font-sans text-sm text-[#241F1A]/50">{error}</p>
//               </div>
//             ) : loading ? (
//               <div className="text-center py-20 text-[#241F1A]/50">Loading businesses...</div>
//             ) : businesses.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-[#241F1A]/10">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <h3 className="font-headline text-xl font-bold text-[#241F1A] mb-2">No businesses found</h3>
//                 <p className="font-sans text-sm text-[#241F1A]/50 mb-8">
//                   {searchQuery
//                     ? `No results for "${searchQuery}" in this category.`
//                     : 'No businesses listed in this category yet.'}
//                 </p>
//                 <Link
//                   to="/create"
//                   className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] font-sans font-bold px-6 py-3 rounded-xl hover:bg-[#F4C874] transition-all duration-200 text-sm"
//                 >
//                   <PlusCircle className="w-4 h-4" /> Be the first — list your business
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {businesses.map((business) => (
//                   <BusinessCard key={business._id || business.id || business.slug} business={business} />
//                 ))}
//               </div>
//             )}
//             {!loading && !error && businessPagination.pages > 1 && (
//               <div className="flex items-center justify-center gap-5 mt-8">
//                 <button
//                   type="button"
//                   onClick={() => setBusinessPage((page) => Math.max(page - 1, 1))}
//                   disabled={businessPage === 1}
//                   className="px-4 py-2 rounded-xl bg-[#FBF6EC] text-[#16292C] text-sm font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm font-semibold text-[#FBF6EC]">Page {businessPage} of {businessPagination.pages}</span>
//                 <button
//                   type="button"
//                   onClick={() => setBusinessPage((page) => Math.min(page + 1, businessPagination.pages))}
//                   disabled={businessPage >= businessPagination.pages}
//                   className="px-4 py-2 rounded-xl bg-[#E8A23D] text-[#16292C] text-sm font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
        
//       </section>

//       {/* Bottom CTA — brick, so it doesn't repeat the hero's ink tone */}
//       <section className="relative py-16 px-4 md:px-8 overflow-hidden shadow-[0_-12px_30px_rgba(22,41,44,0.22)]">
//         <div
//           className="absolute inset-0 opacity-[0.12]"
//           style={{
//             backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
//             backgroundSize: '22px 22px',
//           }}
//         />
//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-[#FBF6EC] text-[#B94630] px-4 py-2 rounded-full text-sm font-bold mb-6">
//             <Star className="w-4 h-4 fill-current" />
//             Join 500+ business owners
//           </div>

//           <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#FBF6EC] mb-4">
//             Own a business?
//           </h2>
//           <p className="font-sans text-lg text-[#FBF6EC]/85 mb-8 max-w-xl mx-auto">
//             Get discovered by thousands of local customers for just ₹499.
//           </p>

//           {/* Feature grid — what you actually get */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
//             {[
//               { icon: Globe, label: 'Your own business URL', sub: 'zyphoriz.in/{name}' },
//               { icon: ShieldCheck, label: 'Verified badge', sub: 'Trusted by customers' },
//               { icon: Phone, label: 'Direct call & WhatsApp', sub: 'Connect instantly' },
//             ].map(({ icon: Icon, label, sub }) => (
//               <div
//                 key={label}
//                 className="bg-[#FBF6EC] rounded-xl p-4 flex items-start gap-3"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#B94630]/10 flex items-center justify-center flex-shrink-0">
//                   <Icon className="w-4 h-4 text-[#B94630]" />
//                 </div>
//                 <div>
//                   <p className="font-sans text-xs font-semibold text-[#241F1A]">{label}</p>
//                   <p className="font-sans text-xs text-[#241F1A]/50">{sub}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Link
//             to="/create"
//             className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg"
//           >
//             <PlusCircle className="w-6 h-6" />
//             List your business
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PlusCircle,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  TrendingUp,
  Star,
  Globe,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { BusinessCard } from '../../components/business/BusinessCard';
import { api } from '../../lib/api';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryPagination, setCategoryPagination] = useState({ pages: 1 });
  const [businessPage, setBusinessPage] = useState(1);
  const [businessPagination, setBusinessPagination] = useState({ total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.categories.list(`?page=${categoryPage}&limit=8`)
      .then((data) => {
        setCategories(data.categories || []);
        setCategoryPagination(data.pagination || { pages: 1 });
      })
      .catch(() => {});
  }, [categoryPage]);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ page: businessPage, limit: 9 });
    if (activeCategory) params.set('category', activeCategory);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    api.businesses.list(`?${params.toString()}`)
      .then((data) => {
        setBusinesses(data.businesses || []);
        setBusinessPagination(data.pagination || { total: 0, pages: 1 });
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [activeCategory, businessPage, searchQuery]);

  const activeCategoryName = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name
    : null;

  const changeSearch = (value) => {
    setSearchQuery(value);
    setBusinessPage(1);
  };

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setBusinessPage(1);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative pt-14 pb-20 px-4 md:px-8 overflow-hidden bg-[#16292C]">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#E8A23D 1.5px, transparent 1.5px)`,
            backgroundSize: '22px 22px',
          }}
        />
        {/* Fade toward the businesses section below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#16292C] to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Discover amazing local businesses
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-[#FBF6EC] mb-3 leading-tight">
            Find local businesses
            <span className="block">& shops near you</span>
          </h1>
          <div className="w-16 h-1 bg-[#E8A23D] mx-auto mb-8 rounded-full" />

          <p className="font-sans text-lg text-[#FBF6EC]/80 mb-10 max-w-2xl mx-auto">
            Browse trusted businesses by category — restaurants, medical, beauty, electronics &amp; more.
          </p>

          <div className="relative max-w-xl mx-auto mb-8">
            <div className="relative bg-[#FBF6EC] rounded-2xl shadow-lg border-2 border-[#E8A23D]/40 focus-within:border-[#E8A23D] transition-colors">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16292C]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => changeSearch(e.target.value)}
                placeholder="Search businesses, shops, services..."
                className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl font-sans text-sm text-[#241F1A] placeholder:text-[#241F1A]/40 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => changeSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#241F1A]/40 hover:text-[#241F1A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] font-sans font-bold px-8 py-4 rounded-2xl hover:bg-[#F4C874] active:scale-[0.98] transition-all duration-200 text-base"
            >
              <PlusCircle className="w-5 h-5" />
              List your business — ₹499
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-[#FBF6EC]/15">
            <div className="text-[#FBF6EC]">
              <div className="text-2xl font-bold text-[#E8A23D]">500+</div>
              <div className="text-sm text-[#FBF6EC]/60">Listings</div>
            </div>
            <div className="text-[#FBF6EC]">
              <div className="text-2xl font-bold text-[#E8A23D]">50+</div>
              <div className="text-sm text-[#FBF6EC]/60">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Listings — ink fading into teal, continuing the brand gradient */}
     <section
        id="businesses"
        className="relative w-full py-10 px-4 md:px-8 pb-20 bg-[#FBF6EC] border-t border-[#241F1A]/10"
      >
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
            backgroundSize: '22px 22px',
          }}
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="relative lg:hidden inline-flex items-center gap-2 mb-6 px-5 py-3 rounded-xl bg-white border border-[#241F1A]/10 shadow-sm font-sans text-sm font-semibold text-[#241F1A] hover:shadow-md transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {activeCategory && <span className="w-2 h-2 rounded-full bg-[#B94630]" />}
        </button>

        <div className="relative flex flex-col lg:flex-row gap-8 items-start">
        



<aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
  <div className="bg-white rounded-2xl shadow-lg border border-[#241F1A]/10 p-6 lg:sticky lg:top-24">
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-headline text-lg font-bold text-[#241F1A] flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-[#B94630]/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#B94630]" />
        </span>
        Categories
      </h2>
      {activeCategory && (
        <button
          onClick={() => selectCategory(null)}
          className="text-xs font-semibold text-[#B94630] hover:underline"
        >
          Clear
        </button>
      )}
    </div>

    <div className="space-y-1.5">
      <button
        onClick={() => selectCategory(null)}
        className={`w-full text-left pl-3 pr-4 py-2.5 rounded-xl text-sm transition-all duration-150 flex items-center gap-2.5 border-l-4 ${
          !activeCategory
            ? 'bg-gradient-to-r from-[#16292C] to-[#2f756d] text-[#FBF6EC] font-semibold border-[#E8A23D]'
            : 'text-[#241F1A]/70 hover:bg-[#FBF6EC] border-transparent'
        }`}
      >
        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
          !activeCategory ? 'bg-[#FBF6EC]/20 text-[#FBF6EC]' : 'bg-[#16292C]/8 text-[#16292C]'
        }`}>
          ★
        </span>
        All businesses
      </button>

      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => selectCategory(category.id)}
            className={`w-full text-left pl-3 pr-4 py-2.5 rounded-xl text-sm transition-all duration-150 flex items-center justify-between gap-2 border-l-4 ${
              isActive
                ? 'bg-gradient-to-r from-[#16292C] to-[#2f756d] text-[#FBF6EC] font-semibold border-[#E8A23D]'
                : 'text-[#241F1A]/70 hover:bg-[#FBF6EC] border-transparent'
            }`}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                isActive ? 'bg-[#FBF6EC]/20 text-[#FBF6EC]' : 'bg-[#E8A23D]/15 text-[#B94630]'
              }`}>
                {category.name.charAt(0).toUpperCase()}
              </span>
              <span className="truncate">{category.name}</span>
            </span>
            {typeof category.count === 'number' && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                isActive ? 'bg-[#FBF6EC]/20 text-[#FBF6EC]' : 'bg-[#241F1A]/8 text-[#241F1A]/50'
              }`}>
                {category.count}
              </span>
            )}
          </button>
        );
      })}
    </div>

    {categoryPagination.pages > 1 && (
      <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[#241F1A]/10">
        <button
          type="button"
          onClick={() => setCategoryPage((page) => Math.max(page - 1, 1))}
          disabled={categoryPage === 1}
          className="text-xs font-semibold text-[#16292C] disabled:opacity-35 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-[11px] text-[#241F1A]/50">{categoryPage} / {categoryPagination.pages}</span>
        <button
          type="button"
          onClick={() => setCategoryPage((page) => Math.min(page + 1, categoryPagination.pages))}
          disabled={categoryPage >= categoryPagination.pages}
          className="text-xs font-semibold text-[#B94630] disabled:opacity-35 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    )}
  </div>
</aside>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#16292C] flex items-center gap-3">
                  {activeCategoryName || 'All businesses'}
                  <span className="text-sm font-normal text-[#16292C] bg-[#F1E8D8] px-3 py-1 rounded-full">
                    {loading ? '...' : businessPagination.total}
                  </span>
                </h2>
                <p className="font-sans text-sm text-[#FBF6EC]/60 mt-1">
                  {searchQuery && `Showing results for "${searchQuery}"`}
                </p>
              </div>
            </div>

            {error ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-[#241F1A]/10">
                <h3 className="font-headline text-xl font-bold text-[#241F1A] mb-2">Unable to load businesses</h3>
                <p className="font-sans text-sm text-[#241F1A]/50">{error}</p>
              </div>
            ) : loading ? (
              <div className="text-center py-20 text-[#FBF6EC]/70">Loading businesses...</div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-[#241F1A]/10">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-headline text-xl font-bold text-[#241F1A] mb-2">No businesses found</h3>
                <p className="font-sans text-sm text-[#241F1A]/50 mb-8">
                  {searchQuery
                    ? `No results for "${searchQuery}" in this category.`
                    : 'No businesses listed in this category yet.'}
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] font-sans font-bold px-6 py-3 rounded-xl hover:bg-[#F4C874] transition-all duration-200 text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Be the first — list your business
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <BusinessCard key={business._id || business.id || business.slug} business={business} />
                ))}
              </div>
            )}
            {!loading && !error && businessPagination.pages > 1 && (
              <div className="flex items-center justify-center gap-5 mt-8">
                <button
                  type="button"
                  onClick={() => setBusinessPage((page) => Math.max(page - 1, 1))}
                  disabled={businessPage === 1}
                  className="px-4 py-2 rounded-xl bg-[#FBF6EC] text-[#16292C] text-sm font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm font-semibold text-[#FBF6EC]">Page {businessPage} of {businessPagination.pages}</span>
                <button
                  type="button"
                  onClick={() => setBusinessPage((page) => Math.min(page + 1, businessPagination.pages))}
                  disabled={businessPage >= businessPagination.pages}
                  className="px-4 py-2 rounded-xl bg-[#E8A23D] text-[#16292C] text-sm font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA — teal fading into brick */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#2f756d] to-[#B94630] shadow-[0_-12px_30px_rgba(22,41,44,0.22)]">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
            backgroundSize: '22px 22px',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FBF6EC] text-[#B94630] px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4 fill-current" />
            Join 500+ business owners
          </div>

          <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#FBF6EC] mb-4">
            Own a business?
          </h2>
          <p className="font-sans text-lg text-[#FBF6EC]/85 mb-8 max-w-xl mx-auto">
            Get discovered by thousands of local customers for just ₹499.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            {[
              { icon: Globe, label: 'Your own business URL', sub: 'zyphoriz.in/{name}' },
              { icon: ShieldCheck, label: 'Verified badge', sub: 'Trusted by customers' },
              { icon: Phone, label: 'Direct call & WhatsApp', sub: 'Connect instantly' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-[#FBF6EC] rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#B94630]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#B94630]" />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-[#241F1A]">{label}</p>
                  <p className="font-sans text-xs text-[#241F1A]/50">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg"
          >
            <PlusCircle className="w-6 h-6" />
            List your business
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};