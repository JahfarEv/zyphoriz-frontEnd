// import React from 'react';
// import { Link } from 'react-router-dom';
// import { CheckCircle2, ArrowRight, Store, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
// import { useRegistration } from '../../context/RegistrationContext';

// export const PaymentSuccess = () => {
//   const { formData } = useRegistration();
//   const txnId = `ZYP-${Math.floor(10000000 + Math.random() * 90000000)}`;
//   const slug = formData.slug || 'your-business';
//   const businessUrl = `${window.location.host}/${slug}`;

//   const copyUrl = () => {
//     navigator.clipboard?.writeText(`${window.location.protocol}//${businessUrl}`);
//   };

//   return (
//     <main className="w-full px-4 md:px-6 py-12 text-center">
//       <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-md space-y-6">
//         {/* Success Icon */}
//         <div className="w-20 h-20 bg-success-container text-success rounded-full flex items-center justify-center mx-auto shadow-inner">
//           <CheckCircle2 className="w-11 h-11" />
//         </div>

//         <div>
//           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-container text-success rounded-full text-xs font-semibold mb-3">
//             <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
//           </span>
//           <h1 className="font-headline text-3xl font-bold text-on-surface">
//             You're Live! 🎉
//           </h1>
//           <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
//             <span className="font-bold text-on-surface">{formData.name || 'Your business'}</span> is now listed on zyphoriz and discoverable by thousands of local customers.
//           </p>
//         </div>

//         {/* URL Box */}
//         <div className="bg-primary/5 border border-primary/30 rounded-2xl p-5 space-y-2">
//           <p className="font-sans text-xs text-outline font-semibold uppercase tracking-wide">Your Business URL</p>
//           <p className="font-mono text-lg font-bold text-primary break-all">{businessUrl}</p>
//           <div className="flex justify-center gap-3 pt-1">
//             <button
//               onClick={copyUrl}
//               className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <Copy className="w-3.5 h-3.5" /> Copy URL
//             </button>
//             <Link
//               to={`/${slug}`}
//               className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <ExternalLink className="w-3.5 h-3.5" /> View Page
//             </Link>
//           </div>
//         </div>

//         {/* Receipt */}
//         <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-4 text-left space-y-2 font-sans text-sm">
//           <div className="flex justify-between border-b border-outline-variant/20 pb-2">
//             <span className="text-outline">Transaction ID:</span>
//             <span className="font-mono font-semibold text-on-surface text-xs">{txnId}</span>
//           </div>
//           <div className="flex justify-between border-b border-outline-variant/20 pb-2">
//             <span className="text-outline">Plan:</span>
//             <span className="font-semibold text-on-surface">Standard · 1 Year</span>
//           </div>
//           <div className="flex justify-between font-bold">
//             <span className="text-on-surface">Amount Paid:</span>
//             <span className="text-secondary">₹499</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-2">
//           <Link to={`/${slug}`} className="flex-1">
//             <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-sans font-bold py-3 rounded-xl hover:bg-primary/90 transition-all text-sm">
//               <Store className="w-4 h-4" />
//               View My Business Page
//             </button>
//           </Link>
//           <Link to="/" className="flex-1">
//             <button className="w-full flex items-center justify-center gap-2 border border-outline-variant text-on-surface font-sans font-semibold py-3 rounded-xl hover:bg-surface-container transition-all text-sm">
//               Back to Home <ArrowRight className="w-4 h-4" />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Store, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';

const ACCENT = '#14b8a6';
const ACCENT_SOFT = '#5eead4';

export const PaymentSuccess = () => {
  const { formData } = useRegistration();
  const txnId = `ZYP-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const slug = formData.slug || 'your-business';
  const businessUrl = `${window.location.host}/${slug}`;

  const copyUrl = () => {
    navigator.clipboard?.writeText(`${window.location.protocol}//${businessUrl}`);
  };

  return (
    <main className="w-full min-h-screen bg-[#16292C] px-4 py-10 md:py-14 flex justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.18),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(232,162,61,0.08),transparent_55%)]" />

      <div className="relative w-full max-w-xl">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)] space-y-6 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-[#14b8a6]/15 border border-[#14b8a6]/40 shadow-[0_0_40px_-8px_rgba(20,184,166,0.6)]">
            <CheckCircle2 className="w-10 h-10 text-[#5eead4]" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
            </span>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white">
              You're Live! 🎉
            </h1>
            <p className="font-sans text-sm text-white/70 mt-2 max-w-sm mx-auto leading-relaxed">
              <span className="font-bold text-white">{formData.name || 'Your business'}</span> is now listed on zyphoriz and discoverable by thousands of local customers.
            </p>
          </div>

          {/* URL Box */}
          <div className="bg-[#14b8a6]/10 border border-[#14b8a6]/30 rounded-2xl p-5 space-y-2">
            <p className="font-sans text-xs text-white/60 font-semibold uppercase tracking-wide">
              Your Business URL
            </p>
            <p className="font-mono text-base sm:text-lg font-bold text-[#5eead4] break-all">
              {businessUrl}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button
                onClick={copyUrl}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#5eead4] hover:bg-[#14b8a6]/20 px-3 py-1.5 rounded-lg transition-colors border border-[#14b8a6]/30"
              >
                <Copy className="w-3.5 h-3.5" /> Copy URL
              </button>
              <Link
                to={`/${slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#5eead4] hover:bg-[#14b8a6]/20 px-3 py-1.5 rounded-lg transition-colors border border-[#14b8a6]/30"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Page
              </Link>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 text-left space-y-2 font-sans text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Transaction ID:</span>
              <span className="font-mono font-semibold text-white text-xs">{txnId}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Plan:</span>
              <span className="font-semibold text-white">Standard · 1 Year</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-white">Amount Paid:</span>
              <span className="text-[#5eead4]">₹499</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to={`/${slug}`} className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 text-white font-sans font-bold py-3 rounded-xl transition-all text-sm
                                 bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
                                 hover:from-[#0d6b64] hover:to-[#0ea5a0]
                                 shadow-[0_14px_30px_-12px_rgba(20,184,166,0.65)]
                                 active:scale-[0.98]">
                <Store className="w-4 h-4" />
                View My Business Page
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/80 font-sans font-semibold py-3 rounded-xl hover:bg-white/[0.06] hover:text-white hover:border-white/25 transition-all text-sm">
                Back to Home <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};