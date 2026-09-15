// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Phone, ChevronRight } from 'lucide-react';

// export const BusinessCard = ({ business, layout = 'grid' }) => {
//   // Support both old /business/:id and new /:slug routes
//   const profileUrl = `/${business.slug || business.id}`;

//   if (layout === 'list') {
//     return (
//       <div className="bg-surface  shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] overflow-hidden border border-outline-variant/20 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col sm:flex-row group">
//         <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-surface-variant overflow-hidden">
//           <img
//             src={business.image}
//             alt={business.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         </div>
//         <div className="p-5 flex-1 flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-start mb-1">
//               <Link to={profileUrl} className="hover:text-primary transition-colors">
//                 <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-1">
//                   {business.name}
//                 </h3>
//               </Link>
//             </div>
//             <p className="font-sans text-xs text-on-surface-variant mb-2">
//               {business.category}
//             </p>
//             <p className="font-sans text-xs text-outline line-clamp-2 mb-3">
//               {business.description}
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-outline-variant/20">
//             <span className="font-sans text-xs text-outline flex items-center gap-1">
//               <MapPin className="w-3.5 h-3.5" />
//               {business.distance || business.location}
//             </span>
//             <div className="flex items-center gap-2">
//               <a
//                 href={`tel:${business.phone}`}
//                 className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Phone className="w-3.5 h-3.5" /> Call
//               </a>
//               <Link
//                 to={profileUrl}
//                 className="px-4 py-1.5 bg-primary-container text-on-primary rounded-lg text-xs font-semibold hover:bg-primary transition-colors inline-flex items-center gap-1"
//               >
//                 View Details <ChevronRight className="w-3.5 h-3.5" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Link
//       to={profileUrl}
//       className="bg-surface rounded-[12px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col group cursor-pointer"
//     >
//       <div className="relative w-full aspect-[16/9] bg-surface-variant overflow-hidden">
//         <img
//           src={business.image}
//           alt={business.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//       </div>
//       <div className="p-5 flex-1 flex flex-col justify-between">
//         <div>
//           <div className="flex justify-between items-start mb-1">
//             <h3 className="font-headline text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
//               {business.name}
//             </h3>
//           </div>
//           <p className="font-sans text-xs text-on-surface-variant mb-3 flex items-center gap-1">
//             {business.category}
//           </p>
//         </div>
//         <p className="font-sans text-xs text-outline flex items-center gap-1 mt-auto pt-2 border-t border-outline-variant/20">
//           <MapPin className="w-3.5 h-3.5" />
//           {business.distance || business.location}
//         </p>
//       </div>
//     </Link>
//   );
// };



// --- BusinessCard.js (full replacement) ---
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Phone, ChevronRight, Star, BadgeCheck } from 'lucide-react';

// export const BusinessCard = ({ business, layout = 'grid' }) => {
//   const profileUrl = `/${business.slug || business.id}`;

//   if (layout === 'list') {
//     return (
//       <div className="bg-surface shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] overflow-hidden border border-outline-variant/20 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col sm:flex-row group">
//         <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-surface-variant overflow-hidden">
//           <img
//             src={business.image}
//             alt={business.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//           <span className="absolute top-3 left-3 bg-surface/95 backdrop-blur-sm text-on-surface text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
//             {business.category}
//           </span>
//           {business.verified && (
//             <span className="absolute top-3 right-3 bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
//               <BadgeCheck className="w-3.5 h-3.5" />
//             </span>
//           )}
//         </div>
//         <div className="p-5 flex-1 flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-start gap-2 mb-1">
//               <Link to={profileUrl} className="hover:text-primary transition-colors min-w-0">
//                 <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-1">
//                   {business.name}
//                 </h3>
//               </Link>
//               {business.rating && (
//                 <span className="flex items-center gap-1 text-xs font-bold text-secondary flex-shrink-0">
//                   <Star className="w-3.5 h-3.5 fill-current" /> {business.rating}
//                 </span>
//               )}
//             </div>
//             <p className="font-sans text-xs text-outline line-clamp-2 mb-3">
//               {business.description}
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-outline-variant/20">
//             <span className="font-sans text-xs text-outline flex items-center gap-1">
//               <MapPin className="w-3.5 h-3.5" />
//               {business.distance || business.location}
//             </span>
//             <div className="flex items-center gap-2">
//               <a
//                 href={`tel:${business.phone}`}
//                 className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Phone className="w-3.5 h-3.5" /> Call
//               </a>
//               <Link
//                 to={profileUrl}
//                 className="px-4 py-1.5 bg-primary-container text-on-primary rounded-lg text-xs font-semibold hover:bg-primary transition-colors inline-flex items-center gap-1"
//               >
//                 View Details <ChevronRight className="w-3.5 h-3.5" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-surface rounded-[12px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden hover:shadow-[0_12px_20px_-4px_rgb(0,0,0,0.12)] transition-all flex flex-col group">
//       <Link to={profileUrl} className="relative w-full aspect-[16/9] bg-surface-variant overflow-hidden block">
//         <img
//           src={business.image}
//           alt={business.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
//         <span className="absolute top-3 left-3 bg-surface/95 backdrop-blur-sm text-on-surface text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
//           {business.category}
//         </span>
//         {business.verified && (
//           <span className="absolute top-3 right-3 bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
//             <BadgeCheck className="w-3.5 h-3.5" />
//           </span>
//         )}
//         {business.rating && (
//           <span className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-bold text-white">
//             <Star className="w-3 h-3 fill-secondary text-secondary" /> {business.rating}
//             {business.reviewCount && <span className="font-normal text-white/70">({business.reviewCount})</span>}
//           </span>
//         )}
//       </Link>
//       <div className="p-5 flex-1 flex flex-col justify-between">
//         <Link to={profileUrl}>
//           <h3 className="font-headline text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors mb-2">
//             {business.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-outline-variant/20">
//           <p className="font-sans text-xs text-outline flex items-center gap-1 min-w-0">
//             <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
//             <span className="truncate">{business.distance || business.location}</span>
//           </p>
//           {business.phone && (
//             <a
//               href={`tel:${business.phone}`}
//               onClick={(e) => e.stopPropagation()}
//               className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
//               aria-label={`Call ${business.name}`}
//             >
//               <Phone className="w-3.5 h-3.5" />
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ChevronRight, Star, BadgeCheck } from 'lucide-react';

export const BusinessCard = ({ business, layout = 'grid' }) => {
  const profileUrl = `/${business.slug || business.id}`;

  if (layout === 'list') {
    return (
      <div className="bg-white shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] overflow-hidden border border-[#241F1A]/10 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)] transition-all flex flex-col sm:flex-row group">
        <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-[#241F1A]/5 overflow-hidden">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#241F1A] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {business.category}
          </span>
          {business.verified && (
            <span className="absolute top-3 right-3 bg-[#16292C] text-[#FBF6EC] w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <BadgeCheck className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2 mb-1">
              <Link to={profileUrl} className="hover:text-[#16292C] transition-colors min-w-0">
                <h3 className="font-headline text-lg font-bold text-[#241F1A] line-clamp-1">
                  {business.name}
                </h3>
              </Link>
              {business.rating && (
                <span className="flex items-center gap-1 text-xs font-bold text-[#B94630] flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" /> {business.rating}
                </span>
              )}
            </div>
            <p className="font-sans text-xs text-[#241F1A]/50 line-clamp-2 mb-3">
              {business.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#241F1A]/10">
            <span className="font-sans text-xs text-[#241F1A]/50 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {business.distance || business.location}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${business.phone}`}
                className="p-2 text-[#16292C] hover:bg-[#16292C]/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <Link
                to={profileUrl}
                className="px-4 py-1.5 bg-[#16292C] text-[#FBF6EC] rounded-lg text-xs font-semibold hover:bg-[#2f756d] transition-colors inline-flex items-center gap-1"
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
    <div className="bg-white rounded-[12px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden hover:shadow-[0_12px_20px_-4px_rgb(0,0,0,0.12)] transition-all flex flex-col group">
      <Link to={profileUrl} className="relative w-full aspect-[16/9] bg-[#241F1A]/5 overflow-hidden block">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#241F1A] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {business.category}
        </span>
        {business.verified && (
          <span className="absolute top-3 right-3 bg-[#16292C] text-[#FBF6EC] w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
            <BadgeCheck className="w-3.5 h-3.5" />
          </span>
        )}
        {business.rating && (
          <span className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-bold text-white">
            <Star className="w-3 h-3 fill-[#E8A23D] text-[#E8A23D]" /> {business.rating}
            {business.reviewCount && <span className="font-normal text-white/70">({business.reviewCount})</span>}
          </span>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <Link to={profileUrl}>
          <h3 className="font-headline text-base font-bold text-[#241F1A] line-clamp-1 group-hover:text-[#16292C] transition-colors mb-2">
            {business.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-[#241F1A]/10">
          <p className="font-sans text-xs text-[#241F1A]/50 flex items-center gap-1 min-w-0">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{business.distance || business.location}</span>
          </p>
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 text-[#16292C] hover:bg-[#16292C]/10 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Call ${business.name}`}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};