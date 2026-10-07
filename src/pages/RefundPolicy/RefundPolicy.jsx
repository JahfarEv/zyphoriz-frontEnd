import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowUp, Home } from 'lucide-react';

const LAST_UPDATED = 'October 7, 2026';

const SECTIONS = [
  {
    id: 'no-refund',
    title: 'No Refund Policy',
    body: [
      'All sales are final. Once a user completes the payment of INR 500+GST and submits their details, the system automatically generates and provisions the custom URL and digital profile instantly.',
      'Due to the digital and instant nature of the service, we do not offer refunds, cancellations, or exchanges under any circumstances once the transaction is successfully processed and the profile is generated.',
    ],
  },
  {
    id: 'exceptions',
    title: 'Exceptions',
    body: [
      'We do not issue refunds for changes of mind, accidental purchases, or dissatisfaction with self-uploaded content. In the rare event of a technical failure where a payment is debited from your account but the profile/URL is not created, please contact our support team with transaction details, and we will manually verify and activate your profile or process a refund solely at our discretion.',
    ],
  },
];

export const RefundPolicy = () => (
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
          {/* Home button – full width of content */}

          <span className="inline-flex items-center gap-1.5 bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-4">
            <FileText className="w-3 h-3" />
            Policy
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Refund and Cancellation Policy
          </h1>

          <p className="mt-3 font-sans text-sm text-white/50">
            Last Updated: <span className="text-white/75 font-semibold">{LAST_UPDATED}</span>
          </p>

          <p className="mt-6 font-sans text-sm leading-7 text-white/75 max-w-3xl">
            Thank you for choosing zyphoriz.com, a platform operated by Nexus Ventures LLC,
            located in Indiranagar, Bengaluru, Karnataka 560038.
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