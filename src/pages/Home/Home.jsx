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
} from "lucide-react";

const AMBER = "#E8A23D";

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
      icon: QrCode,
      title: "QR code for your shop",
      desc: "Print it on your counter, visiting card, packaging, or window. Customers scan and reach you.",
    },
    {
      icon: MapPin,
      title: "Address & hours",
      desc: "Show your location, working hours, and a Google Maps link so customers find you easily.",
    },
    {
      icon: Image,
      title: "Photo gallery",
      desc: "Display your shop, products, or work with a clean mobile-friendly gallery.",
    },
    {
      icon: BadgeCheck,
      title: "Verified badge",
      desc: "A verified profile that builds trust and looks professional to every customer.",
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

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Owner, Sharma Electronics",
      text: "I created my business page in 5 minutes. Customers now call me directly from my link.",
    },
    {
      name: "Priya Mehta",
      role: "Freelance Designer",
      text: "My page looks professional. I shared it on Instagram and started getting inquiries.",
    },
    {
      name: "Amit Verma",
      role: "Local Grocery Store",
      text: "The QR code is on my shop counter. It is so easy for customers to reach me.",
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
      a: "A mobile-friendly business page with call, WhatsApp, directions, photo gallery, services, verified badge, QR code, and more.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#16292C] text-white">
      {/* HERO */}
      <section className="relative pt-14 pb-20 px-4 md:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(${AMBER} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.18),transparent_55%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#E8A23D] text-[#16292C] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-[0_10px_30px_-10px_rgba(232,162,61,0.6)]">
            <Sparkles className="w-4 h-4" />
            For shops, professionals &amp; freelancers
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Everything about your business
            <span className="block bg-gradient-to-r from-[#5eead4] to-[#E8A23D] bg-clip-text text-transparent">
              on one link
            </span>
          </h1>

          <div className="w-16 h-1 bg-[#E8A23D] mx-auto mb-8 rounded-full" />

          <p className="font-sans text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Create a shareable page with your contact, location, hours, photos,
            and services — no website needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 text-white font-sans font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-base
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
              className="inline-flex items-center gap-2 text-white/80 font-sans font-semibold px-6 py-4 rounded-2xl border border-white/15 hover:bg-white/[0.06] transition-all"
            >
              See how it works
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-white/50">
            <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
            Trusted by 500+ business owners
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-[#5eead4]">500+</div>
              <div className="text-sm text-white/60">Live pages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#E8A23D]">50+</div>
              <div className="text-sm text-white/60">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#5eead4]">2 min</div>
              <div className="text-sm text-white/60">Setup time</div>
            </div>
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
                items: ["Shop photos", "Product images", "Work samples"],
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

      {/* TESTIMONIALS */}
      <section className="relative py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              Loved by local business owners
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto">
              Here is what early users are saying about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#E8A23D] fill-current"
                    />
                  ))}
                </div>
                <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-sm font-bold text-white">
                    {item.name}
                  </p>
                  <p className="font-sans text-xs text-white/50">{item.role}</p>
                </div>
              </div>
            ))}
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

          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-[#FBF6EC] text-[#B94630] font-sans font-bold px-10 py-4 rounded-2xl hover:bg-white transition-all duration-200 text-lg shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] active:scale-[0.98]"
          >
            <PlusCircle className="w-6 h-6" />
            Create your page
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
