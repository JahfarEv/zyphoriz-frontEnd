// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { QRCodeSVG } from 'qrcode.react';
// import html2canvas from 'html2canvas';
// import {
//   Phone,
//   MessageCircle,
//   Mail,
//   Globe,
//   MapPin,
//   Clock,
//   Share2,
//   Download,
//   ShieldCheck,
//   Star,
//   ChevronLeft,
//   Loader2,
//   AlertCircle,
//   BadgeCheck,
//   Instagram,
//   Facebook,
//   Youtube,
//   Linkedin,
//   Twitter,
// } from 'lucide-react';
// import { api } from '../../lib/api';
// import { getTemplateConfig } from '../../data/templates';

// const ACCENT = '#14b8a6';
// const ACCENT_SOFT = '#5eead4';
// const AMBER = '#E8A23D';

// // Map social platform names to icons
// const SOCIAL_ICONS = {
//   instagram: Instagram,
//   facebook: Facebook,
//   youtube: Youtube,
//   linkedin: Linkedin,
//   twitter: Twitter,
//   x: Twitter,
//   website: Globe,
// };

// export const PublicBusinessCard = () => {
//   const { slug } = useParams();
//   const cardRef = useRef(null);

//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (!slug) return;
//     setLoading(true);
//     setError('');

//     api.businesses
//       .getBySlug(slug)
//       .then((data) => {
//         setBusiness(data.business || data);
//       })
//       .catch((err) => {
//         setError(err.message || 'Business not found');
//       })
//       .finally(() => setLoading(false));
//   }, [slug]);

//   // ---- Handlers ----
//   const handleCall = () => {
//     if (business?.phone) window.location.href = `tel:${business.phone}`;
//   };

//   const handleWhatsApp = () => {
//     const number = business?.whatsapp || business?.phone;
//     if (number) {
//       const clean = number.replace(/[^0-9]/g, '');
//       window.open(`https://wa.me/${clean}`, '_blank');
//     }
//   };

//   const handleEmail = () => {
//     if (business?.email) window.location.href = `mailto:${business.email}`;
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: business?.name || 'Business Card',
//           text: `Check out ${business?.name} on Zyphoriz`,
//           url,
//         });
//       } catch (e) {
//         /* user cancelled */
//       }
//     } else {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleDownloadCard = async () => {
//     if (!cardRef.current) return;
//     try {
//       const canvas = await html2canvas(cardRef.current, {
//         backgroundColor: '#16292C',
//         scale: 2,
//       });
//       const link = document.createElement('a');
//       link.download = `${slug}-business-card.png`;
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//     } catch (e) {
//       console.error('Download failed', e);
//     }
//   };

//   // ---- Loading State ----
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#16292C] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 text-[#5eead4] animate-spin mx-auto mb-4" />
//           <p className="font-sans text-sm text-white/60">Loading business card...</p>
//         </div>
//       </div>
//     );
//   }

//   // ---- Error State ----
//   if (error || !business) {
//     return (
//       <div className="min-h-screen bg-[#16292C] flex items-center justify-center px-4">
//         <div className="max-w-md w-full bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
//           <div className="w-14 h-14 rounded-2xl bg-[#B94630]/15 border border-[#B94630]/30 flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-6 h-6 text-[#B94630]" />
//           </div>
//           <h1 className="font-headline text-xl font-bold text-white mb-2">
//             Business not found
//           </h1>
//           <p className="font-sans text-sm text-white/60 mb-6">
//             {error || 'This business card does not exist or has been removed.'}
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 text-white font-sans font-bold px-6 py-3 rounded-xl text-sm transition-all
//                        bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
//                        hover:from-[#0d6b64] hover:to-[#0ea5a0]
//                        shadow-[0_14px_30px_-12px_rgba(20,184,166,0.65)]"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Go to homepage
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ---- Derived Data ----
//   const {
//     name,
//     category,
//     description,
//     phone,
//     whatsapp,
//     email,
//     website,
//     address,
//     hours,
//     socials = [],
//     photos = [],
//     verified,
//     rating,
//     reviews,
//     template,
//   } = business;

