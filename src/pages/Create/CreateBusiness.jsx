import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Store,
  Phone,
  Mail,
  MapPin,
  FileText,
  Globe,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Tag,
  IndianRupee,
  CheckCircle2,
  Sparkles,
  Image,
  UploadCloud,
  X,
  Plus,
  Images,
  Clock,
} from 'lucide-react';
import { categories } from '../../data/categories';
import { useRegistration } from '../../context/RegistrationContext';
import { getSavedBusinesses } from '../../data/mockBusinesses';
import { useAuth } from '../../context/AuthContext';

const toSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const defaultOpeningHours = [
  { day: 'Monday', open: true, from: '09:00', to: '18:00' },
  { day: 'Tuesday', open: true, from: '09:00', to: '18:00' },
  { day: 'Wednesday', open: true, from: '09:00', to: '18:00' },
  { day: 'Thursday', open: true, from: '09:00', to: '18:00' },
  { day: 'Friday', open: true, from: '09:00', to: '18:00' },
  { day: 'Saturday', open: true, from: '09:00', to: '18:00' },
  { day: 'Sunday', open: false, from: '09:00', to: '18:00' },
];

export const CreateBusiness = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateFormData } = useRegistration();
  const { user } = useAuth();
  const editSlug = searchParams.get('edit');
  const businessToEdit = editSlug
    ? getSavedBusinesses().find((business) => business.slug === editSlug && business.ownerId === user?.id)
    : null;

  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [form, setForm] = useState(() => businessToEdit ? {
    name: businessToEdit.name,
    category: businessToEdit.categoryId,
    phone: businessToEdit.phone || '',
    whatsapp: businessToEdit.whatsapp || '',
    email: businessToEdit.email || '',
    address: businessToEdit.address || businessToEdit.location || '',
    city: businessToEdit.city || '',
    location: businessToEdit.location || '',
    description: businessToEdit.description || '',
    website: businessToEdit.website || '',
    bannerImage: businessToEdit.image || businessToEdit.coverImage || null,
    galleryImages: businessToEdit.gallery || [],
    openingHours: businessToEdit.openingHours || defaultOpeningHours,
    referralCode: businessToEdit.referralCode || '',
  } : {
    name: 'The Awesome Bakery',
    category: '',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    email: 'hello@awesomebakery.com',
    address: '123 Baker Street, Main Junction',
    city: 'Kochi',
    location: 'https://maps.google.com/?q=kochi',
    description: 'We bake the best cakes and pastries in town. Freshly baked everyday with love and premium ingredients.',
    website: 'https://awesomebakery.com',
    referralCode: searchParams.get('referral') || '',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=600'
    ],
    openingHours: defaultOpeningHours,
  });

  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Business name is required';
    if (!form.category) errs.category = 'Please select a category';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[+0-9\s-]{10,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City / Town is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const slug = editSlug || toSlug(form.name);
    const selectedCat = categories.find((c) => c.id === form.category);
    updateFormData({
      ...form,
      slug,
      categoryName: selectedCat?.name || form.category,
      selectedPlan: 'standard',
      planPrice: '₹499/yr',
    });
    // This goes to payment checkout since it's the CreateBusiness flow
    navigate('/payment/checkout');
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, bannerImage: preview }));
  };

  const removeBanner = () => {
    setForm((prev) => ({ ...prev, bannerImage: null }));
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, ...previews] }));
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removeGalleryImage = (index) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const updateHour = (index, field, value) => {
    setForm((prev) => {
      const updated = prev.openingHours.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      return { ...prev, openingHours: updated };
    });
  };

  const slug = form.name ? toSlug(form.name) : '';

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Only ₹499 / Year
        </div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-background mb-2">
          List Your Business
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto">
          Get discovered by thousands of local customers. Fill in your details below and go live in minutes.
        </p>
      </div>

      {/* Pricing Banner */}
      <div className="bg-primary-container rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <IndianRupee className="w-6 h-6 text-on-primary" />
          </div>
          <div className="text-left">
            <p className="font-headline text-lg font-bold text-on-primary">Standard Listing Plan</p>
            <p className="font-sans text-xs text-on-primary/80">1 Year · Verified Badge · Dedicated URL</p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <span className="font-headline text-3xl font-extrabold text-on-primary">₹499</span>
          <span className="font-sans text-xs text-on-primary/70 ml-1">/ year</span>
        </div>
      </div>

      {/* What You Get */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: Globe, label: 'Your own business URL', sub: 'nexora.in/{name}' },
          { icon: ShieldCheck, label: 'Verified Badge', sub: 'Trusted by customers' },
          { icon: Phone, label: 'Direct Call & WhatsApp', sub: 'Connect instantly' },
        ].map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-on-surface">{label}</p>
              <p className="font-sans text-xs text-outline">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
      >
        {/* Business Name */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Business Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="e.g. Malabar Bakery"
              className={`w-full pl-10 pr-4 py-3 bg-background border ${
                errors.name ? 'border-error' : 'border-outline-variant focus:border-primary'
              } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
          </div>
          {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          {slug && !errors.name && (
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Your URL: <span className="font-mono font-semibold">nexora.in/{slug}</span>
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Category <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <select
              value={form.category}
              onChange={set('category')}
              className={`w-full pl-10 pr-4 py-3 bg-background border ${
                errors.category ? 'border-error' : 'border-outline-variant focus:border-primary'
              } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none`}
            >
              <option value="">Select a category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
        </div>

        {/* Phone & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
              Phone Number <span className="text-error">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+91 98470 12345"
                className={`w-full pl-10 pr-4 py-3 bg-background border ${
                  errors.phone ? 'border-error' : 'border-outline-variant focus:border-primary'
                } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
              />
            </div>
            {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
              WhatsApp Number <span className="text-outline font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="tel"
                value={form.whatsapp}
                onChange={set('whatsapp')}
                placeholder="+91 98470 12345"
                className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-primary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="info@yourbusiness.com"
              className={`w-full pl-10 pr-4 py-3 bg-background border ${
                errors.email ? 'border-error' : 'border-outline-variant focus:border-primary'
              } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
          </div>
          {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
        </div>

        {/* Address & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
              Address / Landmark <span className="text-error">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                value={form.address}
                onChange={set('address')}
                placeholder="Street, Near Landmark"
                className={`w-full pl-10 pr-4 py-3 bg-background border ${
                  errors.address ? 'border-error' : 'border-outline-variant focus:border-primary'
                } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
              />
            </div>
            {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
              City / Town <span className="text-error">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                value={form.city}
                onChange={set('city')}
                placeholder="Kottakkal"
                className={`w-full pl-10 pr-4 py-3 bg-background border ${
                  errors.city ? 'border-error' : 'border-outline-variant focus:border-primary'
                } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20`}
              />
            </div>
            {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Location (Google Maps Link) */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Location Map Link <span className="text-outline font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="url"
              value={form.location}
              onChange={set('location')}
              placeholder="e.g. https://maps.google.com/..."
              className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-primary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Business Description <span className="text-error">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3.5 w-4 h-4 text-outline" />
            <textarea
              rows={3}
              value={form.description}
              onChange={set('description')}
              placeholder="Describe your products, services, and what makes you special..."
              className={`w-full pl-10 pr-4 py-3 bg-background border ${
                errors.description ? 'border-error' : 'border-outline-variant focus:border-primary'
              } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none`}
            />
          </div>
          {errors.description && <p className="text-xs text-error mt-1">{errors.description}</p>}
        </div>

        {/* Website (optional) */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Website <span className="text-outline font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="url"
              value={form.website}
              onChange={set('website')}
              placeholder="https://yourbusiness.com"
              className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-primary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Referral (optional) */}
        <div>
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
            Referral Code <span className="text-outline font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={form.referralCode}
              onChange={set('referralCode')}
              placeholder="e.g. NEX-ABCD-1234"
              className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-primary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <p className="font-sans text-xs text-on-surface-variant mt-1">Enter a friend's code to support their referral reward.</p>
        </div>

        {/* ── Opening Hours ──────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-outline" /> Opening Hours
          </label>
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 px-4 py-2 bg-surface-container text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
              <span>Day</span>
              <span>Opens At</span>
              <span>Closes At</span>
              <span>Status</span>
            </div>

            {form.openingHours.map((row, idx) => (
              <div
                key={row.day}
                className={`grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 items-center px-4 py-2.5 border-t border-outline-variant/20 transition-colors ${
                  !row.open ? 'opacity-50' : ''
                }`}
              >
                <span className="font-sans text-sm font-semibold text-on-surface">{row.day}</span>
                <input
                  type="time"
                  disabled={!row.open}
                  value={row.from}
                  onChange={(e) => updateHour(idx, 'from', e.target.value)}
                  className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary disabled:cursor-not-allowed w-full"
                />
                <input
                  type="time"
                  disabled={!row.open}
                  value={row.to}
                  onChange={(e) => updateHour(idx, 'to', e.target.value)}
                  className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary disabled:cursor-not-allowed w-full"
                />
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
        </div>

        {/* ── Banner Image ───────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1 flex items-center gap-1.5">
            <Image className="w-4 h-4 text-outline" /> Banner Image
          </label>
          <p className="font-sans text-xs text-on-surface-variant mb-4">
            Upload a wide banner image that appears at the top of your business profile. Recommended: 1200 × 400 px.
          </p>

          {form.bannerImage ? (
            <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 group">
              <img src={form.bannerImage} alt="Banner preview" className="w-full h-48 object-cover" />
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

          <input ref={bannerInputRef} id="bannerImage" type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
        </div>

        {/* ── Gallery Images ─────────────────────────────────────── */}
        <div className="pt-4 border-t border-outline-variant/20">
          <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1 flex items-center gap-1.5">
            <Images className="w-4 h-4 text-outline" /> Photo Gallery
          </label>
          <p className="font-sans text-xs text-on-surface-variant mb-4">
            Add multiple photos of your business — interior, products, or team. Businesses with photos get 3× more views.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(form.galleryImages || []).map((src, idx) => (
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
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 rounded-xl aspect-square transition-colors cursor-pointer group"
            >
              <Plus className="w-7 h-7 text-outline-variant group-hover:text-primary transition-colors" />
              <span className="text-xs text-on-surface-variant group-hover:text-primary font-semibold">Add Photo</span>
            </button>
          </div>

          <input ref={galleryInputRef} id="galleryImages" type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-outline-variant/20">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-sans font-bold py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-base shadow-md"
          >
            Proceed to Pay ₹499
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center font-sans text-xs text-outline mt-3">
            🔒 Secure payment · ₹499 one-time per year · No hidden charges
          </p>
        </div>
      </form>
    </main>
  );
};
