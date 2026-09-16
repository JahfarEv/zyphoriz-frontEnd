// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import {
//   MapPin,
//   Phone,
//   Globe,
//   Instagram,
//   Facebook,
//   Youtube,
//   Clock,
//   ShieldCheck,
//   MessageCircle,
//   CheckCircle2,
//   X,
// } from 'lucide-react';
// import { Button } from '../../components/common/Button';
// import { Badge } from '../../components/common/Badge';
// import { api } from '../../lib/api';
// import { useRegistration } from '../../context/RegistrationContext';
// import { Helmet } from "react-helmet-async";
// const getYouTubeEmbedUrl = (url) => {
//   if (!url) return '';
//   try {
//     const parsedUrl = new URL(url);
//     const videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').filter(Boolean).pop();
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
//   } catch {
//     return '';
//   }
// };

// export const BusinessProfile = () => {
//   const { slug } = useParams();
//   const { formData, registrationCompleted } = useRegistration();

//   // Try newly created business from context if just redirected from registration
//   const contextBusiness = registrationCompleted && formData.slug === slug
//     ? {
//         id: formData.slug,
//         slug: formData.slug,
//         name: formData.name,
//         category: formData.categoryName,
//         categoryId: formData.category,
//         phone: formData.phone,
//         whatsapp: formData.whatsapp,
//         email: formData.email,
//         website: formData.website,
//         instagram: formData.instagram,
//         facebook: formData.facebook,
//         youtube: formData.youtube,
//         video: formData.video,
//         location: `${formData.address}, ${formData.city}`,
//         city: formData.city,
//         description: formData.description,
//         verified: true,
//         trending: false,
//         rating: null,
//         reviewCount: 0,
//         hours: [],
//         services: [],
//         gallery: [],
//         image: null,
//         coverImage: null,
//       }
//     : null;

//   const [business, setBusiness] = useState(contextBusiness);
//   const [loading, setLoading] = useState(!contextBusiness);
//   const [error, setError] = useState('');
//   const [selectedPhoto, setSelectedPhoto] = useState(null);

//   React.useEffect(() => {
//     if (contextBusiness) {
//       setBusiness(contextBusiness);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     api.businesses.bySlug(slug)
//       .then((data) => setBusiness(data.business))
//       .catch((requestError) => setError(requestError.message))
//       .finally(() => setLoading(false));
//   }, [slug, contextBusiness]);

//   React.useEffect(() => {
//     if (!selectedPhoto) return undefined;
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') setSelectedPhoto(null);
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [selectedPhoto]);

//   if (loading) {
//     return <div className="py-20 text-center text-on-surface-variant">Loading profile...</div>;
//   }

//   if (!business) {
//     return (
//       <main className="w-full px-4 py-20 text-center">
//         <div className="text-6xl mb-4">🔍</div>
//         <h1 className="font-headline text-2xl font-bold text-on-surface mb-2">Business Not Found</h1>
//         <p className="font-sans text-sm text-on-surface-variant mb-6">
//           {error || "This business page doesn't exist or may have been removed."}
//         </p>
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
//         >
//           Back to Home
//         </Link>
//       </main>
//     );
//   }

//   const whatsappNumber = (business.whatsapp || business.phone || '').replace(/[^0-9]/g, '');
//   const youtubeEmbedUrl = getYouTubeEmbedUrl(business.video);
//   const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${business.name} ${business.city || ''}`.trim())}`;
//   const mapQuery = business.location || [business.address, business.city].filter(Boolean).join(', ');
//   const mapEmbedUrl = mapQuery
//     ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
//     : '';
// const shareUrl = `${window.location.origin}/business/${business.slug}`;

// const shareImage =
//   business.coverImage ||
//   business.image ||
//   `${window.location.origin}/default-business-image.jpg`;

// const shareTitle = `${business.name} | Zyphoriz`;

