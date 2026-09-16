import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Globe,
  MapPin,
  Phone,
  Building2,
  CheckCircle2,
  ArrowUp,
  PlusCircle,
  ArrowRight,
  Lock,
  Cookie,
  Users,
  Database,
  Baby,
  Link as LinkIcon,
  Globe2,
  FileEdit,
} from 'lucide-react';

const LAST_UPDATED = 'September 16, 2026';

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    blocks: [
      {
        subtitle: 'Personal Information',
        body: 'Depending on how you use Zyphoriz, we may collect your name, email address, mobile number, authentication information, profile information, business information, and information submitted through forms or communications.',
      },
      {
        subtitle: 'Location Information',
        body: 'We may process city, district, locality, address, area information, and precise location information if you choose to share it. You can control location permissions through your device or browser settings.',
      },
      {
        subtitle: 'Usage and Technical Information',
        body: 'We may collect IP address, browser and device information, operating system, pages visited, access times, referring website, and log or diagnostic information.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    bullets: [
      'Create and manage accounts.',
      'Provide, operate, and improve Zyphoriz.',
      'Help users discover local businesses and services.',
      'Personalize experiences and search results.',
      'Communicate about accounts, requests, and updates.',
      'Provide support and maintain security.',
      'Analyze usage and comply with applicable laws.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Similar Technologies',
    body: [
      'We may use cookies, local storage, pixels, and similar technologies for sign-in, preferences, security, analytics, and performance. You can manage cookies through your browser settings.',
    ],
  },
  {
    id: 'how-we-share',
    title: 'How We Share Your Information',
    body: [
      'We may share information with service providers such as hosting, cloud storage, email, analytics, authentication, and security providers; when required by law; or as part of a merger, acquisition, restructuring, or sale of assets. Public business listings may display information you submit for public use.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: [
      'We use reasonable technical and organizational measures to protect personal information. However, no online transmission or storage system is completely secure.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: [
      'We retain information only as reasonably necessary to provide services, maintain records, resolve disputes, enforce agreements, and meet legal obligations.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    body: [
      'Depending on applicable law, you may request access, correction, deletion, restriction, objection, or withdrawal of consent. Contact us using the details below. Identity verification may be required.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    body: [
      'Zyphoriz is not intended for children under the age required by applicable law to provide consent. Contact us if you believe a child has submitted information improperly.',
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    body: [
      'Our website may contain links to third-party websites or services. We are not responsible for their privacy practices.',
    ],
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    body: [
      'Information may be processed or stored in countries other than your own. Where required, we will take appropriate compliance steps.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy and will revise the Last Updated date when changes are made.',
    ],
  },
];

const CONTACT = {
  id: 'contact',
  title: 'Contact Us',
  items: [
    { icon: Building2, label: 'Company', value: 'Nexus Ventures LLC' },
    { icon: Globe, label: 'Website', value: 'https://zyphoriz.com', href: 'https://zyphoriz.com' },
  { icon: Mail, label: 'Email', value: 'contact.zyphoriz@gmail.com', href: 'mailto:contact.zyphoriz@gmail.com' },
    { icon: MapPin, label: 'Address', value: 'NEXUS VENTURES LLC, 2nd Floor,Flat No.: 235, Binnamangala, Indiranagar,Bengaluru, 560038' },
  ],
};

export const PrivacyPolicy = () => (
  <main className="w-full min-h-screen bg-[#16292C] text-white px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.14),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

    <div className="relative max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
        {/* Sidebar — CTA + TOC (desktop only) */}
        <aside className="hidden lg:block lg:sticky lg:top-24 space-y-4">
          {/* List your business CTA */}
          <div className="relative overflow-hidden rounded-2xl p-5 border border-white/10
                          bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
                          shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[16px] border-white/10" />
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-3 backdrop-blur-sm">
                <PlusCircle className="w-4 h-4 text-white" />
              </div>
              <p className="font-headline text-sm font-bold text-white leading-snug mb-1">
                Own a business?
              </p>
              <p className="font-sans text-[11px] text-white/85 leading-relaxed mb-3">
                Get listed on Zyphoriz for just ₹499.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-1.5 bg-white text-[#0f766e] font-sans font-bold px-3 py-1.5 rounded-lg text-[11px] hover:bg-white/90 transition-colors"
              >
                List your business
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* TOC */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
              </div>
              <p className="font-headline text-sm font-bold text-white">Contents</p>
            </div>

            <nav className="space-y-0.5 max-h-[55vh] overflow-y-auto pr-1">
              {SECTIONS.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-xs font-sans text-white/60 hover:text-[#5eead4] hover:bg-white/[0.04] rounded-md px-2 py-1.5 transition-colors"
                >
                  <span className="text-white/35 font-mono mr-1.5">{index + 1}.</span>
                  {section.title}
                </a>
              ))}
              <a
                href={`#${CONTACT.id}`}
                className="block text-xs font-sans text-white/60 hover:text-[#5eead4] hover:bg-white/[0.04] rounded-md px-2 py-1.5 transition-colors"
              >
                <span className="text-white/35 font-mono mr-1.5">12.</span>
                {CONTACT.title}
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <article className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="pb-8 border-b border-white/10 mb-10">
            <span className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4">
              <ShieldCheck className="w-3 h-3" />
              Privacy
            </span>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-3 font-sans text-sm text-white/50">
              Last Updated: <span className="text-white/75 font-semibold">{LAST_UPDATED}</span>
            </p>

            <p className="mt-6 font-sans text-sm leading-7 text-white/75 max-w-3xl">
              Welcome to Zyphoriz (“Zyphoriz,” “we,” “us,” or “our”). We respect your privacy and
              are committed to protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and protect information when you visit our website,
              use our platform, or interact with our services.
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
                      <p
                        key={i}
                        className="font-sans text-sm leading-7 text-white/70"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {section.blocks && (
                  <div className="pl-11 space-y-4">
                    {section.blocks.map(({ subtitle, body }) => (
                      <div
                        key={subtitle}
                        className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
                      >
                        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#5eead4] mb-2">
                          {subtitle}
                        </p>
                        <p className="font-sans text-sm leading-7 text-white/70">
                          {body}
                        </p>
                      </div>
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

            {/* Contact Us */}
            <section
              id={CONTACT.id}
              className="scroll-mt-24 border-t border-white/10 pt-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-mono text-xs font-bold flex items-center justify-center mt-0.5">
                  12
                </span>
                <h2 className="font-headline text-lg md:text-xl font-bold text-white pt-1">
                  {CONTACT.title}
                </h2>
              </div>

              <div className="pl-11">
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONTACT.items.map(({ icon: Icon, label, value, href }) => {
                    const content = (
                      <>
                        <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#5eead4]" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/45">
                            {label}
                          </p>
                          <p className="font-sans text-sm font-semibold text-white truncate">
                            {value}
                          </p>
                        </div>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.04] transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-3 px-2 py-2">
                        {content}
                      </div>
                    );
                  })}
                </div>

                <p className="font-sans text-xs text-white/50 mt-4">
                  Please replace the placeholders above with your actual registered business
                  details before publishing.
                </p>
              </div>
            </section>
          </div>

          {/* Bottom CTA */}
          <section className="mt-12 pt-8 border-t border-white/10">
            <div className="relative overflow-hidden rounded-2xl px-6 py-8 md:px-10 md:py-10 border border-white/10
                            bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
                            shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
              <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full border-[20px] border-white/10" />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-headline text-xl md:text-2xl font-bold text-white mb-2">
                    Own a business?
                  </p>
                  <p className="font-sans text-sm text-white/85 max-w-md">
                    Get listed on Zyphoriz for just ₹499 and be discoverable by thousands of local customers.
                  </p>
                </div>

                <Link
                  to="/create"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0f766e] font-sans font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all active:scale-[0.98] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] flex-shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  List your business
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Back to top */}
          <div className="mt-8 flex justify-center">
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
    </div>
  </main>
);