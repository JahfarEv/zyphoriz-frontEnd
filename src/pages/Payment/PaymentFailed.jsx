import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useRegistration } from '../../context/RegistrationContext';

export const PaymentFailed = () => {
  const { formData } = useRegistration();

  return (
    <main className="w-full px-margin-mobile md:px-margin-desktop py-12 text-center">
      <div className="bg-surface-container-lowest border border-error/20 rounded-3xl p-8 md:p-12 shadow-md space-y-6">
        {/* Failed Icon */}
        <div className="w-20 h-20 bg-error-container/50 text-error rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-error rounded-full text-xs font-semibold mb-2">
            <AlertTriangle className="w-4 h-4" /> Transaction Unsuccessful
          </span>
          <h1 className="font-headline text-3xl font-bold text-on-surface">
            Payment Failed
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
            We couldn't process your payment for <span className="font-bold text-on-surface">{formData.name}</span>. No charges were made to your account.
          </p>
        </div>

        {/* Breakdown Box */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 text-left space-y-3 font-sans text-sm">
          <h4 className="font-headline text-xs font-bold text-outline uppercase tracking-wider">
            Possible Reasons:
          </h4>
          <ul className="space-y-1.5 text-on-surface-variant text-xs list-disc pl-4">
            <li>Bank transaction timeout or network interruption</li>
            <li>Insufficient card balance or payment limits</li>
            <li>Incorrect OTP or authorization code entered</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/payment/checkout" className="flex-1">
            <Button variant="primary" size="lg" icon={RefreshCw} className="w-full bg-error text-white hover:bg-red-700">
              Retry Payment
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" icon={ArrowLeft} className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