// const shareDescription =
//   business.description ||
//   `Discover ${business.name} on Zyphoriz.`;
//   return (
//     <div className="w-full min-h-screen bg-[radial-gradient(circle_at_8%_38%,rgba(232,162,61,0.22),transparent_24%),radial-gradient(circle_at_92%_68%,rgba(185,70,48,0.18),transparent_26%),linear-gradient(135deg,#fbf6ec_0%,#e7f0e8_48%,#f8e5d9_100%)] pb-12 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-30 pointer-events-none [background-image:linear-gradient(rgba(22,41,44,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(22,41,44,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
//       {/* Cover Banner */}
//       <section className="w-full h-56 md:h-80 relative bg-primary overflow-hidden">
//         {business.coverImage || business.image ? (
//           <img
//             src={business.coverImage || business.image}
//             alt={business.name}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(232,162,61,0.55),transparent_32%),linear-gradient(135deg,#16292c_0%,#2f756d_55%,#b94630_100%)] flex items-center justify-center">
//             <span className="font-headline text-8xl md:text-9xl font-black text-white/15">
//               {business.name.charAt(0)}
//             </span>
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
//         <div className="absolute left-4 md:left-8 bottom-5 flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide uppercase">
//           <span className="h-2 w-2 rounded-full bg-tertiary" /> Local business profile
//         </div>
//       </section>

//       {/* Main Container */}
//       <div className="w-full px-4 md:px-6 relative -mt-12 md:-mt-16">
//         {/* Header Card */}
//         <div className="bg-surface rounded-3xl shadow-[0_18px_50px_rgba(36,31,26,0.14)] p-5 md:p-7 flex flex-col md:flex-row gap-5 items-start md:items-center border border-white/80 mb-8">
//           {/* Logo */}
//           <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-tertiary to-secondary border-4 border-white shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
//             {business.image ? (
//               <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
//             ) : (
//               <span className="font-headline text-3xl font-black text-white">
//                 {business.name.charAt(0)}
//               </span>
//             )}
//           </div>

//           {/* Info */}
//           <div className="flex-grow">
//             <div className="flex items-center gap-2 flex-wrap mb-1">
//               <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
//                 {business.name}
//               </h1>
//               {business.verified && <Badge variant="verified">Verified</Badge>}
//             </div>
//             <p className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wide text-secondary mb-2">{business.category}</p>
//             {business.location && (
//               <p className="font-sans text-xs text-outline flex items-center gap-1">
//                 <MapPin className="w-3.5 h-3.5" /> {business.location}
//               </p>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/20">
//             {business.phone && (
//               <a href={`tel:${business.phone}`} className="flex-1 md:flex-none">
//                 <button className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-secondary/90 transition-all text-sm shadow-sm">
//                   <Phone className="w-4 h-4" /> Call Now
//                 </button>
//               </a>
//             )}
//             {whatsappNumber && (
//               <a
//                 href={`https://wa.me/${whatsappNumber}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex-1 md:flex-none"
//               >
//                 <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-green-600 transition-all text-sm">
//                   <MessageCircle className="w-4 h-4" /> WhatsApp
//                 </button>
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Main Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* About */}
//             <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
//               <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-secondary/10" />
//               <h2 className="relative font-headline text-lg font-bold text-on-surface mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-secondary" /> About</h2>
//               <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
//                 {business.description || 'No description provided.'}
//               </p>
//             </div>

