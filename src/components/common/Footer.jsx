import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 mt-12 pb-24 md:pb-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 py-10 w-full">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <span className="font-headline text-2xl font-black text-primary">NEXORA</span>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Local business discovery made simple. Find trusted shops, restaurants, clinics &amp; services near you.
          </p>
          <p className="font-sans text-xs text-outline">© {new Date().getFullYear()} NEXORA.</p>
        </div>

        {/* Discover */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-bold text-on-surface">Discover</h4>
          <Link to="/" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Browse All</Link>
          <Link to="/?cat=food" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Restaurants</Link>
          <Link to="/?cat=medical" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Medical</Link>
          <Link to="/?cat=beauty" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Beauty & Spa</Link>
        </div>

        {/* For Business */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-bold text-on-surface">For Business</h4>
          <Link to="/create" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">List Your Business</Link>
          <span className="font-sans text-xs text-on-surface-variant">₹499 / Year</span>
          <span className="font-sans text-xs text-on-surface-variant">Verified Badge</span>
          <span className="font-sans text-xs text-on-surface-variant">Your Own URL</span>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-bold text-on-surface">Support</h4>
          <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Help Center</a>
        </div>
      </div>
    </footer>
  );
};
