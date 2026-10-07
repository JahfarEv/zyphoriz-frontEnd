// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FileText,
//   Mail,
//   Globe,
//   MapPin,
//   Phone,
//   Building2,
//   CheckCircle2,
//   ArrowUp,
//   PlusCircle,
//   ArrowRight,
// } from 'lucide-react';

// const LAST_UPDATED = 'September 16, 2026';

// const SECTIONS = [
//   {
//     id: 'about-zyphoriz',
//     title: 'About Zyphoriz',
//     body: [
//       'Zyphoriz is a local discovery platform designed to help users discover businesses, services, and relevant information. Features may vary by location, account type, and current service availability.',
//     ],
//   },
//   {
//     id: 'eligibility',
//     title: 'Eligibility',
//     body: [
//       'You may use Zyphoriz only if you are legally capable of entering into a binding agreement under applicable law. If acting for a business, you confirm that you have authority to do so.',
//     ],
//   },
//   {
//     id: 'account-registration',
//     title: 'Account Registration',
//     body: [
//       'You agree to provide accurate information, protect your login credentials, update account details, and promptly report unauthorized access. We may suspend or terminate accounts that violate these Terms.',
//     ],
//   },
//   {
//     id: 'acceptable-use',
//     title: 'Acceptable Use',
//     bullets: [
//       'Use Zyphoriz only for lawful purposes.',
//       'Do not submit false or misleading information.',
//       'Do not impersonate another person or business.',
//       'Do not upload malicious code or harmful content.',
//       'Do not attempt unauthorized access or disrupt the platform.',
//       'Do not scrape or exploit content without permission.',
//       'Do not harass others or violate their rights.',
//     ],
//   },
//   {
//     id: 'business-listings',
//     title: 'Business Listings and User Content',
//     body: [
//       'Users or businesses may submit listings, images, descriptions, reviews, and other content. You are responsible for ensuring that content is accurate, lawful, and does not infringe rights. You grant Zyphoriz a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, and distribute content as reasonably necessary to operate and promote the platform, subject to applicable law.',
//     ],
//   },
//   {
//     id: 'business-info-accuracy',
//     title: 'Business Information Accuracy',
//     body: [
//       'Listings may be supplied by businesses, users, or third parties. We do not guarantee that all information is accurate, complete, current, or available. Verify important details such as prices, availability, and operating hours independently.',
//     ],
//   },
//   {
//     id: 'third-party-businesses',
//     title: 'Third-Party Businesses and Services',
//     body: [
//       'Zyphoriz may help users discover or connect with third-party businesses. Unless expressly stated otherwise, Zyphoriz is not the owner or operator of those businesses and does not guarantee their quality, safety, legality, or availability.',
//     ],
//   },
//   {
//     id: 'intellectual-property',
//     title: 'Intellectual Property',
//     body: [
//       'The Zyphoriz name, logo, branding, website design, software, text, graphics, and original content are owned by or licensed to Zyphoriz. You may not copy, modify, distribute, sell, reverse engineer, or create derivative works without permission, except as permitted by law.',
//     ],
//   },
//   {
//     id: 'privacy',
//     title: 'Privacy',
//     body: ['Your use of Zyphoriz is also subject to our Privacy Policy.'],
//   },
//   {
//     id: 'payments-fees',
//     title: 'Payments and Fees',
//     body: [
//       'If paid services, subscriptions, advertising, or other chargeable features are offered, applicable prices and billing terms will be displayed before purchase. Third-party payment provider terms may also apply. Customize this section for actual plans, refunds, renewals, and taxes.',
//     ],
//   },
//   {
//     id: 'prohibited-listings',
//     title: 'Prohibited Listings',
//     body: [
//       'We may remove or reject content that is unlawful, fraudulent, misleading, harmful, infringing, or otherwise violates these Terms.',
//     ],
//   },
//   {
//     id: 'platform-availability',
//     title: 'Platform Availability',
//     body: [
//       'We may modify, suspend, or discontinue all or part of Zyphoriz. We do not guarantee uninterrupted, secure, or error-free operation.',
//     ],
//   },
//   {
//     id: 'disclaimers',
//     title: 'Disclaimers',
//     body: [
//       'To the maximum extent permitted by law, Zyphoriz is provided on an “as is” and “as available” basis. We do not guarantee accuracy, availability, suitability, uninterrupted operation, or third-party services.',
//     ],
//   },
//   {
//     id: 'limitation-of-liability',
//     title: 'Limitation of Liability',
//     body: [
//       'To the maximum extent permitted by law, Zyphoriz and its owners, employees, affiliates, and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages. Nothing excludes liability that cannot legally be excluded.',
//     ],
//   },
//   {
//     id: 'indemnification',
//     title: 'Indemnification',
//     body: [
//       'To the extent permitted by law, you agree to indemnify Zyphoriz and its representatives against claims, losses, damages, liabilities, and expenses arising from your violation of these Terms, User Content, misuse, rights violations, or unlawful activity.',
//     ],
//   },
//   {
//     id: 'suspension-termination',
//     title: 'Suspension and Termination',
//     body: [
//       'We may suspend or terminate access if we reasonably believe that you violated these Terms, created a security risk, engaged in unlawful activity, or misused the platform.',
//     ],
//   },
//   {
//     id: 'governing-law',
//     title: 'Governing Law and Disputes',
//     body: [
//       'These Terms shall be governed by the laws of [State/Country]. Disputes shall be subject to the courts of [City, State/Country], unless applicable law requires otherwise. Confirm this clause with legal counsel.',
//     ],
//   },
//   {
//     id: 'changes',
//     title: 'Changes to These Terms',
//     body: [
//       'We may update these Terms and will post the revised Last Updated date. Continued use after changes become effective constitutes acceptance where legally permitted.',
//     ],
//   },
// ];