//             {/* Services */}
//             {business.services && business.services.length > 0 && (
//               <div className="bg-surface-container-lowest border border-tertiary/30 rounded-2xl p-6 shadow-sm">
//                 <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-tertiary" /> Services</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                   {business.services.map((svc, i) => (
//                     <div key={i} className="flex items-center gap-2 font-sans text-sm text-on-surface">
//                       <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
//                       <span>{svc}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="bg-surface-container-lowest border border-primary/15 rounded-2xl p-6 shadow-sm">
//               <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
//                 <Youtube className="w-5 h-5 text-secondary" /> Discover more
//               </h2>
//               {youtubeEmbedUrl ? (
//                 <div className="aspect-video overflow-hidden rounded-xl bg-on-surface">
//                   <iframe
//                     src={youtubeEmbedUrl}
//                     title={`${business.name} video`}
//                     className="w-full h-full"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <div className="relative overflow-hidden rounded-xl bg-primary-container min-h-48 flex items-end">
//                   {business.coverImage || business.image ? (
//                     <img
//                       src={business.coverImage || business.image}
//                       alt=""
//                       className="absolute inset-0 w-full h-full object-cover opacity-45"
//                     />
//                   ) : null}
//                   <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/45 to-transparent" />
//                   <div className="relative z-10 p-5 text-white">
//                     <p className="text-sm font-semibold mb-1">Want to see more from {business.name}?</p>
//                     <p className="text-xs text-white/80 mb-4">
//                       Explore related videos, reviews, and local content on YouTube.
//                     </p>
//                     <a
//                       href={youtubeSearchUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary hover:bg-surface-bright"
//                     >
//                       <Youtube className="w-4 h-4" /> Search YouTube
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Gallery */}
//             {business.gallery && business.gallery.length > 0 && (
//               <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-6 shadow-sm">
//                 <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-secondary" /> Photos</h2>
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//                   {business.gallery.map((img, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       onClick={() => setSelectedPhoto(img)}
//                       className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-variant cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                       aria-label={`Open photo ${i + 1}`}
//                     >
//                       <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-5">
//             {/* Contact */}
//             <div className="bg-surface-container-lowest border border-primary/20 rounded-2xl p-5 shadow-sm space-y-3">
//               <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2"><span className="h-5 w-1 rounded-full bg-primary" /> Contact Info</h3>
//               {business.location && (
//                 <div className="flex items-start gap-3 text-sm">
//                   <MapPin className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
//                   <span className="font-sans text-on-surface-variant">{business.location}</span>
//                 </div>
//               )}
//               {business.phone && (
//                 <div className="flex items-center gap-3 text-sm">
//                   <Phone className="w-4 h-4 text-outline flex-shrink-0" />
//                   <a href={`tel:${business.phone}`} className="font-sans text-on-surface-variant hover:text-primary">
//                     {business.phone}
//                   </a>
//                 </div>
//               )}
//               {business.website && (
//                 <div className="flex items-center gap-3 text-sm">
//                   <Globe className="w-4 h-4 text-outline flex-shrink-0" />
//                   <a
//                     href={business.website}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-sans text-primary hover:underline truncate text-xs"
//                   >
//                     {business.website.replace(/^https?:\/\//, '')}
//                   </a>
//                 </div>
//               )}
//               {(business.instagram || business.facebook || business.youtube) && (
//                 <div className="pt-2 border-t border-outline-variant/20">
//                   <p className="font-sans text-xs font-semibold text-on-surface mb-2">Follow us</p>
//                   <div className="flex flex-wrap gap-2">
//                     {business.instagram && (
//                       <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-2 text-xs font-semibold text-secondary hover:bg-secondary/20">
//                         <Instagram className="w-4 h-4" /> Instagram
//                       </a>
//                     )}
//                     {business.facebook && (
//                       <a href={business.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20">
//                         <Facebook className="w-4 h-4" /> Facebook
//                       </a>
//                     )}
//                     {business.youtube && (
//                       <a href={business.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="inline-flex items-center gap-1.5 rounded-lg bg-error/10 px-3 py-2 text-xs font-semibold text-error hover:bg-error/20">
//                         <Youtube className="w-4 h-4" /> YouTube
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {mapEmbedUrl && (
//               <div className="bg-surface-container-lowest border border-tertiary/30 rounded-2xl p-5 shadow-sm">
//                 <div className="flex items-center justify-between gap-3 mb-3">
//                   <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-primary" /> Location
//                   </h3>
//                   <a
//                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-xs font-semibold text-primary hover:underline"
//                   >
//                     Open map
//                   </a>
//                 </div>
//                 <div className="aspect-[4/3] overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-variant">
//                   <iframe
//                     title={`${business.name} location map`}
//                     src={mapEmbedUrl}
//                     className="w-full h-full border-0"
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Hours */}
//             {business.hours && business.hours.length > 0 && (
//               <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-5 shadow-sm">
//                 <h3 className="font-headline text-base font-bold text-on-surface mb-3 flex items-center gap-2">
//                   <Clock className="w-4 h-4 text-primary" /> Opening Hours
//                 </h3>
//                 <div className="space-y-2">
//                   {business.hours.map((h, i) => (
//                     <div key={i} className="flex justify-between font-sans text-xs py-1 border-b border-outline-variant/10 last:border-0">
//                       <span className="text-on-surface-variant">{h.day}</span>
//                       <span className="font-semibold text-on-surface">{h.time}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* List your business CTA */}
//             <div className="bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] rounded-2xl min-h-[190px] px-5 py-8 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
//               <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border-[16px] border-tertiary/30" />
//               <div className="absolute -left-10 -bottom-12 h-32 w-32 rounded-full border-[18px] border-secondary/30" />
//               <p className="font-headline text-sm font-bold text-on-primary mb-1">Own a Business?</p>
//               <p className="font-sans text-xs text-on-primary/80 mb-3">Get listed for just ₹499</p>
//               <Link
//                 to={`/create${business.ownerReferralCode ? `?referral=${encodeURIComponent(business.ownerReferralCode)}` : ''}`}
//                 className="inline-flex items-center justify-center gap-1.5 bg-white text-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-surface-bright transition-all text-xs"
//               >
//                 List My Business →
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedPhoto && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Expanded business photo"
//           onClick={() => setSelectedPhoto(null)}
//         >
//           <button
//             type="button"
//             onClick={() => setSelectedPhoto(null)}
//             className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
//             aria-label="Close expanded photo"
//           >
//             <X className="h-6 w-6" />
//           </button>
//           <img
//             src={selectedPhoto}
//             alt="Expanded business photo"
//             className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
//             onClick={(event) => event.stopPropagation()}
//           />
//         </div>
//       )}
//     </div>
//   );
// };








import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Clock,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { api } from '../../lib/api';
import { useRegistration } from '../../context/RegistrationContext';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch {
    return '';
  }
};

