import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useRegistration } from '../../context/RegistrationContext';
import { addBusiness, uploadImage } from '../../services/apiService';

export const CompleteRegistration = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '₹0',
      period: 'Free Forever',
      description: 'Essential local directory listing for small shops.',
      features: ['Basic Business Profile', 'Map Location & Address', 'Phone & Email Listing', 'Standard Search Ranking'],
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional Listing',
      price: '₹999',
      period: 'per year',
      description: 'Maximum visibility & lead generation for growing businesses.',
      features: ['Verified Partner Badge', 'Top Category Ranking', 'Direct Customer Lead Forms', 'Photo Gallery (up to 20)', 'Customer Reviews & Responses', 'Monthly Performance Analytics'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise / Chain',
      price: '₹2,499',
      period: 'per year',
      description: 'Multi-branch management & dedicated SaaS growth tools.',
      features: ['All Professional Features', 'Multi-Location Listing', 'Priority 24/7 Support', 'Custom Branding Banner', 'Dedicated Account Manager'],
      popular: false,
    },
  ];

  const handleProceedToPayment = async () => {
    if (simulateFailure) {
      navigate('/payment/failed');
      return;
    }

    setIsSubmitting(true);
    try {
      const chosen = plans.find((p) => p.id === selectedPlan);
      const planPriceText = chosen ? `${chosen.price}/${chosen.period}` : '₹999/yr';

      // 1. Upload Banner Image
      let bannerUrl = null;
      if (formData.bannerImage) {
        bannerUrl = await uploadImage(formData.bannerImage, `businesses/${formData.slug}/banner`);
      }

      // 2. Upload Gallery Images
      const galleryUrls = [];
      if (formData.galleryImages && formData.galleryImages.length > 0) {
        for (let i = 0; i < formData.galleryImages.length; i++) {
          const url = await uploadImage(formData.galleryImages[i], `businesses/${formData.slug}/gallery_${i}`);
          if (url) galleryUrls.push(url);
        }
      }

      // 3. Prepare payload for backend
      const businessPayload = {
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
        location: `${formData.address}, ${formData.city}`,
        district: formData.district || '',
        state: formData.state || '',
        pincode: formData.pincode || '',
        description: formData.description,
        openingHours: formData.openingHours,
        bannerImage: bannerUrl,
        galleryImages: galleryUrls,
        selectedPlan,
        planPrice: planPriceText,
        verified: true,
        rating: 5.0, // Default for new businesses
        reviewCount: 0,
        createdAt: new Date().toISOString()
      };

      // 4. Save to Firestore
      await addBusiness(businessPayload);

      // Update context and redirect
      updateFormData({
        selectedPlan,
        planPrice: planPriceText,
      });

      navigate('/payment/success');
    } catch (error) {
      console.error("Error saving business:", error);
      alert("There was an error saving your business. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <Breadcrumb
        items={[
          { label: 'List Your Business', link: '/business/list' },
          { label: 'Review', link: '/business/review' },
          { label: 'Complete Registration' },
        ]}
      />

      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-4 h-4" /> Step 3 of 3: Complete Listing Registration
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold text-on-background">
          Choose Your Growth Plan
        </h1>
        <p className="font-sans text-sm text-on-surface-variant mt-1">
          Select a listing tier for <span className="font-bold text-on-surface">{formData.name}</span>.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mt-6 max-w-md mx-auto md:mx-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <span className="font-sans text-xs font-semibold text-green-700">Details</span>
          </div>
          <div className="h-0.5 flex-1 bg-green-600 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <span className="font-sans text-xs font-semibold text-green-700">Review</span>
          </div>
          <div className="h-0.5 flex-1 bg-green-600 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center">3</span>
            <span className="font-sans text-xs font-semibold text-primary">Complete</span>
          </div>
        </div>
      </div>

      {/* Plans Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative bg-surface-container-lowest border rounded-2xl p-6 shadow-sm transition-all cursor-pointer flex flex-col justify-between ${
              selectedPlan === plan.id
                ? 'border-primary ring-2 ring-primary/20 shadow-md'
                : 'border-outline-variant/40 hover:border-primary/50'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary-amber text-white font-sans text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Most Popular
              </span>
            )}

            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{plan.name}</h3>
              <p className="font-sans text-xs text-on-surface-variant mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="font-headline text-3xl font-extrabold text-primary">{plan.price}</span>
                <span className="font-sans text-xs text-outline ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-xs text-on-surface">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-center">
              <span className={`font-sans text-xs font-bold ${selectedPlan === plan.id ? 'text-primary' : 'text-outline'}`}>
                {selectedPlan === plan.id ? '✓ Selected Plan' : 'Click to Select'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Box Simulation */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Listing Summary
          </h3>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Selected: <span className="font-bold text-on-surface">{plans.find(p => p.id === selectedPlan)?.name}</span> for {formData.name}
          </p>

          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="w-4 h-4 rounded text-error focus:ring-error/50"
            />
            <span className="font-sans text-xs text-error font-semibold">Simulate Payment Failure (for testing payment failed screen)</span>
          </label>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Link to="/business/review">
            <Button variant="outline" size="lg">
              Back
            </Button>
          </Link>
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleProceedToPayment}
            className="flex-1 md:flex-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </div>
    </main>
  );
};