// const CONTACT = {
//   id: 'contact',
//   title: 'Contact Us',
//   items: [
//     { icon: Building2, label: 'Company', value: 'Nexus Ventures LLC' },
//     { icon: Globe, label: 'Website', value: 'https://zyphoriz.com', href: 'https://zyphoriz.com' },
//     { icon: Mail, label: 'Email', value: 'contact.zyphoriz@gmail.com', href: 'mailto:contact.zyphoriz@gmail.com' },
//     { icon: MapPin, label: 'Address', value: 'NEXUS VENTURES LLC, 2nd Floor,Flat No.: 235, Binnamangala, Indiranagar,Bengaluru, 560038' },
   
//   ],
// };

// export const Terms = () => (
//   <main className="w-full min-h-screen bg-[#16292C] text-white px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
//     {/* Ambient glow */}
//     <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.14),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

//     <div className="relative max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
//         {/* Sidebar — CTA + TOC (desktop only) */}
//         <aside className="hidden lg:block lg:sticky lg:top-24 space-y-4">
//           {/* List your business CTA */}
//           <div className="relative overflow-hidden rounded-2xl p-5 border border-white/10
//                           bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
//                           shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]">
//             <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[16px] border-white/10" />
//             <div className="relative">
//               <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-3 backdrop-blur-sm">
//                 <PlusCircle className="w-4 h-4 text-white" />
//               </div>
//               <p className="font-headline text-sm font-bold text-white leading-snug mb-1">
//                 Own a business?
//               </p>
//               <p className="font-sans text-[11px] text-white/85 leading-relaxed mb-3">
//                 Get listed on Zyphoriz for just ₹499.
//               </p>
//               <Link
//                 to="/create"
//                 className="inline-flex items-center gap-1.5 bg-white text-[#0f766e] font-sans font-bold px-3 py-1.5 rounded-lg text-[11px] hover:bg-white/90 transition-colors"
//               >
//                 List your business
//                 <ArrowRight className="w-3 h-3" />
//               </Link>
//             </div>
//           </div>

//           {/* TOC */}
//           <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-md">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center">
//                 <FileText className="w-4 h-4 text-[#5eead4]" />
//               </div>
//               <p className="font-headline text-sm font-bold text-white">Contents</p>
//             </div>

