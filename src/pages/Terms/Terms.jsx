import React from 'react';

const sections = [
  ['Using ZYPHORIZ', 'ZYPHORIZ is a discovery platform for finding and presenting local businesses. You agree to use the service lawfully and not to interfere with its operation or misuse another person’s account.'],
  ['Business listings', 'Business owners are responsible for keeping their listing information accurate, current, and lawful. We may review, update, or remove content that is misleading, harmful, or violates these terms.'],
  ['Accounts and payments', 'You are responsible for protecting your login details. Listing plans and payments are shown before checkout. Payment processing may be handled by a third-party payment provider under its own terms.'],
  ['Content and links', 'Information on a listing is provided by the business owner. ZYPHORIZ does not guarantee the quality, availability, or suitability of any business, product, or service discovered through the platform.'],
  ['Changes to these terms', 'We may update these terms as the service changes. When we make material changes, the updated version will be posted on this page with a revised date.'],
];

export const Terms = () => (
  <main className="w-full px-4 py-12 md:px-8 md:py-20">
    <article className="mx-auto max-w-4xl rounded-3xl bg-[#FBF6EC] px-6 py-10 shadow-xl ring-1 ring-black/10 md:px-14 md:py-14">
      <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">Legal</p>
      <h1 className="mt-3 font-headline text-4xl font-extrabold text-on-surface md:text-5xl">Terms and Conditions</h1>
      <p className="mt-4 font-sans text-sm text-on-surface-variant">Last updated: September 16, 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map(([heading, text]) => (
          <section key={heading} className="border-t border-outline-variant/60 pt-6">
            <h2 className="font-headline text-xl font-bold text-on-surface">{heading}</h2>
            <p className="mt-3 font-sans text-sm leading-7 text-on-surface-variant">{text}</p>
          </section>
        ))}
      </div>
    </article>
  </main>
);
