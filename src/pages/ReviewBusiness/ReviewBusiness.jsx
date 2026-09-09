import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Edit, ShieldCheck, ArrowRight, Store, MapPin, Phone, Mail, Globe, Clock, FileText, Image, Images } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useRegistration } from '../../context/RegistrationContext';

export const ReviewBusiness = () => {
  const navigate = useNavigate();
  const { formData } = useRegistration();

  return (
    <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <Breadcrumb items={[{ label: 'List Your Business', link: '/business/list' }, { label: 'Review Details' }]} />

      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-4 h-4" /> Step 2 of 3: Review Information
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold text-on-background">
          Review Your Business Listing
        </h1>
        <p className="font-sans text-sm text-on-surface-variant mt-1">
          Please check the information below for accuracy before proceeding to plan selection.
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
            <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center">2</span>
            <span className="font-sans text-xs font-semibold text-primary">Review</span>
          </div>
          <div className="h-0.5 flex-1 bg-outline-variant/40 mx-2"></div>
          <div className="flex items-center gap-2 opacity-50">
            <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center">3</span>
            <span className="font-sans text-xs text-on-surface-variant">Complete</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        {/* Banner Image Preview */}
        {formData.bannerImage ? (
          <div className="w-full h-48 md:h-64 relative">
            <img 
              src={formData.bannerImage} 
              alt={`${formData.name} Banner`} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-surface-container flex items-center justify-center border-b border-outline-variant/30">
            <div className="text-center text-on-surface-variant flex flex-col items-center">
              <Image className="w-6 h-6 mb-1 opacity-50" />
              <span className="text-xs font-medium">No banner image added</span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Business Header Preview */}
          <div className="flex justify-between items-start pb-6 border-b border-outline-variant/20">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Business Name</span>
              <h2 className="font-headline text-2xl font-bold text-on-surface mt-0.5">{formData.name}</h2>
              <p className="font-sans text-sm text-on-surface-variant">{formData.categoryName || formData.category}</p>
            </div>
            <Link to="/business/list">
              <Button variant="outline" size="sm" icon={Edit}>
                Edit Info
              </Button>
            </Link>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-1">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </span>
                <p className="font-sans text-sm font-medium text-on-surface">{formData.phone}</p>
              </div>
              <div>
                <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-1">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </span>
                <p className="font-sans text-sm font-medium text-on-surface">{formData.email}</p>
              </div>
              {formData.website && (
                <div>
                  <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-1">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </span>
                  <p className="font-sans text-sm font-medium text-primary">{formData.website}</p>
                </div>
              )}
              
              <div className="pt-2">
                <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5" /> Business Hours
                </span>
                <div className="space-y-1.5 bg-surface-container/50 rounded-lg p-3">
                  {formData.openingHours?.map((hours, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="font-medium text-on-surface-variant w-24">{hours.day}</span>
                      <span className={`font-medium ${hours.open ? 'text-on-surface' : 'text-error'}`}>
                        {hours.open ? `${hours.from} - ${hours.to}` : 'Closed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Address
                </span>
                <p className="font-sans text-sm font-medium text-on-surface">
                  {formData.address}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}
                </p>
              </div>
              
              <div>
                <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-1">
                  <FileText className="w-3.5 h-3.5" /> Description
                </span>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {formData.description}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Preview */}
          {formData.galleryImages && formData.galleryImages.length > 0 && (
            <div className="pt-6 border-t border-outline-variant/20">
              <span className="font-sans text-xs font-semibold text-outline uppercase flex items-center gap-1.5 mb-3">
                <Images className="w-3.5 h-3.5" /> Photo Gallery ({formData.galleryImages.length})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {formData.galleryImages.map((src, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-outline-variant/30">
                    <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
            <Link to="/business/list">
              <Button variant="outline" size="md">
                Back
              </Button>
            </Link>
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/business/register')}
            >
              Confirm & Select Plan
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