//   const formattedHours = Array.isArray(hours)
//     ? hours
//         .filter((entry) => entry && (entry.day || entry.time))
//         .map((entry) => `${entry.day || ''}${entry.time ? `: ${entry.time}` : ''}`.trim())
//         .filter(Boolean)
//         .join(' • ')
//     : hours || '';

//   const templateConfig = getTemplateConfig(template || 'classic');
//   const publicUrl = window.location.href;
//   const displayPhotos = photos.slice(0, 3);

//   return (
//     <div className="w-full min-h-screen bg-[#16292C] text-white">
//       {/* Back to home (optional, can remove if not needed) */}
//       <div className="max-w-2xl mx-auto px-4 pt-6">
//         <Link
//           to="/"
//           className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-white/50 hover:text-[#5eead4] transition-colors"
//         >
//           <ChevronLeft className="w-3.5 h-3.5" />
//           Back to Zyphoriz
//         </Link>
//       </div>

//       {/* Main Card */}
//       <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
//         <div
//           ref={cardRef}
//           className="relative bg-white/[0.04] backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
//         >
//           {/* Decorative top gradient */}
//           <div className="h-28 relative" style={{ background: templateConfig.gradient }}>
//             <div
//               className="absolute inset-0 opacity-[0.12]"
//               style={{
//                 backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
//                 backgroundSize: '18px 18px',
//               }}
//             />
//           </div>

//           {/* Profile / Logo */}
//           <div className="px-6 pb-6 -mt-14 relative z-10">
//             <div className="flex flex-col items-center text-center">
//               <div className="w-24 h-24 rounded-2xl bg-[#16292C] border-4 border-[#16292C] shadow-lg flex items-center justify-center overflow-hidden mb-3">
//                 {business.logo ? (
//                   <img
//                     src={business.logo}
//                     alt={name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-3xl font-headline font-bold text-[#5eead4]">
//                     {name?.charAt(0)?.toUpperCase() || '?'}
//                   </span>
//                 )}
//               </div>

//               {/* Name + Verified */}
//               <h1 className="font-headline text-2xl font-bold text-white flex items-center justify-center gap-2">
//                 {name}
//                 {verified && (
//                   <BadgeCheck className="w-5 h-5 text-[#5eead4]" title="Verified business" />
//                 )}
//               </h1>

//               {/* Category */}
//               {category && (
//                 <p className="font-sans text-sm text-[#E8A23D] font-semibold mt-1">
//                   {category}
//                 </p>
//               )}

//               {/* Rating */}
//               {rating > 0 && (
//                 <div className="flex items-center gap-1.5 mt-2">
//                   <div className="flex items-center gap-0.5">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-3.5 h-3.5 ${
//                           i < Math.round(rating)
//                             ? 'text-[#E8A23D] fill-current'
//                             : 'text-white/20'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="font-sans text-xs text-white/60">
//                     {rating.toFixed(1)} ({reviews || 0} reviews)
//                   </span>
//                 </div>
//               )}

//               {/* Description */}
//               {description && (
//                 <p className="font-sans text-sm text-white/70 leading-relaxed mt-4 max-w-md">
//                   {description}
//                 </p>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-3 gap-3 mt-6">
//               {phone && (
//                 <button
//                   onClick={handleCall}
//                   className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-[#14b8a6]/20 hover:border-[#14b8a6]/40 transition-all"
//                 >
//                   <Phone className="w-5 h-5 text-[#5eead4]" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     Call
//                   </span>
//                 </button>
//               )}

//               {(whatsapp || phone) && (
//                 <button
//                   onClick={handleWhatsApp}
//                   className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 transition-all"
//                 >
//                   <MessageCircle className="w-5 h-5 text-[#25D366]" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     WhatsApp
//                   </span>
//                 </button>
//               )}

//               {email && (
//                 <button
//                   onClick={handleEmail}
//                   className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-[#E8A23D]/20 hover:border-[#E8A23D]/40 transition-all"
//                 >
//                   <Mail className="w-5 h-5 text-[#E8A23D]" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     Email
//                   </span>
//                 </button>
//               )}