export const BusinessProfile = () => {
  const { slug } = useParams();
  const { formData, registrationCompleted } = useRegistration();

  // Try newly created business from context if just redirected from registration
  const contextBusiness = registrationCompleted && formData.slug === slug
    ? {
        id: formData.slug,
        slug: formData.slug,
        name: formData.name,
        category: formData.categoryName,
        categoryId: formData.category,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        website: formData.website,
        instagram: formData.instagram,
        facebook: formData.facebook,
        youtube: formData.youtube,
        video: formData.video,
        location: `${formData.address}, ${formData.city}`,
        city: formData.city,
        description: formData.description,
        verified: true,
        trending: false,
        rating: null,
        reviewCount: 0,
        hours: [],
        services: [],
        gallery: [],
        image: null,
        coverImage: null,
      }
    : null;

  const [business, setBusiness] = useState(contextBusiness);
  const [loading, setLoading] = useState(!contextBusiness);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  React.useEffect(() => {
    if (contextBusiness) {
      setBusiness(contextBusiness);
      setLoading(false);
      return;
    }
    setLoading(true);
    api.businesses.bySlug(slug)
      .then((data) => setBusiness(data.business))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [slug, contextBusiness]);

  React.useEffect(() => {
    if (!selectedPhoto) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant">Loading profile...</div>;
  }

  if (!business) {
    return (
      <main className="w-full px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-headline text-2xl font-bold text-on-surface mb-2">Business Not Found</h1>
        <p className="font-sans text-sm text-on-surface-variant mb-6">
          {error || "This business page doesn't exist or may have been removed."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const whatsappNumber = (business.whatsapp || business.phone || '').replace(/[^0-9]/g, '');
  const youtubeEmbedUrl = getYouTubeEmbedUrl(business.video);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${business.name} ${business.city || ''}`.trim())}`;
  const mapQuery = business.location || [business.address, business.city].filter(Boolean).join(', ');
  const mapEmbedUrl = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    : '';

  const shareUrl = `${window.location.origin}/${business.slug}`;
  const shareImage = business.coverImage || business.image || `${window.location.origin}/default-business-image.jpg`;
  const shareTitle = `${business.name} | Zyphoriz`;
  const shareDescription = business.description || `Discover ${business.name} on Zyphoriz.`;

  return (
    <>
      <Helmet>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:alt" content={business.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta name="twitter:description" content={shareDescription} />
        <meta name="twitter:image" content={shareImage} />
      </Helmet>

      <div className="w-full min-h-screen bg-[radial-gradient(circle_at_8%_38%,rgba(232,162,61,0.22),transparent_24%),radial-gradient(circle_at_92%_68%,rgba(185,70,48,0.18),transparent_26%),linear-gradient(135deg,#fbf6ec_0%,#e7f0e8_48%,#f8e5d9_100%)] pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none [background-image:linear-gradient(rgba(22,41,44,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(22,41,44,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      {/* Cover Banner */}
      <section className="w-full h-56 md:h-80 relative bg-primary overflow-hidden">
        {business.coverImage || business.image ? (
          <img
            src={business.coverImage || business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(232,162,61,0.55),transparent_32%),linear-gradient(135deg,#16292c_0%,#2f756d_55%,#b94630_100%)] flex items-center justify-center">
            <span className="font-headline text-8xl md:text-9xl font-black text-white/15">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
        <div className="absolute left-4 md:left-8 bottom-5 flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide uppercase">
          <span className="h-2 w-2 rounded-full bg-tertiary" /> Local business profile
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full px-4 md:px-6 relative -mt-12 md:-mt-16">
        {/* Header Card */}
        <div className="bg-surface rounded-3xl shadow-[0_18px_50px_rgba(36,31,26,0.14)] p-5 md:p-7 flex flex-col md:flex-row gap-5 items-start md:items-center border border-white/80 mb-8">
          {/* Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-tertiary to-secondary border-4 border-white shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
            {business.image ? (
              <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-headline text-3xl font-black text-white">
                {business.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
                {business.name}
              </h1>
              {business.verified && <Badge variant="verified">Verified</Badge>}
            </div>
            <p className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wide text-secondary mb-2">{business.category}</p>
            {business.location && (
              <p className="font-sans text-xs text-outline flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {business.location}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/20">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="flex-1 md:flex-none">
                <button className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-secondary/90 transition-all text-sm shadow-sm">
                  <Phone className="w-4 h-4" /> Call Now
                </button>
              </a>
            )}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-green-600 transition-all text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </a>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-secondary/10" />
              <h2 className="relative font-headline text-lg font-bold text-on-surface mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-secondary" /> About</h2>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {business.description || 'No description provided.'}
              </p>
            </div>

            {/* Services */}
            {business.services && business.services.length > 0 && (
              <div className="bg-surface-container-lowest border border-tertiary/30 rounded-2xl p-6 shadow-sm">
                <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-tertiary" /> Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {business.services.map((svc, i) => (
                    <div key={i} className="flex items-center gap-2 font-sans text-sm text-on-surface">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-surface-container-lowest border border-primary/15 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-secondary" /> Discover more
              </h2>
              {youtubeEmbedUrl ? (
                <div className="aspect-video overflow-hidden rounded-xl bg-on-surface">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${business.name} video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl bg-primary-container min-h-48 flex items-end">
                  {business.coverImage || business.image ? (
                    <img
                      src={business.coverImage || business.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-45"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/45 to-transparent" />
                  <div className="relative z-10 p-5 text-white">
                    <p className="text-sm font-semibold mb-1">Want to see more from {business.name}?</p>
                    <p className="text-xs text-white/80 mb-4">
                      Explore related videos, reviews, and local content on YouTube.
                    </p>
                    <a
                      href={youtubeSearchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary hover:bg-surface-bright"
                    >
                      <Youtube className="w-4 h-4" /> Search YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery */}
            {business.gallery && business.gallery.length > 0 && (
              <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-6 shadow-sm">
                <h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-secondary" /> Photos</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {business.gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPhoto(img)}
                      className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-variant cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`Open photo ${i + 1}`}
                    >
                      <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Contact */}
            <div className="bg-surface-container-lowest border border-primary/20 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2"><span className="h-5 w-1 rounded-full bg-primary" /> Contact Info</h3>
              {business.location && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-on-surface-variant">{business.location}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-outline flex-shrink-0" />
                  <a href={`tel:${business.phone}`} className="font-sans text-on-surface-variant hover:text-primary">
                    {business.phone}
                  </a>
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-outline flex-shrink-0" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-primary hover:underline truncate text-xs"
                  >
                    {business.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {(business.instagram || business.facebook || business.youtube) && (
                <div className="pt-2 border-t border-outline-variant/20">
                  <p className="font-sans text-xs font-semibold text-on-surface mb-2">Follow us</p>
                  <div className="flex flex-wrap gap-2">
                    {business.instagram && (
                      <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-2 text-xs font-semibold text-secondary hover:bg-secondary/20">
                        <Instagram className="w-4 h-4" /> Instagram
                      </a>
                    )}
                    {business.facebook && (
                      <a href={business.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20">
                        <Facebook className="w-4 h-4" /> Facebook
                      </a>
                    )}
                    {business.youtube && (
                      <a href={business.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="inline-flex items-center gap-1.5 rounded-lg bg-error/10 px-3 py-2 text-xs font-semibold text-error hover:bg-error/20">
                        <Youtube className="w-4 h-4" /> YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {mapEmbedUrl && (
              <div className="bg-surface-container-lowest border border-tertiary/30 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Location
                  </h3>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Open map
                  </a>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-variant">
                  <iframe
                    title={`${business.name} location map`}
                    src={mapEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}

            {/* Hours */}
            {business.hours && business.hours.length > 0 && (
              <div className="bg-surface-container-lowest border border-secondary/20 rounded-2xl p-5 shadow-sm">
                <h3 className="font-headline text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Opening Hours
                </h3>
                <div className="space-y-2">
                  {business.hours.map((h, i) => (
                    <div key={i} className="flex justify-between font-sans text-xs py-1 border-b border-outline-variant/10 last:border-0">
                      <span className="text-on-surface-variant">{h.day}</span>
                      <span className="font-semibold text-on-surface">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List your business CTA */}
            <div className="bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] rounded-2xl min-h-[190px] px-5 py-8 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border-[16px] border-tertiary/30" />
              <div className="absolute -left-10 -bottom-12 h-32 w-32 rounded-full border-[18px] border-secondary/30" />
              <p className="font-headline text-sm font-bold text-on-primary mb-1">Own a Business?</p>
              <p className="font-sans text-xs text-on-primary/80 mb-3">Get listed for just ₹499</p>
              <Link
                to={`/create${business.ownerReferralCode ? `?referral=${encodeURIComponent(business.ownerReferralCode)}` : ''}`}
                className="inline-flex items-center justify-center gap-1.5 bg-white text-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-surface-bright transition-all text-xs"
              >
                List My Business →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded business photo"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close expanded photo"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Expanded business photo"
            className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
      </div>
    </>
  );
};
