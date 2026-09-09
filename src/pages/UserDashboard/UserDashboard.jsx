import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, Edit3, ExternalLink, LogOut, Plus, Share2, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { deleteMockBusiness, getSavedBusinesses } from '../../data/mockBusinesses';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [businesses, setBusinesses] = useState(() =>
    getSavedBusinesses().filter((business) => business.ownerId === user?.id)
  );
  const [notice, setNotice] = useState('');

  const publicUrl = (slug) => `${window.location.origin}/${slug}`;

  const handleDelete = (business) => {
    if (!window.confirm(`Delete ${business.name}? This cannot be undone.`)) return;
    deleteMockBusiness(business.slug, user.id);
    setBusinesses((current) => current.filter((item) => item.slug !== business.slug));
  };

  const handleShare = async (business) => {
    const url = publicUrl(business.slug);
    try {
      if (navigator.share) {
        await navigator.share({ title: business.name, text: `Visit ${business.name}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setNotice('Business URL copied to clipboard.');
        setTimeout(() => setNotice(''), 2500);
      }
    } catch {
      setNotice('Sharing was cancelled.');
      setTimeout(() => setNotice(''), 2500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const copyReferralCode = async () => {
    await navigator.clipboard?.writeText(user.referralCode);
    setNotice('Referral code copied to clipboard.');
    setTimeout(() => setNotice(''), 2500);
  };

  return (
    <main className="w-full px-4 md:px-8 py-8 min-h-[calc(100vh-8rem)]">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary mb-1">Owner workspace</p>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-background">My businesses</h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">{user?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/create" className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-primary/90">
            <Plus className="w-4 h-4" /> List a business
          </Link>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-outline-variant text-on-surface font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-surface-container">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </header>

      {notice && <div className="mb-5 rounded-xl bg-primary/10 text-primary px-4 py-3 text-sm font-semibold">{notice}</div>}

      <section className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center bg-primary-container text-on-primary rounded-2xl p-5">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-on-primary/70">Your referral code</p>
          <p className="font-mono text-xl font-bold mt-1">{user?.referralCode}</p>
          <p className="font-sans text-xs text-on-primary/75 mt-1">Share it with a new business owner. You earn ₹50 after their listing is created.</p>
        </div>
        <div className="text-left md:text-center">
          <p className="font-sans text-xs text-on-primary/70">Referrals</p>
          <p className="font-headline text-2xl font-bold">{user?.referralCount || 0}</p>
        </div>
        <div className="text-left md:text-center">
          <p className="font-sans text-xs text-on-primary/70">Commission</p>
          <p className="font-headline text-2xl font-bold">₹{user?.referralEarnings || 0}</p>
        </div>
        <button onClick={copyReferralCode} className="md:col-start-3 inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-surface-bright">
          <Copy className="w-4 h-4" /> Copy code
        </button>
      </section>

      {businesses.length === 0 ? (
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 text-center">
          <h2 className="font-headline text-xl font-bold text-on-surface mb-2">No businesses yet</h2>
          <p className="font-sans text-sm text-on-surface-variant mb-6">Create your first listing and make it easy for local customers to find you.</p>
          <Link to="/create" className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-5 py-3 rounded-xl text-sm">
            <Plus className="w-4 h-4" /> Create your first listing
          </Link>
        </section>
      ) : (
        <section className="space-y-4">
          {businesses.map((business) => (
            <article key={business.slug} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center">
              <div className="w-full md:w-48 aspect-[16/9] rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
                {business.image ? <img src={business.image} alt={business.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">{business.name.charAt(0)}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="font-headline text-xl font-bold text-on-surface">{business.name}</h2>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">Published</span>
                </div>
                <p className="font-sans text-sm text-on-surface-variant">{business.category} · {business.city}</p>
                <p className="font-sans text-xs text-outline mt-2 truncate">{publicUrl(business.slug)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to={`/${business.slug}`} target="_blank" className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </Link>
                <Link to={`/create?edit=${business.slug}`} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Link>
                <button onClick={() => handleShare(business)} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
                  {navigator.share ? <Share2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Share
                </button>
                <button onClick={() => handleDelete(business)} className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};