//               {website && (
//                 <a
//                   href={website.startsWith('http') ? website : `https://${website}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-[#5eead4]/15 hover:border-[#5eead4]/40 transition-all"
//                 >
//                   <Globe className="w-5 h-5 text-[#5eead4]" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     Website
//                   </span>
//                 </a>
//               )}

//               {address && (
//                 <a
//                   href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-[#B94630]/20 hover:border-[#B94630]/40 transition-all"
//                 >
//                   <MapPin className="w-5 h-5 text-[#B94630]" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     Directions
//                   </span>
//                 </a>
//               )}

//               {formattedHours && (
//                 <div className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/[0.06] border border-white/10">
//                   <Clock className="w-5 h-5 text-white/60" />
//                   <span className="font-sans text-[11px] font-semibold text-white/80">
//                     {formattedHours}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Photos Gallery */}
//             {displayPhotos.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-headline text-sm font-bold text-white/80 mb-3">
//                   Photos
//                 </h2>
//                 <div className="grid grid-cols-3 gap-3">
//                   {displayPhotos.map((photo, index) => (
//                     <div
//                       key={index}
//                       className="aspect-square rounded-xl overflow-hidden bg-white/[0.06] border border-white/10"
//                     >
//                       <img
//                         src={photo}
//                         alt={`${name} photo ${index + 1}`}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Address Block */}
//             {address && (
//               <div className="mt-6 bg-white/[0.04] rounded-2xl border border-white/10 p-4 flex items-start gap-3">
//                 <MapPin className="w-4 h-4 text-[#E8A23D] flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="font-sans text-xs font-semibold text-white/50 mb-0.5">
//                     Address
//                   </p>
//                   <p className="font-sans text-sm text-white/80">{address}</p>
//                 </div>
//               </div>
//             )}

//             {/* Social Links */}
//             {socials.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-headline text-sm font-bold text-white/80 mb-3">
//                   Connect
//                 </h2>
//                 <div className="flex flex-wrap gap-3">
//                   {socials.map((social, index) => {
//                     const Icon =
//                       SOCIAL_ICONS[social.platform?.toLowerCase()] || Globe;
//                     return (
//                       <a
//                         key={index}
//                         href={social.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-all"
//                       >
//                         <Icon className="w-4 h-4 text-[#5eead4]" />
//                         <span className="font-sans text-xs font-semibold text-white/80 capitalize">
//                           {social.platform}
//                         </span>
//                       </a>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QR Code + Share */}
//             <div className="mt-6 bg-white/[0.04] rounded-2xl border border-white/10 p-5 flex flex-col sm:flex-row items-center gap-5">
//               <div className="bg-white p-3 rounded-xl flex-shrink-0">
//                 <QRCodeSVG
//                   value={publicUrl}
//                   size={100}
//                   bgColor="#FFFFFF"
//                   fgColor="#16292C"
//                   level="M"
//                 />
//               </div>
//               <div className="flex-1 text-center sm:text-left">
//                 <h3 className="font-headline text-sm font-bold text-white mb-1">
//                   Scan to visit
//                 </h3>
//                 <p className="font-sans text-xs text-white/50 mb-3">
//                   Point your camera at the QR code to open this card.
//                 </p>
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <button
//                     onClick={handleShare}
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-sans text-xs font-semibold hover:bg-[#14b8a6]/25 transition-all"
//                   >
//                     <Share2 className="w-3.5 h-3.5" />
//                     {copied ? 'Link copied!' : 'Share'}
//                   </button>
//                   <button
//                     onClick={handleDownloadCard}
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white/70 font-sans text-xs font-semibold hover:bg-white/[0.1] transition-all"
//                   >
//                     <Download className="w-3.5 h-3.5" />
//                     Save card
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Verified Badge Footer */}
//             {verified && (
//               <div className="mt-6 flex items-center justify-center gap-2 text-xs font-sans text-white/40">
//                 <ShieldCheck className="w-3.5 h-3.5 text-[#5eead4]" />
//                 Verified by Zyphoriz
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Powered by */}
//         <div className="text-center mt-8">
//           <p className="font-sans text-xs text-white/30">
//             Powered by{' '}
//             <Link to="/" className="text-[#5eead4] hover:underline font-semibold">
//               Zyphoriz
//             </Link>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };