import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Target,
  Eye,
  Sparkles,
  Search,
  Users,
  Cpu,
  Zap,
  Building2,
  Mail,
  Globe,
  MapPin,
  Home,
} from 'lucide-react';

const VALUES = [
  {
    icon: Compass,
    title: 'Your Space. Your Identity.',
    text: 'Create a stunning digital page that showcases who you are, what you do, and everything in between.',
  },
  {
    icon: ShieldCheck,
    title: 'One Link. Everything.',
    text: 'Share your unique URL and QR code on WhatsApp, Instagram, or print it for your shop.',
  },
  {
    icon: HeartHandshake,
    title: 'Built for Everyone',
    text: 'Made for individuals, creators, services, shops and businesses — no code, no hosting, no designer needed.',
  },
];

const WHAT_WE_DO = [
  {
    icon: MapPin,
    title: 'Your Own Page',
    text: 'A professional page at zyphoriz.com/yourname — clean, mobile-friendly, and ready in minutes.',
  },
  {
    icon: Search,
    title: 'Call, WhatsApp & Directions',
    text: 'One-tap buttons so visitors can call you, message you on WhatsApp, or get directions instantly.',
  },
  {
    icon: Users,
    title: 'Address, Hours & Gallery',
    text: 'Show your location, working hours, photo gallery, and Google Maps link so people find you easily.',
  },
  {
    icon: Cpu,
    title: 'Verified Badge & Listing',
    text: 'A verified profile that builds trust and lets visitors browse your products and services.',
  },
];

const WHY = [
  { title: 'No Code', text: 'Easy page builder — create your page in minutes.' },
  { title: 'One Link', text: 'Everything in one place: contact, location, gallery, services.' },
  { title: 'Mobile-First', text: 'Your page looks great and works perfectly on any device.' },
  { title: 'Unlimited Edits', text: 'Update your details, offers, hours, or photos anytime.' },
];

const CONTACT = [
  { icon: Globe, label: 'Website', value: 'https://zyphoriz.com', href: 'https://zyphoriz.com' },
  { icon: Mail, label: 'Email', value: 'contact.zyphoriz@gmail.com', href: 'mailto:contact.zyphoriz@gmail.com' },
  { icon: Building2, label: 'Company', value: 'Nexus Ventures LLC' },
];

export const About = () => (
  <main className="w-full min-h-screen bg-[#16292C] text-white relative overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.16),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

    <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
     <Link
            to="/"
            className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-14 md:py-16 border border-white/10
                          bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
                          shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full border-[28px] border-white/10" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-5 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            About Zyphoriz
          </span>

          <h1 className="max-w-3xl font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Everything about you, all in one link.
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-base md:text-lg leading-8 text-white/85">
            Create your own stunning digital page in minutes. Showcase who you are, what you do,
            your work, services, photos and contact details — all in one place. Made for
            individuals, creators, services, shops and businesses.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article key={title} className="space-y-3 border-t-2 border-[#E8A23D] pt-5">
              <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#5eead4]" />
              </div>
              <h2 className="font-headline text-lg md:text-xl font-bold text-white">{title}</h2>
              <p className="font-sans text-sm leading-7 text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
            <Target className="h-5 w-5 text-[#5eead4]" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#5eead4]">
              Our Mission
            </p>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-white mt-1">
              Get your page online in minutes.
            </h2>
          </div>
        </div>
        <p className="font-sans text-sm md:text-base leading-8 text-white/70 max-w-3xl">
          Three simple steps to get your page online and shareable: enter your details, your page
          goes live instantly at zyphoriz.com/yourname, and you share your unique link and QR code
          with anyone.
        </p>
      </section>

      {/* What your page looks like */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-8 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center">
            <Zap className="h-4 w-4 text-[#5eead4]" />
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">What your page looks like</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-[#5eead4]" />
              </div>
              <h3 className="font-headline text-base md:text-lg font-bold text-white mb-2">{title}</h3>
              <p className="font-sans text-sm leading-7 text-white/65">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E8A23D]/15 border border-[#E8A23D]/30 flex items-center justify-center flex-shrink-0">
            <Eye className="h-5 w-5 text-[#E8A23D]" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8A23D]">
              Our Vision
            </p>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-white mt-1">
              One link for everyone.
            </h2>
          </div>
        </div>
        <p className="font-sans text-sm md:text-base leading-8 text-white/70 max-w-3xl">
          To become the go-to platform where every individual, creator, service provider, shop,
          and business can build a professional online presence — instantly, affordably, and
          without any technical know-how.
        </p>
      </section>

      {/* Why Zyphoriz */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-white mb-8">Why Zyphoriz?</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {WHY.map(({ title, text }, i) => (
            <div key={title} className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] font-mono text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-headline text-sm md:text-base font-bold text-white">{title}</p>
                <p className="font-sans text-xs md:text-sm leading-6 text-white/65 mt-0.5">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the community — CTA */}
      <section className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-14 md:py-14 border border-white/10
                          bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_55%,#b94630_130%)]
                          shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />

        <div className="relative text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-5 backdrop-blur-sm">
            <HeartHandshake className="w-3 h-3" />
            Join 500+ creators and businesses
          </span>

          <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to go live?
          </h2>
          <p className="font-sans text-sm md:text-base leading-7 text-white/85 mb-8 max-w-xl mx-auto">
            Create your page and share it with the world today. Get started on Zyphoriz for just
            ₹499 and be discoverable by thousands of people.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-white text-[#0f766e] font-sans font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all active:scale-[0.98] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)]"
            >
              Create your page <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-white/50 text-white font-sans font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              Explore Zyphoriz
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white/[0.04] border border-white/10 rounded-3xl px-6 py-10 md:px-10 md:py-12 backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
        <h2 className="font-headline text-xl md:text-2xl font-bold text-white mb-6">Contact us</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#5eead4]" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/45">{label}</p>
                  <p className="font-sans text-sm font-semibold text-white truncate">{value}</p>
                </div>
              </>
            );

            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
              >
                {inner}
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  </main>
);