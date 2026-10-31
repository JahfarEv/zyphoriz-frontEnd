// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   PlusCircle,
//   Sparkles,
//   Globe,
//   ShieldCheck,
//   Phone,
//   Star,
//   QrCode,
//   Edit3,
//   Share2,
//   ChevronDown,
//   BadgeCheck,
//   MapPin,
//   Image,
//   Clock,
//   MessageCircle,
//   Users,
//   Mail,
// } from "lucide-react";

// const AMBER = "#E8A23D";

// export const Home = () => {
//   const [openFaq, setOpenFaq] = useState(null);

//   const steps = [
//     {
//       icon: Edit3,
//       title: "Enter your business details",
//       desc: "Add your business name, category, description, phone, address, hours, photos, and social links.",
//     },
//     {
//       icon: Globe,
//       title: "Your page goes live",
//       desc: "We instantly create a clean, mobile-friendly page at zyphoriz.com/yourname.",
//     },
//     {
//       icon: Share2,
//       title: "Share your link",
//       desc: "Share your unique URL and QR code on WhatsApp, Instagram, or print it for your shop.",
//     },
//   ];

//   const features = [
//     {
//       icon: Globe,
//       title: "Your own business page",
//       desc: "A professional page at zyphoriz.com/yourname — no coding, no hosting, no designer needed.",
//     },
//     {
//       icon: Phone,
//       title: "Call, WhatsApp & directions",
//       desc: "One-tap buttons so customers can call you, message you on WhatsApp, or get directions instantly.",
//     },
//     {
//       icon: QrCode,
//       title: "QR code for your shop",
//       desc: "Print it on your counter, visiting card, packaging, or window. Customers scan and reach you.",
//     },
//     {
//       icon: MapPin,
//       title: "Address & hours",
//       desc: "Show your location, working hours, and a Google Maps link so customers find you easily.",
//     },
//     {
//       icon: Image,
//       title: "Photo gallery",
//       desc: "Display your shop, products, or work with a clean mobile-friendly gallery.",
//     },
//     {
//       icon: BadgeCheck,
//       title: "Verified badge",
//       desc: "A verified profile that builds trust and looks professional to every customer.",
//     },
//     {
//       icon: Users,
//       title: "Services & offerings",
//       desc: "List what you offer — services, products, or specialties — so customers know exactly what you do.",
//     },
//     {
//       icon: Edit3,
//       title: "Unlimited edits",
//       desc: "Update your details, offers, hours, or photos anytime. Your page stays live and current.",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Rahul Sharma",
//       role: "Owner, Sharma Electronics",
//       text: "I created my business page in 5 minutes. Customers now call me directly from my link.",
//     },
//     {
//       name: "Priya Mehta",
//       role: "Freelance Designer",
//       text: "My page looks professional. I shared it on Instagram and started getting inquiries.",
//     },
//     {
//       name: "Amit Verma",
//       role: "Local Grocery Store",
//       text: "The QR code is on my shop counter. It is so easy for customers to reach me.",
//     },
//   ];

