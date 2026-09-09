import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  IndianRupee,
  Store,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Tag,
} from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';

import { saveMockBusiness } from '../../data/mockBusinesses';
import { useAuth } from '../../context/AuthContext';

export const PaymentCheckout = () => {
  const navigate = useNavigate();
  const { formData } = useRegistration();
  const { user, awardReferralCommission } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paying, setPaying] = useState(false);
  const [upiId, setUpiId] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setPaying(true);
    try {
      const businessPayload = {
        ownerId: user.id,
        ownerReferralCode: user.referralCode,
        referralCode: formData.referralCode || '',
        name: formData.name,
        slug: formData.slug,
        category: formData.categoryName,
        categoryId: formData.category,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        location: formData.address ? `${formData.address}, ${formData.city}` : formData.city,
        description: formData.description,
        openingHours: formData.openingHours,
        hours: (formData.openingHours || [])
          .filter((hour) => hour.open)
          .map((hour) => ({
            day: hour.day,
            time: `${hour.from} - ${hour.to}`,
          })),
        image: formData.bannerImage,
        coverImage: formData.bannerImage,
        gallery: formData.galleryImages || [],
        selectedPlan: formData.selectedPlan || 'standard',
        planPrice: formData.planPrice || '₹499/yr',
        verified: true,
        rating: 5.0,
        reviewCount: 0,
        createdAt: new Date().toISOString()
      };

      saveMockBusiness(businessPayload);
      awardReferralCommission(formData.referralCode, user.id);
      
      navigate('/payment/success');
    } catch (err) {
      console.error(err);
      alert('Error processing payment or saving business');
    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="w-full px-4 md:px-6 py-8">
      {/* Back */}
      <Link
        to="/create"
        className="inline-flex items-center gap-1.5 font-sans text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Form
      </Link>

      <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-background mb-6">
        Complete Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Payment Methods — Left */}
        <div className="lg:col-span-3 space-y-4">
          {/* UPI Option */}
          <div
            onClick={() => setPaymentMethod('upi')}
            className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
              paymentMethod === 'upi'
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'upi' ? 'border-primary' : 'border-outline'}`}>
                {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="font-sans font-semibold text-sm text-on-surface">UPI / PhonePe / GPay / Paytm</span>
            </div>
            {paymentMethod === 'upi' && (
              <div className="pl-8">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="w-full bg-background border border-outline-variant focus:border-primary rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-outline mt-2">Or use any UPI app to scan QR at checkout.</p>
              </div>
            )}
          </div>

          {/* Card Option */}
          <div
            onClick={() => setPaymentMethod('card')}
            className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
              paymentMethod === 'card'
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-primary' : 'border-outline'}`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="font-sans font-semibold text-sm text-on-surface">Debit / Credit Card</span>
            </div>
            {paymentMethod === 'card' && (
              <div className="pl-8 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength={19}
                  className="w-full bg-background border border-outline-variant focus:border-primary rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="bg-background border border-outline-variant focus:border-primary rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength={4}
                    className="bg-background border border-outline-variant focus:border-primary rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full bg-background border border-outline-variant focus:border-primary rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}
          </div>

          {/* Pay Button */}
          <form onSubmit={handlePay}>
            <button
              type="submit"
              disabled={paying}
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-on-primary font-sans font-bold py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-base shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {paying ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay ₹499 Securely
                </>
              )}
            </button>
          </form>

          <p className="text-center font-sans text-xs text-outline">
            🔒 256-bit SSL Encrypted · Safe & Secure Payment
          </p>
        </div>

        {/* Order Summary — Right */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 space-y-4 sticky top-6">
            <h2 className="font-headline text-lg font-bold text-on-surface">Order Summary</h2>

            {/* Business Preview */}
            <div className="bg-surface-container rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-sans font-bold text-sm text-on-surface truncate">
                  {formData.name || 'Your Business'}
                </p>
                <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <Tag className="w-3 h-3" />
                  {formData.categoryName || 'Category'}
                </p>
                {formData.city && (
                  <p className="font-sans text-xs text-outline flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {formData.city}
                  </p>
                )}
              </div>
            </div>

            {/* URL Preview */}
            {formData.slug && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                <p className="font-sans text-xs text-outline mb-0.5">Your business URL:</p>
                <p className="font-mono text-sm font-semibold text-primary break-all">
                  nexora.in/{formData.slug}
                </p>
              </div>
            )}

            {/* Pricing */}
            <div className="border-t border-outline-variant/20 pt-4 space-y-2">
              <div className="flex justify-between font-sans text-sm text-on-surface-variant">
                <span>Standard Listing</span>
                <span>₹499</span>
              </div>
              <div className="flex justify-between font-sans text-sm text-on-surface-variant">
                <span>GST</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between font-headline font-bold text-base text-on-surface border-t border-outline-variant/20 pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary">₹499</span>
              </div>
            </div>

            {/* Included */}
            <div className="space-y-2">
              {[
                'Dedicated URL at nexora.in/{name}',
                'Verified business badge',
                'Direct call & WhatsApp button',
                'Category listing & search',
                'Valid for 1 full year',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 font-sans text-xs text-on-surface-variant">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
