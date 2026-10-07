import React, { useState } from 'react';
import {
  Mail,
  Clock,
  Building2,
  Globe,
  MapPin,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
  Tag,
  Sparkles,
  Home,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTACT_INFO = [
  {
    icon: Building2,
    label: 'Company',
    value: 'Nexus Ventures LLC',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'zyphoriz.com',
    href: 'https://zyphoriz.com',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact.zyphoriz@gmail.com',
    href: 'mailto:contact.zyphoriz@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'NEXUS VENTURES LLC, 2nd Floor, Flat No.: 235, Binnangala, Indiranagar, Bengaluru, 560038',
  },
];

const SUBJECTS = [
  'General enquiry',
  'Business listing',
  'Account support',
  'Payments & billing',
  'Report an issue',
  'Other',
];

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: SUBJECTS[0],
  message: '',
};

export const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) next.message = 'Please enter your message.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    // TODO: wire up to your backend / email service
    console.log('Contact form submitted:', form);
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  const inputBase =
    'w-full bg-white/[0.03] border rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#14b8a6]/60 focus:bg-white/[0.06]';

  return (
    <main className="w-full min-h-screen bg-[#16292C] text-white px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.16),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto space-y-8">
       <Link
            to="/"
            className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        {/* Split hero + contact form */}
        <section className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
          {/* Left: gradient hero + info */}
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
                Let&rsquo;s talk.
              </h1>

              <p className="mt-6 font-sans text-sm md:text-base leading-7 text-white/85 max-w-md">
                Have a question about a listing, your account, or want to get your page online?
                Fill in the form and our team will get back to you.
              </p>

              {/* Contact details */}
              <div className="mt-8 pt-6 border-t border-white/20 space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/70">
                          {label}
                        </p>
                        <p className="font-sans text-sm text-white/95 font-semibold break-words">
                          {value}
                        </p>
                      </div>
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="flex items-start gap-3 rounded-xl hover:bg-white/10 transition-colors -mx-2 px-2 py-1"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className="flex items-start gap-3">
                      {inner}
                    </div>
                  );
                })}

                {/* Response time */}
                <div className="flex items-start gap-3 pt-4 border-t border-white/20">
                  <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/70">
                      Response time
                    </p>
                    <p className="font-sans text-sm text-white/95 font-semibold">
                      Within 1–2 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="px-6 py-10 md:px-10 md:py-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7 text-[#5eead4]" />
                </div>
                <h2 className="font-headline text-xl md:text-2xl font-bold text-white mb-2">
                  Message sent!
                </h2>
                <p className="font-sans text-sm leading-7 text-white/65 max-w-sm mb-6">
                  Thanks for reaching out. We&rsquo;ve received your message and will get back to
                  you within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 hover:border-[#14b8a6]/40 hover:bg-white/[0.08] text-white/80 hover:text-[#5eead4] font-sans text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <p className="font-headline text-lg md:text-xl font-bold text-white mb-1.5">
                  Send us a message
                </p>
                <p className="font-sans text-sm text-white/55 mb-7">
                  Fill in the details below and we&rsquo;ll be in touch.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2"
                    >
                      <User className="w-3 h-3" />
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`${inputBase} ${errors.name ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                    {errors.name && (
                      <p className="font-sans text-xs text-red-300/90 mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2"
                    >
                      <Mail className="w-3 h-3" />
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${inputBase} ${errors.email ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                    {errors.email && (
                      <p className="font-sans text-xs text-red-300/90 mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2"
                    >
                      <Tag className="w-3 h-3" />
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputBase} border-white/10 appearance-none cursor-pointer`}
                    >
                      {SUBJECTS.map((option) => (
                        <option key={option} value={option} className="bg-[#16292C] text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className={`${inputBase} resize-none ${errors.message ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                    {errors.message && (
                      <p className="font-sans text-xs text-red-300/90 mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full bg-white text-[#0f766e] font-sans font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all active:scale-[0.98] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)]"
                  >
                    <Send className="w-4 h-4" />
                    Send message
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};