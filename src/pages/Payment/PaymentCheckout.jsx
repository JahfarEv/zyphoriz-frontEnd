// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   ShieldCheck,
//   CreditCard,
//   Smartphone,
//   IndianRupee,
//   Store,
//   MapPin,
//   CheckCircle2,
//   ArrowLeft,
//   Lock,
//   Tag,
// } from 'lucide-react';
// import { useRegistration } from '../../context/RegistrationContext';

// import { useAuth } from '../../context/AuthContext';
// import { api } from '../../lib/api';

// export const PaymentCheckout = () => {
//   const navigate = useNavigate();
//   const { formData } = useRegistration();
//   const { user } = useAuth();
//   const [paymentMethod, setPaymentMethod] = useState('upi');
//   const [paying, setPaying] = useState(false);

//   const loadRazorpay = () => new Promise((resolve, reject) => {
//     if (window.Razorpay) return resolve(true);
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => reject(new Error('Unable to load Razorpay Checkout'));
//     document.body.appendChild(script);
//   });

//   const handlePay = async (e) => {
//     e.preventDefault();
//     setPaying(true);
//     try {
//       await loadRazorpay();
//       const businessPayload = {
//         referralCode: formData.referralCode || '',
//         name: formData.name,
//         category: formData.categoryName,
//         categoryId: formData.category,
//         phone: formData.phone,
//         whatsapp: formData.whatsapp,
//         email: formData.email,
//         website: formData.website,
//         instagram: formData.instagram,
//         facebook: formData.facebook,
//         youtube: formData.youtube,
//         video: formData.video,
//         address: formData.address,
//         city: formData.city,
//         location: formData.address ? `${formData.address}, ${formData.city}` : formData.city,
//         description: formData.description,
//         openingHours: formData.openingHours,
//         hours: (formData.openingHours || [])
//           .filter((hour) => hour.open)
//           .map((hour) => ({
//             day: hour.day,
//             time: `${hour.from} - ${hour.to}`,
//           })),
//         image: typeof formData.bannerImage === 'string' && !formData.bannerImage.startsWith('blob:') ? formData.bannerImage : '',
//         gallery: formData.galleryImages || [],
//       };
//       const payload = new FormData();
//       Object.entries(businessPayload).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//           payload.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
//         }
//       });
//       if (formData.bannerFile) payload.append('banner', formData.bannerFile);
//       (formData.galleryFiles || []).forEach((file) => payload.append('gallery', file));
//       const { business } = await api.businesses.create(payload);
//       const { order, keyId, currency } = await api.payments.createOrder({ businessId: business._id });

//       await new Promise((resolve, reject) => {
//         const razorpay = new window.Razorpay({
//           key: keyId,
//           amount: order.amount,
//           currency,
//           name: 'zyphoriz',
//           description: 'Standard business listing',
//           order_id: order.id,
//           prefill: { name: user?.name, email: user?.email, contact: user?.mobile },
//           notes: { businessId: business._id },
//           theme: { color: '#0f766e' },
//           handler: async (response) => {
//             try {
//               await api.payments.checkout({ businessId: business._id, method: paymentMethod, ...response });
//               resolve();
//             } catch (error) {
//               reject(error);
//             }
//           },
//           modal: { ondismiss: () => reject(new Error('Payment was cancelled')) },
//         });
//         razorpay.on('payment.failed', (response) => reject(new Error(response.error?.description || 'Payment failed')));
//         razorpay.open();
//       });
//       navigate('/payment/success');
//     } catch (err) {
//       console.error(err);
//       alert(err.message || 'Error processing payment or saving business');
//     } finally {
//       setPaying(false);
//     }
//   };

//   return (
//     <main className="w-full px-4 md:px-6 py-8">
//       {/* Back */}
//       <Link
//         to="/create"
//         className="inline-flex items-center gap-1.5 font-sans text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" /> Back to Form
//       </Link>