//             <nav className="space-y-0.5 max-h-[55vh] overflow-y-auto pr-1">
//               {SECTIONS.map((section, index) => (
//                 <a
//                   key={section.id}
//                   href={`#${section.id}`}
//                   className="block text-xs font-sans text-white/60 hover:text-[#5eead4] hover:bg-white/[0.04] rounded-md px-2 py-1.5 transition-colors"
//                 >
//                   <span className="text-white/35 font-mono mr-1.5">{index + 1}.</span>
//                   {section.title}
//                 </a>
//               ))}
//               <a
//                 href={`#${CONTACT.id}`}
//                 className="block text-xs font-sans text-white/60 hover:text-[#5eead4] hover:bg-white/[0.04] rounded-md px-2 py-1.5 transition-colors"
//               >
//                 <span className="text-white/35 font-mono mr-1.5">19.</span>
//                 {CONTACT.title}
//               </a>
//             </nav>
//           </div>
//         </aside>

//         {/* Content */}
//         <article className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
//           {/* Header */}
//           <div className="pb-8 border-b border-white/10 mb-10">
//             <span className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4">
//               <FileText className="w-3 h-3" />
//               Legal
//             </span>

//             <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
//               Terms and Conditions
//             </h1>

//             <p className="mt-3 font-sans text-sm text-white/50">
//               Last Updated: <span className="text-white/75 font-semibold">{LAST_UPDATED}</span>
//             </p>

//             <p className="mt-6 font-sans text-sm leading-7 text-white/75 max-w-3xl">
//               These Terms and Conditions govern your access to and use of the Zyphoriz website,
//               platform, applications, and related services. By accessing or using Zyphoriz, you
//               agree to these terms.
//             </p>
//           </div>

//           {/* Sections */}
//           <div className="space-y-8">
//             {SECTIONS.map((section, index) => (
//               <section
//                 key={section.id}
//                 id={section.id}
//                 className="scroll-mt-24 border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
//               >
//                 <div className="flex items-start gap-3 mb-3">
//                   <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-mono text-xs font-bold flex items-center justify-center mt-0.5">
//                     {index + 1}
//                   </span>
//                   <h2 className="font-headline text-lg md:text-xl font-bold text-white pt-1">
//                     {section.title}
//                   </h2>
//                 </div>

//                 {section.body && (
//                   <div className="pl-11 space-y-3">
//                     {section.body.map((paragraph, i) => (
//                       <p
//                         key={i}
//                         className="font-sans text-sm leading-7 text-white/70"
//                       >
//                         {paragraph}
//                       </p>
//                     ))}
//                   </div>
//                 )}

//                 {section.bullets && (
//                   <ul className="pl-11 mt-1 space-y-2">
//                     {section.bullets.map((item) => (
//                       <li
//                         key={item}
//                         className="flex items-start gap-2.5 font-sans text-sm leading-7 text-white/70"
//                       >
//                         <CheckCircle2 className="w-4 h-4 text-[#14b8a6] flex-shrink-0 mt-1.5" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </section>
//             ))}

//             {/* Contact Us — structured card */}
//             <section
//               id={CONTACT.id}
//               className="scroll-mt-24 border-t border-white/10 pt-6"
//             >
//               <div className="flex items-start gap-3 mb-4">
//                 <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-mono text-xs font-bold flex items-center justify-center mt-0.5">
//                   19
//                 </span>
//                 <h2 className="font-headline text-lg md:text-xl font-bold text-white pt-1">
//                   {CONTACT.title}
//                 </h2>
//               </div>

//               <div className="pl-11">
//                 <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {CONTACT.items.map(({ icon: Icon, label, value, href }) => {
//                     const content = (
//                       <>
//                         <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
//                           <Icon className="w-4 h-4 text-[#5eead4]" />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/45">
//                             {label}
//                           </p>
//                           <p className="font-sans text-sm font-semibold text-white truncate">
//                             {value}
//                           </p>
//                         </div>
//                       </>
//                     );

//                     return href ? (
//                       <a
//                         key={label}
//                         href={href}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.04] transition-colors"
//                       >
//                         {content}
//                       </a>
//                     ) : (
//                       <div key={label} className="flex items-center gap-3 px-2 py-2">
//                         {content}
//                       </div>
//                     );
//                   })}
//                 </div>

                
//               </div>
//             </section>
//           </div>

//           {/* Bottom CTA — List your business */}
//           <section className="mt-12 pt-8 border-t border-white/10">
//             <div className="relative overflow-hidden rounded-2xl px-6 py-8 md:px-10 md:py-10 border border-white/10
//                             bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
//                             shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]">
//               <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
//               <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full border-[20px] border-white/10" />

