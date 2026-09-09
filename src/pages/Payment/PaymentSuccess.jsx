import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Store, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';

export const PaymentSuccess = () => {
  const { formData } = useRegistration();
  const txnId = `NXR-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const slug = formData.slug || 'your-business';
  const businessUrl = `nexora.in/${slug}`;

  const copyUrl = () => {
    navigator.clipboard?.writeText(`https://${businessUrl}`);
  };

  return (
    <main className="w-full px-4 md:px-6 py-12 text-center">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-md space-y-6">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-11 h-11" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
          </span>
          <h1 className="font-headline text-3xl font-bold text-on-surface">
            You're Live! 🎉
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
            <span className="font-bold text-on-surface">{formData.name || 'Your business'}</span> is now listed on Nexora and discoverable by thousands of local customers.
          </p>
        </div>

        {/* URL Box */}
        <div className="bg-primary/5 border border-primary/30 rounded-2xl p-5 space-y-2">
          <p className="font-sans text-xs text-outline font-semibold uppercase tracking-wide">Your Business URL</p>
          <p className="font-mono text-lg font-bold text-primary break-all">{businessUrl}</p>
          <div className="flex justify-center gap-3 pt-1">
            <button
              onClick={copyUrl}
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" /> Copy URL
            </button>
            <Link
              to={`/${slug}`}
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Page
            </Link>
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-4 text-left space-y-2 font-sans text-sm">
          <div className="flex justify-between border-b border-outline-variant/20 pb-2">
            <span className="text-outline">Transaction ID:</span>
            <span className="font-mono font-semibold text-on-surface text-xs">{txnId}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant/20 pb-2">
            <span className="text-outline">Plan:</span>
            <span className="font-semibold text-on-surface">Standard · 1 Year</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-on-surface">Amount Paid:</span>
            <span className="text-secondary">₹499</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to={`/${slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-sans font-bold py-3 rounded-xl hover:bg-primary/90 transition-all text-sm">
              <Store className="w-4 h-4" />
              View My Business Page
            </button>
          </Link>
          <Link to="/" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 border border-outline-variant text-on-surface font-sans font-semibold py-3 rounded-xl hover:bg-surface-container transition-all text-sm">
              Back to Home <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};