//       <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-background mb-6">
//         Complete Payment
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//         {/* Payment Methods — Left */}
//         <div className="lg:col-span-3 space-y-4">
//           {/* UPI Option */}
//           <div
//             onClick={() => setPaymentMethod('upi')}
//             className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
//               paymentMethod === 'upi'
//                 ? 'border-primary bg-primary/5'
//                 : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline'
//             }`}
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'upi' ? 'border-primary' : 'border-outline'}`}>
//                 {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
//               </div>
//               <Smartphone className="w-5 h-5 text-primary" />
//               <span className="font-sans font-semibold text-sm text-on-surface">UPI / PhonePe / GPay / Paytm</span>
//             </div>
//             {paymentMethod === 'upi' && <p className="pl-8 text-xs text-outline">UPI details are entered securely in Razorpay Checkout.</p>}
//           </div>

//           {/* Card Option */}
//           <div
//             onClick={() => setPaymentMethod('card')}
//             className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
//               paymentMethod === 'card'
//                 ? 'border-primary bg-primary/5'
//                 : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline'
//             }`}
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-primary' : 'border-outline'}`}>
//                 {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
//               </div>
//               <CreditCard className="w-5 h-5 text-primary" />
//               <span className="font-sans font-semibold text-sm text-on-surface">Debit / Credit Card</span>
//             </div>
//             {paymentMethod === 'card' && <p className="pl-8 text-xs text-outline">Card details are entered securely in Razorpay Checkout.</p>}
//           </div>

//           {/* Pay Button */}
//           <form onSubmit={handlePay}>
//             <button
//               type="submit"
//               disabled={paying}
//               className="w-full flex items-center justify-center gap-2.5 bg-primary text-on-primary font-sans font-bold py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-base shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
//             >
//               {paying ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
//                   Processing Payment...
//                 </>
//               ) : (
//                 <>
//                   <Lock className="w-4 h-4" />
//                   Pay ₹499 Securely
//                 </>
//               )}
//             </button>
//           </form>

//           <p className="text-center font-sans text-xs text-outline">
//             🔒 256-bit SSL Encrypted · Safe & Secure Payment
//           </p>
//         </div>

//         {/* Order Summary — Right */}
//         <div className="lg:col-span-2">
//           <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 space-y-4 sticky top-6">
//             <h2 className="font-headline text-lg font-bold text-on-surface">Order Summary</h2>

//             {/* Business Preview */}
//             <div className="bg-surface-container rounded-xl p-4 flex items-start gap-3">
//               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
//                 <Store className="w-5 h-5 text-primary" />
//               </div>
//               <div className="min-w-0">
//                 <p className="font-sans font-bold text-sm text-on-surface truncate">
//                   {formData.name || 'Your Business'}
//                 </p>
//                 <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
//                   <Tag className="w-3 h-3" />
//                   {formData.categoryName || 'Category'}
//                 </p>
//                 {formData.city && (
//                   <p className="font-sans text-xs text-outline flex items-center gap-1 mt-0.5">
//                     <MapPin className="w-3 h-3" />
//                     {formData.city}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* URL Preview */}
//             {formData.slug && (
//               <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
//                 <p className="font-sans text-xs text-outline mb-0.5">Your business URL:</p>
//                 <p className="font-mono text-sm font-semibold text-primary break-all">
//                   zyphoriz.in/{formData.slug}
//                 </p>
//               </div>
//             )}

//             {/* Pricing */}
//             <div className="border-t border-outline-variant/20 pt-4 space-y-2">
//               <div className="flex justify-between font-sans text-sm text-on-surface-variant">
//                 <span>Standard Listing</span>
//                 <span>₹499</span>
//               </div>
//               <div className="flex justify-between font-sans text-sm text-on-surface-variant">
//                 <span>GST</span>
//                 <span>Included</span>
//               </div>
//               <div className="flex justify-between font-headline font-bold text-base text-on-surface border-t border-outline-variant/20 pt-2 mt-2">
//                 <span>Total</span>
//                 <span className="text-primary">₹499</span>
//               </div>
//             </div>

//             {/* Included */}
//             <div className="space-y-2">
//               {[
//                 'Dedicated URL at zyphoriz.in/{name}',
//                 'Verified business badge',
//                 'Direct call & WhatsApp button',
//                 'Category listing & search',
//                 'Valid for 1 full year',
//               ].map((item) => (
//                 <div key={item} className="flex items-start gap-2 font-sans text-xs text-on-surface-variant">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
//                   <span>{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Store,
  MapPin,
  ArrowLeft,
  Lock,
  Tag,
} from 'lucide-react';

import { useRegistration } from '../../context/RegistrationContext';
import { api } from '../../lib/api';
import { showError } from '../../lib/alerts';