//               <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                 <div className="min-w-0">
//                   <p className="font-headline text-xl md:text-2xl font-bold text-white mb-2">
//                     Own a business?
//                   </p>
//                   <p className="font-sans text-sm text-white/85 max-w-md">
//                     Get listed on Zyphoriz for just ₹499 and be discoverable by thousands of local customers.
//                   </p>
//                 </div>

//                 <Link
//                   to="/create"
//                   className="inline-flex items-center justify-center gap-2 bg-white text-[#0f766e] font-sans font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all active:scale-[0.98] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] flex-shrink-0"
//                 >
//                   <PlusCircle className="w-4 h-4" />
//                   List your business
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>
//           </section>

//           {/* Back to top */}
//           <div className="mt-8 flex justify-center">
//             <a
//               href="#top"
//               className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#5eead4] transition-colors px-4 py-2 rounded-xl border border-white/10 hover:border-[#14b8a6]/40"
//             >
//               <ArrowUp className="w-3.5 h-3.5" />
//               Back to top
//             </a>
//           </div>
//         </article>
//       </div>
//     </div>
//   </main>
// );


import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, ArrowUp, Home } from 'lucide-react';

const LAST_UPDATED = 'October 7, 2026';

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: [
      'By registering, making a payment, or creating a digital profile on zyphoriz.com, you agree to these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    id: 'services',
    title: 'Services Provided',
    body: [
      'Zyphoriz provides a digital platform where users can create customized digital visiting cards or single-page web profiles. Users can choose themes, add personal/business details, contact numbers, email, social links, photos, banners, galleries, and working hours, and obtain a custom URL (e.g., zyphoriz.com/yourname).',
    ],
  },
  {
    id: 'account-registration',
    title: 'Account Registration & User Content',
    body: [
      'You are responsible for maintaining the confidentiality of your account details and the accuracy of the information you publish on your digital profile.',
      'You warrant that all content (photos, text, logos, links) uploaded by you is lawful, does not infringe on any third-party rights, and does not contain abusive, misleading, or illegal material.',
      'Nexus Ventures LLC reserves the right to suspend or remove any profile that violates community standards or legal guidelines without prior notice.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments and Pricing',
    body: [
      'The standard creation and activation fee for a digital profile on zyphoriz.com is INR 500+GST (or as applicable from time to time).',
      'Payments are processed securely through our authorized payment gateway partners.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: [
      'All platform designs, templates, code, graphics, and underlying technology of zyphoriz.com are the intellectual property of Nexus Ventures LLC. Users retain ownership of their personal content/photos uploaded to their respective profiles.',
    ],
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    body: [
      'Nexus Ventures LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our platform, server downtimes, or data loss.',
    ],
  },
];

export const Terms = () => (
  <main id="top" className="w-full min-h-screen bg-[#16292C] text-white px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.14),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

    <div className="relative max-w-4xl mx-auto">
     <Link
                to="/"
                className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
      <article className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        {/* Header */}
        <div className="pb-8 border-b border-white/10 mb-10">
        

          <span className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4">
            <FileText className="w-3 h-3" />
            Legal
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Terms and Conditions
          </h1>

          <p className="mt-3 font-sans text-sm text-white/50">
            Last Updated: <span className="text-white/75 font-semibold">{LAST_UPDATED}</span>
          </p>

          <p className="mt-6 font-sans text-sm leading-7 text-white/75 max-w-3xl">
            Welcome to zyphoriz.com, a platform operated by Nexus Ventures LLC, located in
            Indiranagar, Bengaluru, Karnataka 560038. By accessing or using our platform to
            create digital visiting cards, profiles, or single-page micro-websites, you agree to
            comply with and be bound by the following Terms and Conditions. Please read them
            carefully.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-mono text-xs font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <h2 className="font-headline text-lg md:text-xl font-bold text-white pt-1">
                  {section.title}
                </h2>
              </div>

              {section.body && (
                <div className="pl-11 space-y-3">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="font-sans text-sm leading-7 text-white/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="pl-11 mt-1 space-y-2">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 font-sans text-sm leading-7 text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#14b8a6] flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-12 flex justify-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#5eead4] transition-colors px-4 py-2 rounded-xl border border-white/10 hover:border-[#14b8a6]/40"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </a>
        </div>
      </article>
    </div>
  </main>
);