//   const faqs = [
//     {
//       q: "Do I need a website to use this?",
//       a: "No. We host your business page for you at zyphoriz.com/yourname. You just share your link.",
//     },
//     {
//       q: "Can I edit my page later?",
//       a: "Yes. You can update your details, photos, hours, and links anytime.",
//     },
//     {
//       q: "How do customers find me?",
//       a: "Share your unique link or QR code on WhatsApp, Instagram, Google, or print it on your shop.",
//     },
//     {
//       q: "Is it suitable for local shops?",
//       a: "Absolutely. It is built for local shops, professionals, freelancers, and service providers.",
//     },
//     {
//       q: "What do I get with my page?",
//       a: "A mobile-friendly business page with call, WhatsApp, directions, photo gallery, services, verified badge, QR code, and more.",
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-[#16292C] text-white">
//       {/* HERO */}
//       <section className="relative pt-14 pb-20 px-4 md:px-8 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-[0.14]"
//           style={{
//             backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />
//         <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.18),transparent_55%)]" />

//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-[0_10px_30px_-10px_rgba(232,162,61,0.6)]">
//             <Sparkles className="w-4 h-4" />
//   Your Space. Your Identity. Your Link.
//           </div>

//           <h1 className="font-headline text-4xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
//             Everything about you,
//             <span className="block bg-gradient-to-r from-[#5eead4] to-[#E8A23D] bg-clip-text text-transparent">
//     All in One Link.
//             </span>
//           </h1>

//           <div className="w-16 h-1 bg-[#E8A23D] mx-auto mb-8 rounded-full" />

//        <p className="font-sans text-lg md:text-xl text-white/75 mb-5 max-w-2xl mx-auto leading-relaxed">
//   Create your own stunning digital page in minutes.
//   Showcase who you are, what you do, your work,
//   services, photos and contact details —
//   all in one place.
// </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/create"
//               className="inline-flex items-center gap-2 text-white font-sans font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-base
//                          bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
//                          hover:from-[#0d6b64] hover:to-[#0ea5a0]
//                          shadow-[0_18px_40px_-14px_rgba(20,184,166,0.7)]
//                          active:scale-[0.98]"
//             >
//               <PlusCircle className="w-5 h-5" />
//               Create your page
//               <ArrowRight className="w-5 h-5" />
//             </Link>

//             <a
//               href="#how-it-works"
//               className="inline-flex items-center gap-2 text-white/80 font-sans font-semibold px-6 py-4 rounded-2xl border border-white/15 hover:bg-white/[0.06] transition-all"
//             >
//               See how it works
//             </a>
//           </div>

//           <div className="flex items-center justify-center gap-2 mt-8 text-sm text-white/60">
//   <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
//   Made for individuals, creators, businesses & everyone.
// </div>

// <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-12 pt-8 border-t border-white/10">
//     <div>
//       <div className="text-2xl font-bold text-[#5eead4]">
//         One Link
//       </div>
//       <div className="text-sm text-white/60 mt-1">
//         Everything in one place
//       </div>
//     </div>

//     <div>
//       <div className="text-2xl font-bold text-[#E8A23D]">
//         No Code
//       </div>
//       <div className="text-sm text-white/60 mt-1">
//         Easy page builder
//       </div>
//     </div>

//     <div>
//       <div className="text-2xl font-bold text-[#5eead4]">
//         24/7
//       </div>
//       <div className="text-sm text-white/60 mt-1">
//         Your online presence
//       </div>
//     </div>
//   </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section
//         id="how-it-works"
//         className="relative py-16 px-4 md:px-8 border-t border-white/10"
//       >
//         <div
//           className="absolute inset-0 opacity-[0.08] pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />

//         <div className="max-w-5xl mx-auto relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               How it works
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               Three simple steps to get your business online and shareable.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {steps.map(({ icon: Icon, title, desc }, index) => (
//               <div
//                 key={title}
//                 className="relative bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 text-center"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mx-auto mb-4">
//                   <Icon className="w-6 h-6 text-[#5eead4]" />
//                 </div>
//                 <div className="absolute top-4 right-4 text-xs font-bold text-white/30">
//                   0{index + 1}
//                 </div>
//                 <h3 className="font-headline text-xl font-bold mb-2">
//                   {title}
//                 </h3>
//                 <p className="font-sans text-sm text-white/60">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               Everything your business page needs
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               A complete mobile-friendly page that works like a mini website —
//               without the cost or complexity.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map(({ icon: Icon, title, desc }) => (
//               <div
//                 key={title}
//                 className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all duration-200"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
//                   <Icon className="w-5 h-5 text-[#5eead4]" />
//                 </div>
//                 <h3 className="font-headline text-lg font-bold text-white mb-2">
//                   {title}
//                 </h3>
//                 <p className="font-sans text-sm text-white/60 leading-relaxed">
//                   {desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WHAT YOUR PAGE LOOKS LIKE — preview block */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               What your page looks like
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               A clean, mobile-first page with everything your customers need —
//               all in one place.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: Phone,
//                 label: "Contact",
//                 items: ["Call button", "WhatsApp chat", "Email link"],
//               },
//               {
//                 icon: MapPin,
//                 label: "Location",
//                 items: ["Full address", "Google Maps", "Working hours"],
//               },
//               {
//                 icon: Image,
//                 label: "Gallery",
//                 items: ["Shop photos", "Product images", "Work samples"],
//               },
//               {
//                 icon: MessageCircle,
//                 label: "Extras",
//                 items: ["Services list", "Social links", "QR code"],
//               },
//             ].map(({ icon: Icon, label, items }) => (
//               <div
//                 key={label}
//                 className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
//                   <Icon className="w-5 h-5 text-[#5eead4]" />
//                 </div>
//                 <h3 className="font-headline text-lg font-bold text-white mb-3">
//                   {label}
//                 </h3>
//                 <ul className="space-y-2">
//                   {items.map((item) => (
//                     <li
//                       key={item}
//                       className="font-sans text-sm text-white/60 flex items-center gap-2"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#E8A23D] flex-shrink-0" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       {/* <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               Loved by local business owners
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               Here is what early users are saying about their experience.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {testimonials.map((item) => (
//               <div
//                 key={item.name}
//                 className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6"
//               >
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-4 h-4 text-[#E8A23D] fill-current"
//                     />
//                   ))}
//                 </div>
//                 <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
//                   &ldquo;{item.text}&rdquo;
//                 </p>
//                 <div>
//                   <p className="font-sans text-sm font-bold text-white">
//                     {item.name}
//                   </p>
//                   <p className="font-sans text-xs text-white/50">{item.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* FAQ */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-3xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               Frequently asked questions
//             </h2>
//             <p className="font-sans text-white/60">
//               Everything you need to know before creating your business page.
//             </p>
//           </div>

//           <div className="space-y-3">
//             {faqs.map((faq, index) => {
//               const isOpen = openFaq === index;
//               return (
//                 <div
//                   key={faq.q}
//                   className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => setOpenFaq(isOpen ? null : index)}
//                     className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
//                   >
//                     <span className="font-sans text-sm md:text-base font-semibold text-white">
//                       {faq.q}
//                     </span>
//                     <ChevronDown
//                       className={`w-5 h-5 text-[#5eead4] flex-shrink-0 transition-transform duration-200 ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>
//                   {isOpen && (
//                     <div className="px-6 pb-5">
//                       <p className="font-sans text-sm text-white/60 leading-relaxed">
//                         {faq.a}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="relative py-16 px-4 md:px-8 overflow-hidden bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_100%)] shadow-[0_-12px_30px_rgba(22,41,44,0.35)]">
//         <div
//           className="absolute inset-0 opacity-[0.1] pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />
//         <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full border-[28px] border-white/10" />

//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-[#FBF6EC] text-[#B94630] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
//             <Star className="w-4 h-4 fill-current" />
//             Join 500+ business owners
//           </div>

//           <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to go live?
//           </h2>
//           <p className="font-sans text-lg text-white/90 mb-8 max-w-xl mx-auto">
//             Create your page and share it with customers today.
//           </p>

//           <Link
//             to="/create"
//             className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] active:scale-[0.98]"
//           >
//             <PlusCircle className="w-6 h-6" />
//             Create your page
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlusCircle,
  Sparkles,
  Globe,
  ShieldCheck,
  Phone,
  Star,
  QrCode,
  Edit3,
  Share2,
  ChevronDown,
  BadgeCheck,
  MapPin,
  Image,
  Clock,
  MessageCircle,
  Users,
  Mail,
  Store,
} from "lucide-react";

const AMBER = "#E8A23D";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.poketstor.platform&pcampaignid=web_share";

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      icon: Edit3,
      title: "Enter your business details",
      desc: "Add your business name, category, description, phone, address, hours, photos, and social links.",
    },
    {
      icon: Globe,
      title: "Your page goes live",
      desc: "We instantly create a clean, mobile-friendly page at zyphoriz.com/yourname.",
    },
    {
      icon: Share2,
      title: "Share your link",
      desc: "Share your unique URL and QR code on WhatsApp, Instagram, or print it for your shop.",
    },
  ];

  const features = [
    {
      icon: Globe,
      title: "Your own business page",
      desc: "A professional page at zyphoriz.com/yourname — no coding, no hosting, no designer needed.",
    },
    {
      icon: Phone,
      title: "Call, WhatsApp & directions",
      desc: "One-tap buttons so customers can call you, message you on WhatsApp, or get directions instantly.",
    },
  
    {
      icon: MapPin,
      title: "Address & hours",
      desc: "Show your location, working hours, and a Google Maps link so customers find you easily.",
    },
    {
      icon: Image,
      title: "Photo gallery",
      desc: "Add photos to make your page stand out and build trust with visitors.",
    },
    {
      icon: BadgeCheck,
      title: "Verified badge",
      desc: "A verified profile that builds trust and looks professional to every customer.",
    },
    {
      icon: Store,
      title: "Business & products listing",
      desc: "List your business along with your products so customers can discover and browse what you sell.",
    },
    {
      icon: Users,
      title: "Services & offerings",
      desc: "List what you offer — services, products, or specialties — so customers know exactly what you do.",
    },
    {
      icon: Edit3,
      title: "Unlimited edits",
      desc: "Update your details, offers, hours, or photos anytime. Your page stays live and current.",
    },
  ];

  
  const faqs = [
    {
      q: "Do I need a website to use this?",
      a: "No. We host your business page for you at zyphoriz.com/yourname. You just share your link.",
    },
    {
      q: "Can I edit my page later?",
      a: "Yes. You can update your details, photos, hours, and links anytime.",
    },
    {
      q: "How do customers find me?",
      a: "Share your unique link or QR code on WhatsApp, Instagram, Google, or print it on your shop.",
    },
    {
      q: "Is it suitable for local shops?",
      a: "Absolutely. It is built for local shops, professionals, freelancers, and service providers.",
    },
    {
      q: "What do I get with my page?",
      a: "A mobile-friendly business page with call, WhatsApp, directions, photo gallery, services, business & products listing, verified badge, QR code, and more.",
    },
    {
      q: "Can I also list my products?",
      a: "Yes. Along with your business profile you can list your products so customers can browse and discover everything you sell — available on the Android app.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#16292C] text-white">
      {/* HERO */}
      <section className="relative pt-16 pb-20 px-4 md:px-8 overflow-hidden">
  {/* Background patterns */}
  <div
    className="absolute inset-0 opacity-[0.14]"
    style={{
      backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
      backgroundSize: "22px 22px",
    }}
  />
  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.18),transparent_55%)]" />

  {/* Reduced max-width from 4xl to 3xl for better readability */}
  <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
    
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-[0_10px_30px_-10px_rgba(232,162,61,0.6)]">
      <Sparkles className="w-4 h-4" />
      Your Space. Your Identity. Your Link.
    </div>

    {/* Headline - Tightened leading and margin */}
    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
      Everything about you,
      <span className="block bg-gradient-to-r from-[#5eead4] to-[#E8A23D] bg-clip-text text-transparent mt-2">
        All in One Link.
      </span>
    </h1>

    {/* Subtext - Narrowed, increased line-height, lighter color for contrast */}
    <p className="font-sans text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
      Create your own stunning digital page in minutes. Showcase who you
      are, what you do, your work, services, photos and contact details —
      all in one place.
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
      <Link
        to="/create"
        className="inline-flex items-center justify-center gap-2 text-white font-sans font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-base w-full sm:w-auto
                   bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
                   hover:from-[#0d6b64] hover:to-[#0ea5a0]
                   shadow-[0_18px_40px_-14px_rgba(20,184,166,0.7)]
                   active:scale-[0.98]"
      >
        <PlusCircle className="w-5 h-5" />
        Create your page
        <ArrowRight className="w-5 h-5" />
      </Link>

      <a
        href="#how-it-works"
        className="inline-flex items-center justify-center gap-2 text-white/80 font-sans font-semibold px-6 py-3.5 rounded-xl border border-white/15 hover:bg-white/[0.06] transition-all w-full sm:w-auto"
      >
        See how it works
      </a>
    </div>

    {/* Trust line */}
    <div className="flex items-center justify-center gap-2 text-sm text-white/50">
      <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
      Made for individuals, creators, businesses & everyone.
    </div>

    {/* Stats strip */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-8 border-t border-white/10 w-full max-w-2xl">
      {[
        { value: "One Link", label: "Everything in one place", color: "text-[#5eead4]" },
        { value: "No Code", label: "Easy page builder", color: "text-[#E8A23D]" },
        { value: "24/7", label: "Your online presence", color: "text-[#5eead4]" },
      ].map(({ value, label, color }) => (
        <div
          key={value}
          className="flex flex-col items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 px-4 py-5"
        >
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-sm text-white/50 mt-1 text-center leading-snug">
            {label}
          </div>
        </div>
      ))}
    </div>
    
  </div>
</section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative py-16 px-4 md:px-8 border-t border-white/10"
      >
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              How it works
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto">
              Three simple steps to get your business online and shareable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, desc }, index) => (
              <div
                key={title}
                className="relative bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#5eead4]" />
                </div>
                <div className="absolute top-4 right-4 text-xs font-bold text-white/30">
                  0{index + 1}
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">
                  {title}
                </h3>
                <p className="font-sans text-sm text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              Everything your business page needs
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto">
              A complete mobile-friendly page that works like a mini website —
              without the cost or complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#5eead4]" />
                </div>
                <h3 className="font-headline text-lg font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOUR PAGE LOOKS LIKE — preview block */}
      <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              What your page looks like
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto">
              A clean, mobile-first page with everything your customers need —
              all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                label: "Contact",
                items: ["Call button", "WhatsApp chat", "Email link"],
              },
              {
                icon: MapPin,
                label: "Location",
                items: ["Full address", "Google Maps", "Working hours"],
              },
              {
                icon: Image,
                label: "Gallery",
                items: ["Photos", "Visuals", "Highlights"],
              },
              {
                icon: MessageCircle,
                label: "Extras",
                items: ["Services list", "Social links", "QR code"],
              },
            ].map(({ icon: Icon, label, items }) => (
              <div
                key={label}
                className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#5eead4]" />
                </div>
                <h3 className="font-headline text-lg font-bold text-white mb-3">
                  {label}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm text-white/60 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8A23D] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS & PRODUCTS LISTING BANNER */}
      <section className="relative py-14 px-4 md:px-8 border-t border-white/10">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl border border-[#E8A23D]/30 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-[#E8A23D]/15 border border-[#E8A23D]/40 flex items-center justify-center">
              <Store className="w-7 h-7 text-[#E8A23D]" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-2">
                Your business & products listing
              </h3>
              <p className="font-sans text-sm md:text-base text-white/65 leading-relaxed">
                Go beyond a single page — list your business along with all your
                products so customers can discover, browse and reach you
                directly from the app.
              </p>
            </div>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 flex-shrink-0 text-[#16292C] font-sans font-bold px-7 py-4 rounded-2xl transition-all duration-200
                         bg-[#E8A23D] hover:bg-[#f0b155]
                         shadow-[0_18px_40px_-16px_rgba(232,162,61,0.8)]
                         active:scale-[0.98]"
            >
              <Store className="w-5 h-5" />
              Get the app
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

   

      {/* FAQ */}
      <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              Frequently asked questions
            </h2>
            <p className="font-sans text-white/60">
              Everything you need to know before creating your business page.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="font-sans text-sm md:text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#5eead4] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="font-sans text-sm text-white/60 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_100%)] shadow-[0_-12px_30px_rgba(22,41,44,0.35)]">
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full border-[28px] border-white/10" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FBF6EC] text-[#B94630] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Join 500+ business owners
          </div>

          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to go live?
          </h2>
          <p className="font-sans text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Create your page and share it with customers today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] active:scale-[0.98]"
            >
              <PlusCircle className="w-6 h-6" />
              Create your page
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-[#FBF6EC]/70 text-[#FBF6EC] font-sans font-bold px-8 py-4 rounded-2xl hover:bg-[#FBF6EC]/10 transition-all duration-200 text-lg active:scale-[0.98]"
            >
              <Store className="w-6 h-6" />
              Business & products listing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   PlusCircle,
//   Globe,
//   Phone,
//   Star,
//   QrCode,
//   Edit3,
//   Share2,
//   ChevronDown,
//   BadgeCheck,
//   MapPin,
//   Image as ImageIcon,
//   Clock,
//   MessageCircle,
//   Users,
//   Store,
//   Scissors,
//   Laptop,
//   Stethoscope,
// } from "lucide-react";

// const AMBER = "#E8A23D";

// const PLAY_STORE_URL =
//   "https://play.google.com/store/apps/details?id=com.poketstor.platform&pcampaignid=web_share";

// /* ------------------------------------------------------------------ */
// /* HERO                                                                */
// /* ------------------------------------------------------------------ */

// const PRESETS = {
//   shop: {
//     label: "Shop",
//     icon: Store,
//     sampleName: "Sunrise Mobiles",
//     category: "Mobile & accessories",
//     hours: "Open today, 9 AM to 9 PM",
//     chips: ["Repairs", "New phones", "Accessories"],
//   },
//   salon: {
//     label: "Salon",
//     icon: Scissors,
//     sampleName: "Glow Beauty Studio",
//     category: "Hair & beauty",
//     hours: "Open today, 10 AM to 8 PM",
//     chips: ["Haircut", "Bridal", "Facial"],
//   },
//   freelancer: {
//     label: "Freelancer",
//     icon: Laptop,
//     sampleName: "Arun Designs",
//     category: "Graphic designer",
//     hours: "Replies within a few hours",
//     chips: ["Logos", "Posters", "Social media"],
//   },
//   clinic: {
//     label: "Clinic",
//     icon: Stethoscope,
//     sampleName: "CareFirst Clinic",
//     category: "Family clinic",
//     hours: "Open today, 9 AM to 6 PM",
//     chips: ["Consultation", "Lab tests", "Vaccines"],
//   },
// };

// const slugify = (value) =>
//   value
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "")
//     .slice(0, 30);

// const Hero = () => {
//   const navigate = useNavigate();
//   const [type, setType] = useState("shop");
//   const [name, setName] = useState("");

//   const preset = PRESETS[type];
//   const displayName = name.trim() || preset.sampleName;
//   const slug = slugify(name) || "yourname";
//   const initial = displayName.charAt(0).toUpperCase();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = name.trim() ? `?name=${encodeURIComponent(name.trim())}` : "";
//     navigate(`/create${query}`);
//   };

//   const scrollToHow = (e) => {
//     e.preventDefault();
//     document
//       .getElementById("how-it-works")
//       ?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="relative overflow-hidden px-4 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
//       <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#14b8a6]/15 blur-3xl" />
//       <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#E8A23D]/10 blur-3xl" />

//       <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
//         {/* LEFT: message + action */}
//         <div className="text-left">
//           <h1 className="font-headline text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
//             Give your business
//             <br />
//             its own web address.
//           </h1>

//           <p className="font-sans mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
//             Add your details once. Customers get a page with your phone,
//             WhatsApp, location, photos and services, at a link you can send
//             anywhere.
//           </p>

//           {/* Type picker */}
//           <fieldset className="mt-9">
//             <legend className="font-sans mb-3 text-sm text-white/60">
//               What do you do? See a sample page.
//             </legend>
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(PRESETS).map(([key, p]) => {
//                 const Icon = p.icon;
//                 const active = key === type;
//                 return (
//                   <button
//                     key={key}
//                     type="button"
//                     onClick={() => setType(key)}
//                     aria-pressed={active}
//                     className={`font-sans inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4] ${
//                       active
//                         ? "border-[#E8A23D] bg-[#E8A23D] text-[#16292C]"
//                         : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4" />
//                     {p.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </fieldset>

//           {/* Name input -> live URL */}
//           <form onSubmit={handleSubmit} className="mt-6 max-w-lg">
//             <label htmlFor="hero-name" className="sr-only">
//               Your business name
//             </label>
//             <div className="flex flex-col gap-3 sm:flex-row">
//               <input
//                 id="hero-name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Type your business name"
//                 maxLength={40}
//                 autoComplete="organization"
//                 className="font-sans min-w-0 flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-base text-white placeholder-white/40 focus:border-[#5eead4] focus:outline-none focus:ring-2 focus:ring-[#5eead4]/40"
//               />
//               <button
//                 type="submit"
//                 className="font-sans inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-6 py-3.5 text-base font-bold text-white shadow-[0_18px_40px_-14px_rgba(20,184,166,0.7)] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
//               >
//                 Create my page
//                 <ArrowRight className="h-5 w-5" />
//               </button>
//             </div>

//             <p
//               className="font-sans mt-3 text-sm text-white/60"
//               aria-live="polite"
//             >
//               Your link will be{" "}
//               <span className="font-semibold text-[#5eead4]">
//                 zyphoriz.com/{slug}
//               </span>
//             </p>
//           </form>

//           <a
//             href="#how-it-works"
//             onClick={scrollToHow}
//             className="font-sans mt-6 inline-block text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4]"
//           >
//             See how it works
//           </a>
//         </div>

//         {/* RIGHT: live phone preview */}
//         <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[340px]">
//           <div className="font-sans mx-auto mb-4 flex w-fit max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/80">
//             <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#5eead4]" />
//             <span className="truncate">zyphoriz.com/{slug}</span>
//           </div>

//           <div className="rounded-[2.5rem] border border-white/15 bg-[#0d1a1c] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] lg:rotate-[2deg]">
//             <div className="overflow-hidden rounded-[2rem] bg-[#F7F2E8] text-[#16292C]">
//               <div
//                 className="h-20"
//                 style={{
//                   background: `linear-gradient(120deg, #0f766e, #14b8a6 60%, ${AMBER})`,
//                 }}
//               />

//               <div className="px-5 pb-5">
//                 <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#F7F2E8] bg-[#16292C] font-headline text-2xl font-bold text-[#E8A23D]">
//                   {initial}
//                 </div>

//                 <div className="mt-3 flex items-center gap-1.5">
//                   <h2 className="font-headline truncate text-xl font-bold">
//                     {displayName}
//                   </h2>
//                   <BadgeCheck className="h-5 w-5 flex-shrink-0 text-[#0f766e]" />
//                 </div>
//                 <p className="font-sans text-sm text-[#16292C]/65">
//                   {preset.category}
//                 </p>

//                 <div className="mt-4 grid grid-cols-3 gap-2">
//                   {[
//                     { icon: Phone, label: "Call" },
//                     { icon: MessageCircle, label: "WhatsApp" },
//                     { icon: MapPin, label: "Directions" },
//                   ].map(({ icon: Icon, label }) => (
//                     <div
//                       key={label}
//                       className="font-sans flex flex-col items-center gap-1 rounded-xl bg-[#16292C] py-3 text-[11px] font-semibold text-white"
//                     >
//                       <Icon className="h-4 w-4 text-[#5eead4]" />
//                       {label}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="font-sans mt-4 flex items-center gap-2 text-sm text-[#16292C]/75">
//                   <Clock className="h-4 w-4 flex-shrink-0 text-[#0f766e]" />
//                   {preset.hours}
//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {preset.chips.map((chip) => (
//                     <span
//                       key={chip}
//                       className="font-sans rounded-full border border-[#16292C]/15 px-3 py-1 text-xs font-medium"
//                     >
//                       {chip}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-[#16292C]/25 p-3">
//                   <QrCode className="h-9 w-9 flex-shrink-0" />
//                   <p className="font-sans text-xs leading-snug text-[#16292C]/70">
//                     Scan to open this page. Print it for your shop counter.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* HOME                                                                */
// /* ------------------------------------------------------------------ */

// export const Home = () => {
//   const [openFaq, setOpenFaq] = useState(null);

//   const steps = [
//     {
//       icon: Edit3,
//       title: "Enter your business details",
//       desc: "Add your business name, category, description, phone, address, hours, photos, and social links.",
//     },
//     {
//       icon: Globe,
//       title: "Your page goes live",
//       desc: "We instantly create a clean, mobile-friendly page at zyphoriz.com/yourname.",
//     },
//     {
//       icon: Share2,
//       title: "Share your link",
//       desc: "Share your unique URL and QR code on WhatsApp, Instagram, or print it for your shop.",
//     },
//   ];

//   const features = [
//     {
//       icon: Globe,
//       title: "Your own business page",
//       desc: "A professional page at zyphoriz.com/yourname — no coding, no hosting, no designer needed.",
//     },
//     {
//       icon: Phone,
//       title: "Call, WhatsApp & directions",
//       desc: "One-tap buttons so customers can call you, message you on WhatsApp, or get directions instantly.",
//     },
//     {
//       icon: MapPin,
//       title: "Address & hours",
//       desc: "Show your location, working hours, and a Google Maps link so customers find you easily.",
//     },
//     {
//       icon: ImageIcon,
//       title: "Photo gallery",
//       desc: "Add photos to make your page stand out and build trust with visitors.",
//     },
//     {
//       icon: BadgeCheck,
//       title: "Verified badge",
//       desc: "A verified profile that builds trust and looks professional to every customer.",
//     },
//     {
//       icon: Store,
//       title: "Business & products listing",
//       desc: "List your business along with your products so customers can discover and browse what you sell.",
//     },
//     {
//       icon: Users,
//       title: "Services & offerings",
//       desc: "List what you offer — services, products, or specialties — so customers know exactly what you do.",
//     },
//     {
//       icon: Edit3,
//       title: "Unlimited edits",
//       desc: "Update your details, offers, hours, or photos anytime. Your page stays live and current.",
//     },
//   ];

//   const faqs = [
//     {
//       q: "Do I need a website to use this?",
//       a: "No. We host your business page for you at zyphoriz.com/yourname. You just share your link.",
//     },
//     {
//       q: "Can I edit my page later?",
//       a: "Yes. You can update your details, photos, hours, and links anytime.",
//     },
//     {
//       q: "How do customers find me?",
//       a: "Share your unique link or QR code on WhatsApp, Instagram, Google, or print it on your shop.",
//     },
//     {
//       q: "Is it suitable for local shops?",
//       a: "Absolutely. It is built for local shops, professionals, freelancers, and service providers.",
//     },
//     {
//       q: "What do I get with my page?",
//       a: "A mobile-friendly business page with call, WhatsApp, directions, photo gallery, services, business & products listing, verified badge, QR code, and more.",
//     },
//     {
//       q: "Can I also list my products?",
//       a: "Yes. Along with your business profile you can list your products so customers can browse and discover everything you sell — available on the Android app.",
//     },
//   ];

//   const previewCards = [
//     {
//       icon: Phone,
//       label: "Contact",
//       items: ["Call button", "WhatsApp chat", "Email link"],
//     },
//     {
//       icon: MapPin,
//       label: "Location",
//       items: ["Full address", "Google Maps", "Working hours"],
//     },
//     {
//       icon: ImageIcon,
//       label: "Gallery",
//       items: ["Photos", "Visuals", "Highlights"],
//     },
//     {
//       icon: MessageCircle,
//       label: "Extras",
//       items: ["Services list", "Social links", "QR code"],
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-[#16292C] text-white">
//       {/* HERO */}
//       <Hero />

//       {/* HOW IT WORKS */}
//       <section
//         id="how-it-works"
//         className="relative py-16 px-4 md:px-8 border-t border-white/10"
//       >
//         <div
//           className="absolute inset-0 opacity-[0.08] pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />

//         <div className="max-w-5xl mx-auto relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               How it works
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               Three simple steps to get your business online and shareable.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {steps.map(({ icon: Icon, title, desc }, index) => (
//               <div
//                 key={title}
//                 className="relative bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 text-center"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mx-auto mb-4">
//                   <Icon className="w-6 h-6 text-[#5eead4]" />
//                 </div>
//                 <div className="absolute top-4 right-4 text-xs font-bold text-white/30">
//                   0{index + 1}
//                 </div>
//                 <h3 className="font-headline text-xl font-bold mb-2">
//                   {title}
//                 </h3>
//                 <p className="font-sans text-sm text-white/60">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               Everything your business page needs
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               A complete mobile-friendly page that works like a mini website —
//               without the cost or complexity.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map(({ icon: Icon, title, desc }) => (
//               <div
//                 key={title}
//                 className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all duration-200"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
//                   <Icon className="w-5 h-5 text-[#5eead4]" />
//                 </div>
//                 <h3 className="font-headline text-lg font-bold text-white mb-2">
//                   {title}
//                 </h3>
//                 <p className="font-sans text-sm text-white/60 leading-relaxed">
//                   {desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WHAT YOUR PAGE LOOKS LIKE */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               What your page looks like
//             </h2>
//             <p className="font-sans text-white/60 max-w-2xl mx-auto">
//               A clean, mobile-first page with everything your customers need —
//               all in one place.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {previewCards.map(({ icon: Icon, label, items }) => (
//               <div
//                 key={label}
//                 className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#14b8a6]/40 transition-all"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
//                   <Icon className="w-5 h-5 text-[#5eead4]" />
//                 </div>
//                 <h3 className="font-headline text-lg font-bold text-white mb-3">
//                   {label}
//                 </h3>
//                 <ul className="space-y-2">
//                   {items.map((item) => (
//                     <li
//                       key={item}
//                       className="font-sans text-sm text-white/60 flex items-center gap-2"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#E8A23D] flex-shrink-0" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BUSINESS & PRODUCTS LISTING BANNER */}
//       <section className="relative py-14 px-4 md:px-8 border-t border-white/10">
//         <div
//           className="absolute inset-0 opacity-[0.08] pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />
//         <div className="max-w-5xl mx-auto relative z-10">
//           <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl border border-[#E8A23D]/30 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
//             <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-[#E8A23D]/15 border border-[#E8A23D]/40 flex items-center justify-center">
//               <Store className="w-7 h-7 text-[#E8A23D]" />
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <h3 className="font-headline text-2xl md:text-3xl font-bold mb-2">
//                 Your business & products listing
//               </h3>
//               <p className="font-sans text-sm md:text-base text-white/65 leading-relaxed">
//                 Go beyond a single page — list your business along with all your
//                 products so customers can discover, browse and reach you
//                 directly from the app.
//               </p>
//             </div>

//             <a
//               href={PLAY_STORE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 flex-shrink-0 text-[#16292C] font-sans font-bold px-7 py-4 rounded-2xl transition-all duration-200
//                          bg-[#E8A23D] hover:bg-[#f0b155]
//                          shadow-[0_18px_40px_-16px_rgba(232,162,61,0.8)]
//                          active:scale-[0.98]"
//             >
//               <Store className="w-5 h-5" />
//               Get the app
//               <ArrowRight className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
//         <div className="max-w-3xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
//               Frequently asked questions
//             </h2>
//             <p className="font-sans text-white/60">
//               Everything you need to know before creating your business page.
//             </p>
//           </div>

//           <div className="space-y-3">
//             {faqs.map((faq, index) => {
//               const isOpen = openFaq === index;
//               return (
//                 <div
//                   key={faq.q}
//                   className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => setOpenFaq(isOpen ? null : index)}
//                     aria-expanded={isOpen}
//                     className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
//                   >
//                     <span className="font-sans text-sm md:text-base font-semibold text-white">
//                       {faq.q}
//                     </span>
//                     <ChevronDown
//                       className={`w-5 h-5 text-[#5eead4] flex-shrink-0 transition-transform duration-200 ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>
//                   {isOpen && (
//                     <div className="px-6 pb-5">
//                       <p className="font-sans text-sm text-white/60 leading-relaxed">
//                         {faq.a}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="relative py-16 px-4 md:px-8 overflow-hidden bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_100%)] shadow-[0_-12px_30px_rgba(22,41,44,0.35)]">
//         <div
//           className="absolute inset-0 opacity-[0.1] pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
//             backgroundSize: "22px 22px",
//           }}
//         />
//         <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full border-[28px] border-white/10" />

//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-[#FBF6EC] text-[#B94630] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
//             <Star className="w-4 h-4 fill-current" />
//             Join 500+ business owners
//           </div>

//           <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to go live?
//           </h2>
//           <p className="font-sans text-lg text-white/90 mb-8 max-w-xl mx-auto">
//             Create your page and share it with customers today.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/create"
//               className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] active:scale-[0.98]"
//             >
//               <PlusCircle className="w-6 h-6" />
//               Create your page
//               <ArrowRight className="w-5 h-5" />
//             </Link>

//             <a
//               href={PLAY_STORE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-3 bg-transparent border-2 border-[#FBF6EC]/70 text-[#FBF6EC] font-sans font-bold px-8 py-4 rounded-2xl hover:bg-[#FBF6EC]/10 transition-all duration-200 text-lg active:scale-[0.98]"
//             >
//               <Store className="w-6 h-6" />
//               Business & products listing
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };