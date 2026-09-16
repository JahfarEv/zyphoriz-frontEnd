import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageCircle,
  Clock,
  Building2,
  Globe,
  MapPin,
  PlusCircle,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const CONTACT = [
  {
    icon: Building2,
    label: 'Company',
    value: 'Nexus Ventures LLC',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'https://zyphoriz.com',
    display: 'zyphoriz.com',
    href: 'https://zyphoriz.com',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact.zyphoriz@gmail.com',
    href: 'mailto:contact.zyphoriz@gmail.com',
    external: false,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'NEXUS VENTURES LLC, 2nd Floor, Flat No.: 235, Binnamangala, Indiranagar, Bengaluru, 560038',
    full: true,
  },
];

export const Contact = () => (
  <main className="w-full min-h-screen bg-[#16292C] text-white px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.16),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

    <div className="relative max-w-5xl mx-auto space-y-8">
      {/* Split hero + contact details */}
      <section className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        {/* Left: gradient hero */}
        <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-14
                        bg-[linear-gradient(150deg,#0f766e_0%,#14b8a6_55%,#b94630_140%)]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
          <div className="pointer-events-none absolute -left-14 -bottom-14 h-44 w-44 rounded-full border-[22px] border-white/10" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Contact us
            </span>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Let&rsquo;s talk about what you found.
            </h1>

            <p className="mt-6 font-sans text-sm md:text-base leading-7 text-white/85 max-w-md">
              Questions about a listing, your account, or bringing your business to Zyphoriz?
              Our team is here to help.
            </p>

            {/* Quick response-time note */}
            <div className="mt-8 pt-6 border-t border-white/20 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/75">
                  Response time
                </p>
                <p className="font-sans text-sm text-white/90 font-semibold">
                  Within 1–2 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: contact details */}
        <div className="px-6 py-10 md:px-10 md:py-12">
          <p className="font-headline text-lg md:text-xl font-bold text-white mb-6">
            Contact details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CONTACT.map(({ icon: Icon, label, value, display, href, external, full }) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#5eead4]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/45">
                      {label}
                    </p>
                    <p className="font-sans text-sm font-semibold text-white break-words">
                      {display || value}
                    </p>
                  </div>
                  {href && (
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#5eead4] transition-colors flex-shrink-0 self-start mt-2" />
                  )}
                </>
              );

              const baseClass = `group flex items-start gap-3 rounded-xl px-3.5 py-3 border transition-all ${
                full ? 'sm:col-span-2' : ''
              }`;

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`${baseClass} bg-white/[0.03] border-white/10 hover:border-[#14b8a6]/40 hover:bg-white/[0.06]`}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={label}
                  className={`${baseClass} bg-white/[0.03] border-white/10`}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary info — enquiries + support */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
            <MessageCircle className="w-5 h-5 text-[#5eead4]" />
          </div>
          <h2 className="font-headline text-base md:text-lg font-bold text-white mb-1.5">
            Business enquiries
          </h2>
          <p className="font-sans text-sm leading-7 text-white/65">
            Tell us about your business and how we can help you reach more local customers.
          </p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#E8A23D]/15 border border-[#E8A23D]/30 flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-[#E8A23D]" />
          </div>
          <h2 className="font-headline text-base md:text-lg font-bold text-white mb-1.5">
            Email support
          </h2>
          <a
            href="mailto:contact.zyphoriz@gmail.com"
            className="font-sans text-sm font-semibold text-[#5eead4] hover:underline break-all"
          >
            contact.zyphoriz@gmail.com
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl px-6 py-8 md:px-10 md:py-10 border border-white/10
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
              Get listed on Zyphoriz for just ₹499 and be discoverable by thousands of local
              customers.
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
      </section>
    </div>
  </main>
);