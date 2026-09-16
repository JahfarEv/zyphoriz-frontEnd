import React from 'react';
import { Mail, MessageCircle, Clock } from 'lucide-react';

export const Contact = () => (
  <main className="w-full px-4 py-12 md:px-8 md:py-20">
    <section className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-[#FBF6EC] shadow-xl ring-1 ring-black/10 md:grid-cols-[0.9fr_1.1fr]">
      <div className="bg-[linear-gradient(150deg,#16292c_0%,#2f756d_70%,#b94630_120%)] px-6 py-12 text-[#FBF6EC] md:px-12 md:py-16">
        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#E8A23D]">Contact us</p>
        <h1 className="font-headline text-4xl font-extrabold leading-tight md:text-5xl">Let’s talk about what you found.</h1>
        <p className="mt-6 font-sans text-sm leading-7 text-[#FBF6EC]/75">Questions about a listing, your account, or bringing your business to ZYPHORIZ? Our team is here to help.</p>
      </div>

      <div className="space-y-8 px-6 py-10 md:px-12 md:py-16">
        <div className="flex gap-4">
          <Mail className="mt-1 h-5 w-5 shrink-0 text-secondary" />
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">Email support</h2>
            <a href="mailto:support@zyphoriz.com" className="mt-1 block font-sans text-sm text-secondary hover:underline">support@zyphoriz.com</a>
          </div>
        </div>
        <div className="flex gap-4">
          <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-secondary" />
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">Business enquiries</h2>
            <p className="mt-1 font-sans text-sm leading-6 text-on-surface-variant">Tell us about your business and how we can help you reach more local customers.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock className="mt-1 h-5 w-5 shrink-0 text-secondary" />
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">Response time</h2>
            <p className="mt-1 font-sans text-sm leading-6 text-on-surface-variant">We usually respond within 1–2 business days.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);
