// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Footer = () => {
//   return (
//     <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 mt-12 pb-24 md:pb-0">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 py-10 w-full">
//         {/* Brand */}
//         <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
//           <span className="font-headline text-2xl font-black text-primary">ZYPHORIZ</span>
//           <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
//             Local business discovery made simple. Find trusted shops, restaurants, clinics &amp; services near you.
//           </p>
//           <p className="font-sans text-xs text-outline">© {new Date().getFullYear()} ZYPHORIZ.</p>
//         </div>

//         {/* Discover */}
//         <div className="flex flex-col gap-3">
//           <h4 className="font-headline text-sm font-bold text-on-surface">Discover</h4>
//           <Link to="/" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Browse All</Link>
//           <Link to="/?cat=food" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Restaurants</Link>
//           <Link to="/?cat=medical" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Medical</Link>
//           <Link to="/?cat=beauty" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Beauty & Spa</Link>
//         </div>

//         {/* For Business */}
//         <div className="flex flex-col gap-3">
//           <h4 className="font-headline text-sm font-bold text-on-surface">For Business</h4>
//           <Link to="/create" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">List Your Business</Link>
//           <span className="font-sans text-xs text-on-surface-variant">₹499 / Year</span>
//           <span className="font-sans text-xs text-on-surface-variant">Verified Badge</span>
//           <span className="font-sans text-xs text-on-surface-variant">Your Own URL</span>
//         </div>

//         {/* Legal */}
//         <div className="flex flex-col gap-3">
//           <h4 className="font-headline text-sm font-bold text-on-surface">Support</h4>
//           <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
//           <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
//           <a href="#" className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors">Help Center</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-12 w-full bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] pb-24 text-[#FBF6EC] md:pb-0">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        {/* Mobile: brand on top, links side-by-side below */}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-10 md:text-left">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 flex flex-col items-center gap-4 md:col-span-2 md:items-start">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/image/zypho.png"
                alt="ZYPHORIZ"
                className="h-10 w-auto object-contain md:h-14"
              />
            </Link>
            <p className="mx-auto max-w-sm font-sans text-xs leading-relaxed text-[#FBF6EC]/70 md:mx-0">
              Create your own stunning digital page in minutes. Showcase who you
              are, what you do, your work, services, photos and contact details —
              all in one place.
            </p>
          
          </div>

          {/* For Business */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h4 className="font-headline text-sm font-bold text-[#E8A23D]">
              For Business
            </h4>
            <Link
              to="/create"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              Create Your Page
            </Link>
            <span className="font-sans text-xs text-[#FBF6EC]/70">Verified Badge</span>
            <span className="font-sans text-xs text-[#FBF6EC]/70">Your Own URL</span>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h4 className="font-headline text-sm font-bold text-[#E8A23D]">Support</h4>
            <Link
              to="/about"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              About ZYPHORIZ
            </Link>
            <Link
              to="/privacy"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/refund"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              Refund Policy
            </Link>
            <Link
              to="/terms"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/contact"
              className="font-sans text-xs text-[#FBF6EC]/70 transition-colors hover:text-[#E8A23D]"
            >
              Contact Us
            </Link>
          </div>
          
        </div>
      
      </div>
          <p className="font-sans text-xs text-[#FBF6EC]/50">
              © {new Date().getFullYear()} ZYPHORIZ.
            </p>
    </footer>
  );
};