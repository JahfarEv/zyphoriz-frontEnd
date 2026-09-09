import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store, MapPin, Phone, Mail, Globe, Clock, FileText, Tag,
  ArrowRight, ShieldCheck, Image, UploadCloud, X, Plus, Images,
} from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useRegistration } from '../../context/RegistrationContext';
import { categories } from '../../data/categories';

export const ListBusiness = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();
  const [errors, setErrors] = useState({});

  // Refs for file inputs
  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  /* ─── Validation ─────────────────────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Business name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[+0-9\s-]{10,15}$/.test(formData.phone)) errs.phone = 'Enter a valid phone number';

    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address';

    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City / Place is required';
    if (!formData.pincode.trim()) errs.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode.trim())) errs.pincode = 'Enter a valid 6-digit pincode';

    if (!formData.description.trim()) errs.description = 'Business description is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const selectedCat = categories.find((c) => c.id === formData.category);
      const slug = toSlug(formData.name);
      updateFormData({ 
        categoryName: selectedCat ? selectedCat.name : formData.category,
        slug 
      });
      navigate('/business/review');
    }
  };

  /* ─── Banner Image ───────────────────────────────────────────── */
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateFormData({ bannerImage: preview });
  };

  const removeBanner = () => {
    updateFormData({ bannerImage: null });
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  /* ─── Gallery Images ─────────────────────────────────────────── */
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    updateFormData({ galleryImages: [...(formData.galleryImages || []), ...previews] });
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removeGalleryImage = (index) => {
    const updated = formData.galleryImages.filter((_, i) => i !== index);
    updateFormData({ galleryImages: updated });
  };

  /* ─── Opening Hours ──────────────────────────────────────────── */
  const updateHour = (index, field, value) => {
    const updated = formData.openingHours.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    updateFormData({ openingHours: updated });
  };

  return (
    <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <Breadcrumb items={[{ label: 'List Your Business' }]} />

      {/* Page Title & Progress Bar */}
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-4 h-4" /> Step 1 of 3: Business Information
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold text-on-background">
          Register Your Business on NEXORA
        </h1>
        <p className="font-sans text-sm text-on-surface-variant mt-1">
          Fill in your business details to showcase your services to thousands of local customers.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mt-6 max-w-md mx-auto md:mx-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center">1</span>
            <span className="font-sans text-xs font-semibold text-primary">Details</span>
          </div>
          <div className="h-0.5 flex-1 bg-outline-variant/40 mx-2"></div>
          <div className="flex items-center gap-2 opacity-50">
            <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center">2</span>
            <span className="font-sans text-xs text-on-surface-variant">Review</span>
          </div>
          <div className="h-0.5 flex-1 bg-outline-variant/40 mx-2"></div>
          <div className="flex items-center gap-2 opacity-50">
            <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center">3</span>
            <span className="font-sans text-xs text-on-surface-variant">Complete</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">

        {/* ── Basic Info ─────────────────────────────────────────── */}
        <div>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              required
              id="name"
              placeholder="e.g. CellTech Mobiles"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              error={errors.name}
            />
            <Select
              label="Primary Category"
              required
              id="category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => updateFormData({ category: e.target.value })}
            />
          </div>
        </div>

        {/* ── Contact Info ───────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" /> Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              required
              id="phone"
              icon={Phone}
              placeholder="+91 98470 12345"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              error={errors.phone}
            />
            <Input
              label="Email Address"
              required
              id="email"
              type="email"
              icon={Mail}
              placeholder="info@yourbusiness.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Website URL (Optional)"
              id="website"
              icon={Globe}
              placeholder="https://yourbusiness.com"
              value={formData.website}
              onChange={(e) => updateFormData({ website: e.target.value })}
            />
            <Input
              label="Referral Code (Optional)"
              id="referralCode"
              icon={Tag}
              placeholder="e.g. NEX-ABCD-1234"
              value={formData.referralCode || ''}
              onChange={(e) => updateFormData({ referralCode: e.target.value })}
            />
          </div>
        </div>

        {/* ── Address Info ───────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Address &amp; Location
          </h3>
          <div className="space-y-4">
            <Input
              label="Street Address / Landmark"
              required
              id="address"
              placeholder="Building No, Street Name, Near Landmark"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              error={errors.address}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                label="City / Place"
                required
                id="city"
                placeholder="Kottakkal"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                error={errors.city}
              />
              <Input
                label="District"
                required
                id="district"
                placeholder="Malappuram"
                value={formData.district}
                onChange={(e) => updateFormData({ district: e.target.value })}
              />
              <Input
                label="State"
                required
                id="state"
                placeholder="Kerala"
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
              />
              <Input
                label="Pincode"
                required
                id="pincode"
                placeholder="676503"
                value={formData.pincode}
                onChange={(e) => updateFormData({ pincode: e.target.value })}
                error={errors.pincode}
              />
            </div>
          </div>
        </div>

        {/* ── Description ────────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Business Description
          </h3>
          <div>
            <label className="font-label-md text-sm text-on-surface font-semibold block mb-1.5">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Describe your services, products, specialties, and experience..."
              className={`w-full bg-surface-container-lowest border ${
                errors.description ? 'border-error' : 'border-outline-variant focus:border-primary'
              } rounded-xl p-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
            {errors.description && <span className="text-xs text-error">{errors.description}</span>}
          </div>
        </div>

        {/* ── Opening Hours ──────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Opening Hours
          </h3>
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 px-4 py-2 bg-surface-container text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
              <span>Day</span>
              <span>Opens At</span>
              <span>Closes At</span>
              <span>Status</span>
            </div>

            {formData.openingHours.map((row, idx) => (
              <div
                key={row.day}
                className={`grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 items-center px-4 py-2.5 border-t border-outline-variant/20 transition-colors ${
                  !row.open ? 'opacity-50' : ''
                }`}
              >
                {/* Day name */}
                <span className="font-sans text-sm font-semibold text-on-surface">{row.day}</span>

                {/* From time */}
                <input
                  type="time"
                  disabled={!row.open}
                  value={row.from}
                  onChange={(e) => updateHour(idx, 'from', e.target.value)}
                  className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary disabled:cursor-not-allowed w-full"
                />

                {/* To time */}
                <input
                  type="time"
                  disabled={!row.open}
                  value={row.to}
                  onChange={(e) => updateHour(idx, 'to', e.target.value)}
                  className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary disabled:cursor-not-allowed w-full"
                />

                {/* Open / Closed toggle */}
                <button
                  type="button"
                  onClick={() => updateHour(idx, 'open', !row.open)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    row.open ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                  aria-label={`Toggle ${row.day}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                      row.open ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Toggle the switch to mark a day as Open or Closed.
          </p>
        </div>

        {/* ── Banner Image ───────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" /> Banner Image
          </h3>
          <p className="font-sans text-xs text-on-surface-variant mb-4">
            Upload a wide banner image that appears at the top of your business profile. Recommended: 1200 × 400 px.
          </p>

          {formData.bannerImage ? (
            <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 group">
              <img
                src={formData.bannerImage}
                alt="Banner preview"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="bg-white/90 text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-white transition"
                >
                  <UploadCloud className="w-4 h-4" /> Change
                </button>
                <button
                  type="button"
                  onClick={removeBanner}
                  className="bg-error/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-error transition"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 rounded-xl py-10 transition-colors cursor-pointer group"
            >
              <UploadCloud className="w-10 h-10 text-outline-variant group-hover:text-primary transition-colors" />
              <div className="text-center">
                <p className="font-sans text-sm font-semibold text-on-surface">Click to upload banner</p>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">PNG, JPG, WEBP up to 5 MB</p>
              </div>
            </button>
          )}

          <input
            ref={bannerInputRef}
            id="bannerImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </div>

        {/* ── Gallery Images ─────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
            <Images className="w-5 h-5 text-primary" /> Photo Gallery
          </h3>
          <p className="font-sans text-xs text-on-surface-variant mb-4">
            Add multiple photos of your business — interior, products, or team. Businesses with photos get 3× more views.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(formData.galleryImages || []).map((src, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-outline-variant/30">
                <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-1.5 right-1.5 bg-error text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add more button */}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 rounded-xl aspect-square transition-colors cursor-pointer group"
            >
              <Plus className="w-7 h-7 text-outline-variant group-hover:text-primary transition-colors" />
              <span className="text-xs text-on-surface-variant group-hover:text-primary font-semibold">Add Photo</span>
            </button>
          </div>

          <input
            ref={galleryInputRef}
            id="galleryImages"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleGalleryChange}
          />

          {(formData.galleryImages || []).length > 0 && (
            <p className="text-xs text-on-surface-variant mt-2">
              {formData.galleryImages.length} photo{formData.galleryImages.length !== 1 ? 's' : ''} added
            </p>
          )}
        </div>

        {/* ── Submit ─────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-outline-variant/20 flex justify-end">
          <Button type="submit" variant="primary" size="lg" icon={ArrowRight}>
            Proceed to Review
          </Button>
        </div>
      </form>
    </main>
  );
};