export const PaymentCheckout = () => {
  const navigate = useNavigate();

  const { formData } = useRegistration();

  const [paying, setPaying] = useState(false);
  const [priceAmount, setPriceAmount] = useState(null);
  const [priceBaseAmount, setPriceBaseAmount] = useState(null);
  const [priceGstAmount, setPriceGstAmount] = useState(null);
  const [priceGstRate, setPriceGstRate] = useState(null);
  const [priceCurrency, setPriceCurrency] = useState('INR');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    let isActive = true;

    api.payments.price()
      .then(({ amount, baseAmount, gstAmount, gstRate, currency }) => {
        const parsedAmount = Number(amount);
        const parsedBaseAmount = Number(baseAmount);
        const parsedGstAmount = Number(gstAmount);
        const parsedGstRate = Number(gstRate);
        if (
          !Number.isFinite(parsedAmount) || parsedAmount <= 0 ||
          !Number.isFinite(parsedBaseAmount) ||
          !Number.isFinite(parsedGstAmount) ||
          !Number.isFinite(parsedGstRate)
        ) {
          throw new Error('The listing price is unavailable.');
        }
        if (isActive) {
          setPriceAmount(parsedAmount);
          setPriceBaseAmount(parsedBaseAmount);
          setPriceGstAmount(parsedGstAmount);
          setPriceGstRate(parsedGstRate);
          setPriceCurrency(currency || 'INR');
        }
      })
      .catch((error) => {
        if (isActive) setPriceError(error.message || 'Unable to load the listing price.');
      });

    return () => {
      isActive = false;
    };
  }, []);

  const formatPrice = (amount) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: priceCurrency,
      }).format(amount);
  const formattedPrice = priceAmount === null
    ? priceError ? 'Unavailable' : 'Loading...'
    : formatPrice(priceAmount);
  const formattedBaseAmount = priceBaseAmount === null
    ? formattedPrice
    : formatPrice(priceBaseAmount);
  const formattedGstAmount = priceGstAmount === null
    ? formattedPrice
    : formatPrice(priceGstAmount);

  // --------------------------------------------------
  // Load Razorpay Checkout SDK
  // --------------------------------------------------

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');

      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => resolve(true);

      script.onerror = () =>
        reject(
          new Error(
            'Unable to load Razorpay Checkout'
          )
        );

      document.body.appendChild(script);
    });

  // --------------------------------------------------
  // Payment
  // --------------------------------------------------

  const handlePay = async (e) => {
    e.preventDefault();

    if (paying) return;

    setPaying(true);

    try {
      // ----------------------------------------------
      // 1. Load Razorpay
      // ----------------------------------------------

      await loadRazorpay();

      // ----------------------------------------------
      // 2. Create Business
      // ----------------------------------------------

      const businessPayload = {
        slug:
          formData.slug,

        referralCode:
          formData.referralCode || '',

        name:
          formData.name,

        category:
          formData.categoryName,

        categoryId:
          formData.category,

        phone:
          formData.phone,

        whatsapp:
          formData.whatsapp,

        email:
          formData.email,

        website:
          formData.website,

        instagram:
          formData.instagram,

        facebook:
          formData.facebook,

        telegram:
          formData.telegram,

        youtube:
          formData.youtube,

        video:
          formData.video,

        address:
          formData.address,

        city:
          formData.city,

        location:
          formData.address
            ? `${formData.address}, ${formData.city}`
            : formData.city,

        description:
          formData.description,

        descriptionSections:
          formData.descriptionSections || [],

        additionalPhones:
          (formData.additionalPhones || []).filter((phone) => phone.trim()),

        template:
          formData.template || 'classic',

        openingHours:
          formData.openingHours,

        hours:
          (formData.openingHours || [])
            .filter((hour) => hour.open)
            .map((hour) => ({
              day: hour.day,
              time: `${hour.from} - ${hour.to}`,
            })),

        image:
          typeof formData.bannerImage === 'string' &&
          !formData.bannerImage.startsWith('blob:')
            ? formData.bannerImage
            : '',

        gallery:
          formData.galleryImages || [],
      };

      const payload = new FormData();

      Object.entries(businessPayload).forEach(
        ([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== ''
          ) {
            payload.append(
              key,
              Array.isArray(value)
                ? JSON.stringify(value)
                : value
            );
          }
        }
      );

      if (formData.bannerFile) {
        payload.append(
          'banner',
          formData.bannerFile
        );
      }

      (formData.galleryFiles || []).forEach(
        (file) => {
          payload.append(
            'gallery',
            file
          );
        }
      );

      const {
        business,
      } = await api.businesses.create(
        payload
      );

      if (!business?._id) {
        throw new Error(
          'Business was not created'
        );
      }

      // ----------------------------------------------
      // 3. Create Razorpay Order
      // ----------------------------------------------

      const {
        order,
        keyId,
        amount: orderAmount,
      } =
        await api.payments.createOrder({
          businessId:
            business._id,
        });

      if (!order?.id || !keyId) {
        throw new Error(
          'Razorpay order was not created'
        );
      }

      if (Number.isFinite(Number(orderAmount)) && Number(orderAmount) > 0) {
        setPriceAmount(Number(orderAmount));
      }

      // 4. Open Razorpay Checkout and verify the returned signature.
      const paymentResult = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'Zyphoriz',
          description: 'Standard business listing',
          order_id: order.id,
          prefill: {
            name: business.name,
            email: business.email,
            contact: business.phone,
          },
          notes: { businessId: business._id },
          theme: { color: '#0f766e' },
          handler: async (paymentResponse) => {
            try {
              const result = await api.payments.checkout({
                businessId: business._id,
                ...paymentResponse,
              });
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
          modal: {
            ondismiss: () => reject(new Error('Payment was cancelled')),
          },
        });
        razorpay.on('payment.failed', (response) => {
          reject(new Error(
            response.error?.description || 'Payment failed'
          ));
        });
        razorpay.open();
      });

      // ----------------------------------------------
      // 7. Payment successful
      // ----------------------------------------------

      navigate(
        '/payment/success',
        {
          state: {
            ...paymentResult,

            businessId:
              business._id,

            business: paymentResult.business || business,
          },
        }
      );

    } catch (err) {
      console.error(
        'Razorpay payment error:',
        err
      );

      showError(
        err?.message ||
        'Error processing payment or saving business'
      );

    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#16292C] px-4 md:px-6 py-8 relative overflow-hidden">

      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_12%_0%,rgba(20,184,166,0.18),transparent_45%),radial-gradient(circle_at_88%_100%,rgba(232,162,61,0.10),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Back */}

        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 font-sans text-sm text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />

          Back to Form
        </Link>

        <h1 className="font-headline text-2xl md:text-3xl font-bold text-white mb-4">
          Complete Payment
        </h1>

       

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
{/* 
              <h2 className="font-headline text-lg font-bold text-white">
                Order Summary
              </h2> */}

              {/* Business */}

              <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">

                  <Store className="w-5 h-5 text-[#5eead4]" />

                </div>

                <div className="min-w-0">

                  <p className="font-sans font-bold text-sm text-white truncate">
                    {formData.name ||
                      'Your Business'}
                  </p>

                  <p className="font-sans text-xs text-white/65 flex items-center gap-1 mt-0.5">

                    <Tag className="w-3 h-3" />

                    {formData.categoryName ||
                      'Category'}

                  </p>

                  {formData.city && (
                    <p className="font-sans text-xs text-white/50 flex items-center gap-1 mt-0.5">

                      <MapPin className="w-3 h-3" />

                      {formData.city}

                    </p>
                  )}

                </div>

              </div>

              {/* URL */}

              {formData.slug && (
                <div className="bg-[#14b8a6]/10 border border-[#14b8a6]/30 rounded-xl px-4 py-3">

                  <p className="font-sans text-xs text-white/60 mb-0.5">
                    Your business URL:
                  </p>

                  <p className="font-mono text-sm font-semibold text-[#5eead4] break-all">
                    zyphoriz.com/
                    {formData.slug}
                  </p>

                </div>
              )}

              {/* Price */}

              <div className="border-t border-white/10 pt-4 space-y-2">

                <div className="flex justify-between font-sans text-sm text-white/70">

                  <span>
                    Standard Listing
                  </span>

                  <span>{formattedBaseAmount}</span>

                </div>

                <div className="flex justify-between font-sans text-sm text-white/70">

                  <span>GST {priceGstRate === null ? '' : `(${priceGstRate}%)`}</span>

                  <span>{formattedGstAmount}</span>

                </div>

                <div className="flex justify-between font-headline font-bold text-base text-white border-t border-white/10 pt-2 mt-2">

                  <span>
                    Total
                  </span>

                  <span className="text-[#5eead4]">
                    {formattedPrice}
                  </span>

                </div>

              </div>

              {priceError && (
                <p className="text-xs text-red-300" role="alert">
                  {priceError}
                </p>
              )}

              <form onSubmit={handlePay}>
                <button
                  type="submit"
                  disabled={paying || priceAmount === null || Boolean(priceError)}
                  className="w-full flex items-center justify-center gap-2.5 text-white font-sans font-bold py-4 rounded-xl transition-all text-base bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#0d6b64] hover:to-[#0ea5a0] active:scale-[0.98] shadow-[0_14px_30px_-12px_rgba(20,184,166,0.65)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {paying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Opening Secure Checkout...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay Securely
                    </>
                  )}
                </button>
              </form>
          </div>
        </div>

      </div>

    </main>
  );
};