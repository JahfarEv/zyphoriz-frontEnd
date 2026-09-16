import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

const values = [
  {
    icon: Compass,
    title: 'Explore locally',
    text: 'Find useful places and services around you without the noise of a generic search.',
  },
  {
    icon: ShieldCheck,
    title: 'Choose with confidence',
    text: 'Clear business details and verified profiles help you make decisions with confidence.',
  },
  {
    icon: HeartHandshake,
    title: 'Support small business',
    text: 'Every discovery can become a meaningful visit, booking, or new local connection.',
  },
];

export const About = () => (
  <main className="w-full px-4 py-12 md:px-8 md:py-20">
    <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#FBF6EC] shadow-xl ring-1 ring-black/10">
      <div className="bg-[linear-gradient(135deg,#16292c_0%,#2f756d_65%,#b94630_125%)] px-6 py-12 text-[#FBF6EC] md:px-14 md:py-16">
        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#E8A23D]">About ZYPHORIZ</p>
        <h1 className="max-w-3xl font-headline text-4xl font-extrabold leading-tight md:text-6xl">Make your next local discovery count.</h1>
        <p className="mt-6 max-w-2xl font-sans text-base leading-8 text-[#FBF6EC]/80 md:text-lg">
          ZYPHORIZ helps people discover trusted local businesses, while giving independent owners a simple place to be found.
        </p>
      </div>

      <div className="px-6 py-10 md:px-14 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="space-y-4 border-t-2 border-[#E8A23D] pt-5">
              <Icon className="h-6 w-6 text-secondary" />
              <h2 className="font-headline text-xl font-bold text-on-surface">{title}</h2>
              <p className="font-sans text-sm leading-7 text-on-surface-variant">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-outline-variant/50 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl font-sans text-sm leading-7 text-on-surface-variant">Have a local business to share with your community?</p>
          <Link to="/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-sans text-sm font-bold text-on-primary transition hover:bg-primary-container">
            List your business <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </main>
);
