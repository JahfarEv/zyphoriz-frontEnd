import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  Star,
  ShieldCheck,
  MessageCircle,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { reviews as allReviews } from '../../data/reviews'; // We might want to remove this if reviews are dynamic later
import { findMockBusiness } from '../../data/mockBusinesses';
import { useRegistration } from '../../context/RegistrationContext';

export const BusinessProfile = () => {
  const { slug } = useParams();
  const { formData, registrationCompleted } = useRegistration();

  // Try newly created business from context if just redirected from registration
  const contextBusiness = registrationCompleted && formData.slug === slug
    ? {
        id: formData.slug,
        slug: formData.slug,
        name: formData.name,
        category: formData.categoryName,
        categoryId: formData.category,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        website: formData.website,
        location: `${formData.address}, ${formData.city}`,
        city: formData.city,
        description: formData.description,
        verified: true,
        trending: false,
        rating: null,
        reviewCount: 0,
        hours: [],
        services: [],
        gallery: [],
        image: null,
        coverImage: null,
      }
    : null;

  const [business, setBusiness] = useState(contextBusiness || findMockBusiness(slug));
  const loading = false;

  React.useEffect(() => {
    setBusiness(contextBusiness || findMockBusiness(slug));
  }, [slug, contextBusiness]);

  const [reviewsList, setReviewsList] = useState([]);

  React.useEffect(() => {
    if (business) {
      setReviewsList(allReviews.filter((r) => r.businessId === business.id));
    }
  }, [business]);

  const [isSaved, setIsSaved] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (loading) {
    return <div className="py-20 text-center text-on-surface-variant">Loading profile...</div>;
  }

  if (!business) {
    return (
      <main className="w-full px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-headline text-2xl font-bold text-on-surface mb-2">Business Not Found</h1>
        <p className="font-sans text-sm text-on-surface-variant mb-6">
          This business page doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newName.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      businessId: business.id,
      author: newName,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=random`,
      rating: Number(newRating),
      date: 'Just now',
      comment: newComment,
      verifiedPurchase: false,
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setNewComment('');
      setNewName('');
    }, 1500);
  };

  const whatsappNumber = (business.whatsapp || business.phone || '').replace(/[^0-9]/g, '');

  return (
    <div className="w-full bg-background pb-12">
      {/* Cover Banner */}
      <section className="w-full h-48 md:h-72 relative bg-surface-variant overflow-hidden">
        {business.coverImage || business.image ? (
          <img
            src={business.coverImage || business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
            <span className="font-headline text-6xl font-bold text-primary/20">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
      </section>

      {/* Main Container */}
      <div className="w-full px-4 md:px-6 relative -mt-12 md:-mt-16">
        {/* Header Card */}
        <div className="bg-surface rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start md:items-center border border-outline-variant/20 mb-8">
          {/* Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-outline-variant shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center">
            {business.image ? (
              <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-headline text-3xl font-bold text-primary">
                {business.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
                {business.name}
              </h1>
              {business.verified && <Badge variant="verified">Verified</Badge>}
            </div>
            <p className="font-sans text-sm text-on-surface-variant mb-1">{business.category}</p>
            {business.location && (
              <p className="font-sans text-xs text-outline flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {business.location}
              </p>
            )}
            {business.rating && (
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-primary font-semibold text-xs">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span>{business.rating}</span>
                  <span className="text-outline font-normal">({reviewsList.length} reviews)</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/20">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="flex-1 md:flex-none">
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm">
                  <Phone className="w-4 h-4" /> Call Now
                </button>
              </a>
            )}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-green-600 transition-all text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </a>
            )}
            {business.location && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(business.location)}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="flex items-center justify-center gap-2 border border-outline-variant text-on-surface font-sans font-semibold px-4 py-2.5 rounded-xl hover:bg-surface-container transition-all text-sm">
                  <Navigation className="w-4 h-4" /> Directions
                </button>
              </a>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-lg font-bold text-on-surface mb-3">About</h2>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {business.description || 'No description provided.'}
              </p>
            </div>

            {/* Services */}
            {business.services && business.services.length > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
                <h2 className="font-headline text-lg font-bold text-on-surface mb-4">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {business.services.map((svc, i) => (
                    <div key={i} className="flex items-center gap-2 font-sans text-sm text-on-surface">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {business.gallery && business.gallery.length > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
                <h2 className="font-headline text-lg font-bold text-on-surface mb-4">Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {business.gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-surface-variant">
                      <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Reviews {reviewsList.length > 0 && `(${reviewsList.length})`}
                </h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="font-sans text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  + Write Review
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mb-5 bg-surface-container rounded-xl p-4 border border-outline-variant/30">
                  {reviewSubmitted ? (
                    <div className="text-center py-4 space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                      <p className="font-sans text-sm font-semibold text-on-surface">Review submitted!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-0.5"
                          >
                            <Star
                              className={`w-6 h-6 ${star <= newRating ? 'fill-primary text-primary' : 'text-outline-variant'}`}
                            />
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-background border border-outline-variant rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-primary"
                      />
                      <textarea
                        rows={3}
                        required
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full bg-background border border-outline-variant rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-primary resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full bg-primary text-on-primary font-sans font-bold py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Review List */}
              {reviewsList.length === 0 ? (
                <p className="font-sans text-sm text-outline text-center py-6">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="border-b border-outline-variant/20 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-sans text-sm font-semibold text-on-surface">{rev.author}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < rev.rating ? 'fill-primary text-primary' : 'text-outline-variant'}`}
                              />
                            ))}
                            <span className="font-sans text-xs text-outline ml-1">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Contact */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-headline text-base font-bold text-on-surface">Contact Info</h3>
              {business.location && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-on-surface-variant">{business.location}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-outline flex-shrink-0" />
                  <a href={`tel:${business.phone}`} className="font-sans text-on-surface-variant hover:text-primary">
                    {business.phone}
                  </a>
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-outline flex-shrink-0" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-primary hover:underline truncate text-xs"
                  >
                    {business.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>

            {/* Hours */}
            {business.hours && business.hours.length > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
                <h3 className="font-headline text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Opening Hours
                </h3>
                <div className="space-y-2">
                  {business.hours.map((h, i) => (
                    <div key={i} className="flex justify-between font-sans text-xs py-1 border-b border-outline-variant/10 last:border-0">
                      <span className="text-on-surface-variant">{h.day}</span>
                      <span className="font-semibold text-on-surface">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List your business CTA */}
            <div className="bg-primary-container rounded-2xl p-5 text-center">
              <p className="font-headline text-sm font-bold text-on-primary mb-1">Own a Business?</p>
              <p className="font-sans text-xs text-on-primary/80 mb-3">Get listed for just ₹499/year</p>
              <Link
                to={`/create${business.ownerReferralCode ? `?referral=${encodeURIComponent(business.ownerReferralCode)}` : ''}`}
                className="inline-flex items-center justify-center gap-1.5 bg-white text-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-surface-bright transition-all text-xs"
              >
                List My Business →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
