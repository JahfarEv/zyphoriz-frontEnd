// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Copy, Edit3, ExternalLink, LogOut, Plus, Share2, Trash2 } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// export const UserDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [businesses, setBusinesses] = useState(() =>
//     getSavedBusinesses().filter((business) => business.ownerId === user?.id)
//   );
//   const [notice, setNotice] = useState('');

//   const publicUrl = (slug) => `${window.location.origin}/${slug}`;

//   const handleDelete = (business) => {
//     if (!window.confirm(`Delete ${business.name}? This cannot be undone.`)) return;
//     deleteMockBusiness(business.slug, user.id);
//     setBusinesses((current) => current.filter((item) => item.slug !== business.slug));
//   };

//   const handleShare = async (business) => {
//     const url = publicUrl(business.slug);
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: business.name, text: `Visit ${business.name}`, url });
//       } else {
//         await navigator.clipboard.writeText(url);
//         setNotice('Business URL copied to clipboard.');
//         setTimeout(() => setNotice(''), 2500);
//       }
//     } catch {
//       setNotice('Sharing was cancelled.');
//       setTimeout(() => setNotice(''), 2500);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const copyReferralCode = async () => {
//     await navigator.clipboard?.writeText(user.referralCode);
//     setNotice('Referral code copied to clipboard.');
//     setTimeout(() => setNotice(''), 2500);
//   };

//   return (
//     <main className="w-full px-4 md:px-8 py-8 min-h-[calc(100vh-8rem)]">
//       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary mb-1">Owner workspace</p>
//           <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-background">My businesses</h1>
//           <p className="font-sans text-sm text-on-surface-variant mt-1">{user?.email}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Link to="/create" className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-primary/90">
//             <Plus className="w-4 h-4" /> List a business
//           </Link>
//           <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-outline-variant text-on-surface font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-surface-container">
//             <LogOut className="w-4 h-4" /> Log out
//           </button>
//         </div>
//       </header>

//       {notice && <div className="mb-5 rounded-xl bg-primary/10 text-primary px-4 py-3 text-sm font-semibold">{notice}</div>}

//       <section className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center bg-primary-container text-on-primary rounded-2xl p-5">
//         <div>
//           <p className="font-sans text-xs font-semibold uppercase tracking-wider text-on-primary/70">Your referral code</p>
//           <p className="font-mono text-xl font-bold mt-1">{user?.referralCode}</p>
//           <p className="font-sans text-xs text-on-primary/75 mt-1">Share it with a new business owner. You earn ₹50 after their listing is created.</p>
//         </div>
//         <div className="text-left md:text-center">
//           <p className="font-sans text-xs text-on-primary/70">Referrals</p>
//           <p className="font-headline text-2xl font-bold">{user?.referralCount || 0}</p>
//         </div>
//         <div className="text-left md:text-center">
//           <p className="font-sans text-xs text-on-primary/70">Commission</p>
//           <p className="font-headline text-2xl font-bold">₹{user?.referralEarnings || 0}</p>
//         </div>
//         <button onClick={copyReferralCode} className="md:col-start-3 inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-surface-bright">
//           <Copy className="w-4 h-4" /> Copy code
//         </button>
//       </section>

//       {businesses.length === 0 ? (
//         <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 text-center">
//           <h2 className="font-headline text-xl font-bold text-on-surface mb-2">No businesses yet</h2>
//           <p className="font-sans text-sm text-on-surface-variant mb-6">Create your first listing and make it easy for local customers to find you.</p>
//           <Link to="/create" className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-5 py-3 rounded-xl text-sm">
//             <Plus className="w-4 h-4" /> Create your first listing
//           </Link>
//         </section>
//       ) : (
//         <section className="space-y-4">
//           {businesses.map((business) => (
//             <article key={business.slug} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center">
//               <div className="w-full md:w-48 aspect-[16/9] rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
//                 {business.image ? <img src={business.image} alt={business.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">{business.name.charAt(0)}</div>}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap items-center gap-2 mb-1">
//                   <h2 className="font-headline text-xl font-bold text-on-surface">{business.name}</h2>
//                   <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-container text-success">Published</span>
//                 </div>
//                 <p className="font-sans text-sm text-on-surface-variant">{business.category} · {business.city}</p>
//                 <p className="font-sans text-xs text-outline mt-2 truncate">{publicUrl(business.slug)}</p>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <Link to={`/${business.slug}`} target="_blank" className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   <ExternalLink className="w-3.5 h-3.5" /> View
//                 </Link>
//                 <Link to={`/create?edit=${business.slug}`} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   <Edit3 className="w-3.5 h-3.5" /> Edit
//                 </Link>
//                 <button onClick={() => handleShare(business)} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   {navigator.share ? <Share2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Share
//                 </button>
//                 <button onClick={() => handleDelete(business)} className="inline-flex items-center gap-1.5 border border-error/30 px-3 py-2 rounded-lg text-xs font-semibold text-error hover:bg-error-container">
//                   <Trash2 className="w-3.5 h-3.5" /> Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </section>
//       )}
//     </main>
//   );
// };



// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Copy, Edit3, ExternalLink, LogOut, Plus, Share2, Trash2, Mail, Phone, ShieldCheck, WalletCards } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { api } from '../../lib/api';

// export const UserDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout, loading: authLoading } = useAuth();
//   const [businesses, setBusinesses] = useState([]);
//   const [referrals, setReferrals] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notice, setNotice] = useState('');

//   useEffect(() => {
//     if (authLoading) return;
//     Promise.all([api.businesses.mine(), api.referrals()])
//       .then(([businessData, referralData]) => {
//         setBusinesses(businessData.businesses || []);
//         setReferrals(referralData);
//       })
//       .catch((error) => setNotice(error.message))
//       .finally(() => setLoading(false));
//   }, [authLoading]);

//   const publicUrl = (slug) => `${window.location.origin}/${slug}`;

//   const handleDelete = async (business) => {
//     if (!window.confirm(`Delete ${business.name}? This cannot be undone.`)) return;
//     try {
//       await api.businesses.remove(business._id || business.id);
//       setBusinesses((current) => current.filter((item) => item._id !== business._id));
//     } catch (error) {
//       setNotice(error.message);
//     }
//   };

//   const handleShare = async (business) => {
//     const url = publicUrl(business.slug);
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: business.name, text: `Visit ${business.name}`, url });
//       } else {
//         await navigator.clipboard.writeText(url);
//         setNotice('Business URL copied to clipboard.');
//         setTimeout(() => setNotice(''), 2500);
//       }
//     } catch {
//       setNotice('Sharing was cancelled.');
//       setTimeout(() => setNotice(''), 2500);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const copyReferralCode = async () => {
//     await navigator.clipboard?.writeText(referrals?.referralCode || user.referralCode);
//     setNotice('Referral code copied to clipboard.');
//     setTimeout(() => setNotice(''), 2500);
//   };

//   const handleRedeem = () => {
//     const earnings = referrals?.referralEarnings || 0;
//     if (!earnings) {
//       setNotice('Earn at least ₹50 in referral commission before redeeming.');
//       setTimeout(() => setNotice(''), 2500);
//       return;
//     }
//     setNotice('Your redeem request will be available after payout details are added.');
//     setTimeout(() => setNotice(''), 3500);
//   };

//   const ownerInitial = (user?.email || 'O').charAt(0).toUpperCase();

//   return (
//    <main className="w-full px-4 md:px-8 py-8 min-h-[calc(100vh-8rem)]">
//   <header className="flex flex-col lg:flex-row lg:items-center justify-end gap-5 mb-8">
//     <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//       <div className="flex items-center justify-end gap-2">
//         <Link
//           to="/create"
//           className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-secondary/90"
//         >
//           <Plus className="w-4 h-4" />
//           List a business
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="inline-flex items-center gap-2 border border-outline-variant text-on-secondary font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-surface-container hover:text-primary"
//         >
//           <LogOut className="w-4 h-4" />
//           Log out
//         </button>
//       </div>
//     </div>
//   </header>

//    <section className="mb-6 bg-white/95 rounded-2xl shadow-sm overflow-hidden
//                     grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
//                     divide-y divide-outline-variant/20 sm:divide-y-0
//                     sm:divide-x sm:divide-outline-variant/20">
//   <div className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3">
//     <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
//       <Mail className="w-3.5 h-3.5" />
//     </div>
//     <div className="min-w-0 flex-1">
//       <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Email</p>
//       <p className="text-[13px] font-semibold text-on-surface truncate leading-tight">{user?.email || 'Not available'}</p>
//     </div>
//   </div>

//   <div className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3">
//     <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
//       <Phone className="w-3.5 h-3.5" />
//     </div>
//     <div className="min-w-0 flex-1">
//       <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Mobile</p>
//       <p className="text-[13px] font-semibold text-on-surface truncate leading-tight">{user?.mobile || 'Not available'}</p>
//     </div>
//   </div>

//   <div className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3">
//     <div className="w-8 h-8 rounded-lg bg-tertiary/15 text-on-tertiary-container flex items-center justify-center flex-shrink-0">
//       <ShieldCheck className="w-3.5 h-3.5" />
//     </div>
//     <div className="min-w-0 flex-1">
//       <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Account type</p>
//       <p className="text-[13px] font-semibold text-on-surface capitalize truncate leading-tight">{user?.role || 'Owner'}</p>
//     </div>
//   </div>
// </section>

//       {notice && <div className="mb-5 rounded-xl bg-primary/10 text-primary px-4 py-3 text-sm font-semibold">{notice}</div>}
// <section className="mb-6 bg-[linear-gradient(135deg,#16292c_0%,#2f756d_98%,#b94630_100%)] shadow-[0_-12px_30px_rgba(22,41,44,0.18)] text-on-primary rounded-2xl p-4 sm:p-5">
//   {/* Top: referral code + copy button */}
//   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//     <div className="min-w-0 flex-1">
//       <p className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-on-primary/70">
//         Your referral code
//       </p>
//       <p className="font-mono text-lg sm:text-xl font-bold mt-0.5 break-all">
//         {referrals?.referralCode || user?.referralCode}
//       </p>
//       <p className="font-sans text-xs text-on-primary/75 mt-1">
//         Share it with a new owner. You earn ₹50 after their listing is created.
//       </p>
//     </div>

//     <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
//       <button
//         onClick={copyReferralCode}
//         className="inline-flex items-center justify-center gap-2 bg-on-primary text-primary-container font-bold px-4 py-2 rounded-xl text-sm hover:bg-on-primary/90 w-full sm:w-auto"
//       >
//         <Copy className="w-4 h-4" /> Copy code
//       </button>
//       <button
//         onClick={handleRedeem}
//         disabled={!(referrals?.referralEarnings > 0)}
//         className="inline-flex items-center justify-center gap-2 border border-on-primary/50 text-on-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-on-primary/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
//       >
//         <WalletCards className="w-4 h-4" /> Redeem
//       </button>
//     </div>
//   </div>

//   {/* Bottom: stats — always 2 columns */}
//   <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-on-primary/20">
//     <div>
//       <p className="font-sans text-[10px] sm:text-xs text-on-primary/70">Referrals</p>
//       <p className="font-headline text-xl sm:text-2xl font-bold">{referrals?.referralCount || 0}</p>
//     </div>
//     <div>
//       <p className="font-sans text-[10px] sm:text-xs text-on-primary/70">Commission</p>
//       <p className="font-headline text-xl sm:text-2xl font-bold">₹{referrals?.referralEarnings || 0}</p>
//     </div>
//   </div>
// </section>

//       {loading ? <p className="py-12 text-center text-on-surface-variant">Loading your businesses...</p> : businesses.length === 0 ? (
//         <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 text-center">
//           <h2 className="font-headline text-xl font-bold text-on-surface mb-2">No businesses yet</h2>
//           <p className="font-sans text-sm text-on-surface-variant mb-6">Create your first listing and make it easy for local customers to find you.</p>
//           <Link to="/create" className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-bold px-5 py-3 rounded-xl text-sm">
//             <Plus className="w-4 h-4" /> Create your first listing
//           </Link>
//         </section>
//       ) : (
//         <section className="space-y-4">
//           {businesses.map((business) => (
//             <article key={business.slug} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center">
//               <div className="w-full md:w-48 aspect-[16/9] rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
//                 {business.image ? <img src={business.image} alt={business.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">{business.name.charAt(0)}</div>}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap items-center gap-2 mb-1">
//                   <h2 className="font-headline text-xl font-bold text-on-surface">{business.name}</h2>
//                   <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-container text-success">{business.status || 'active'}</span>
//                 </div>
//                 <p className="font-sans text-sm text-on-surface-variant">{business.category} · {business.city}</p>
//                 <p className="font-sans text-xs text-outline mt-2 truncate">{publicUrl(business.slug)}</p>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <Link to={`/${business.slug}`} target="_blank" className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   <ExternalLink className="w-3.5 h-3.5" /> View
//                 </Link>
//                 <Link to={`/create?edit=${business.slug}`} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   <Edit3 className="w-3.5 h-3.5" /> Edit
//                 </Link>
//                 <button onClick={() => handleShare(business)} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container">
//                   {navigator.share ? <Share2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Share
//                 </button>
//                 <button onClick={() => handleDelete(business)} className="inline-flex items-center gap-1.5 border border-error/30 px-3 py-2 rounded-lg text-xs font-semibold text-error hover:bg-error-container">
//                   <Trash2 className="w-3.5 h-3.5" /> Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </section>
//       )}
//     </main>
//   );
// };




import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, Edit3, ExternalLink, LogOut, Plus, Share2, Trash2, Mail, Phone, ShieldCheck, WalletCards, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (authLoading) return;
    Promise.all([api.businesses.mine(), api.referrals()])
      .then(([businessData, referralData]) => {
        setBusinesses(businessData.businesses || []);
        setReferrals(referralData);
      })
      .catch((error) => setNotice(error.message))
      .finally(() => setLoading(false));
  }, [authLoading]);

  const publicUrl = (slug) => `${window.location.origin}/${slug}`;

  const handleDelete = async (business) => {
    if (!window.confirm(`Delete ${business.name}? This cannot be undone.`)) return;
    try {
      await api.businesses.remove(business._id || business.id);
      setBusinesses((current) => current.filter((item) => item._id !== business._id));
    } catch (error) {
      setNotice(error.message);
    }
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
    await navigator.clipboard?.writeText(referrals?.referralCode || user.referralCode);
    setNotice('Referral code copied to clipboard.');
    setTimeout(() => setNotice(''), 2500);
  };

  const handleRedeem = () => {
    const earnings = referrals?.referralEarnings || 0;
    if (!earnings) {
      setNotice('Earn at least ₹50 in referral commission before redeeming.');
      setTimeout(() => setNotice(''), 2500);
      return;
    }
    setNotice('Your redeem request will be available after payout details are added.');
    setTimeout(() => setNotice(''), 3500);
  };

  const ownerInitial = (user?.email || 'O').charAt(0).toUpperCase();

  return (
    <main className="w-full px-4 md:px-8 py-8 min-h-[calc(100vh-8rem)] bg-gradient-to-b from-surface-container-lowest to-background">
      {/* Header: avatar + name/email on the left, actions on the right */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[linear-gradient(135deg,#16292c_0%,#2f756d_100%)] text-on-primary flex items-center justify-center font-headline text-lg font-bold shadow-sm flex-shrink-0">
            {ownerInitial}
          </div>
          <div className="min-w-0">
            <h1 className="font-headline text-xl font-bold text-on-surface leading-tight truncate">
              Welcome back{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p className="font-sans text-sm text-on-surface-variant truncate">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm hover:bg-secondary/90 hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            List a business
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-error-container hover:text-error hover:border-error/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </header>

      {/* Info strip */}
      <section className="mb-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden
                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                    divide-y divide-outline-variant/20 sm:divide-y-0
                    sm:divide-x sm:divide-outline-variant/20">
        <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Email</p>
            <p className="text-[13px] font-semibold text-on-surface truncate leading-tight">{user?.email || 'Not available'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Mobile</p>
            <p className="text-[13px] font-semibold text-on-surface truncate leading-tight">{user?.mobile || 'Not available'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-tertiary/15 text-on-tertiary-container flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-wider font-bold text-outline leading-tight">Account type</p>
            <p className="text-[13px] font-semibold text-on-surface capitalize truncate leading-tight">{user?.role || 'Owner'}</p>
          </div>
        </div>
      </section>

      {notice && (
        <div className="mb-5 rounded-xl bg-primary/10 border border-primary/20 text-primary px-4 py-3 text-sm font-semibold">
          {notice}
        </div>
      )}

      {/* Referral — background unchanged */}
      <section className="mb-6 bg-[linear-gradient(135deg,#16292c_0%,#2f756d_98%,#b94630_100%)] shadow-[0_-12px_30px_rgba(22,41,44,0.18)] text-on-primary rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-on-primary/70">
              Your referral code
            </p>
            <p className="font-mono text-lg sm:text-xl font-bold mt-0.5 break-all">
              {referrals?.referralCode || user?.referralCode}
            </p>
            <p className="font-sans text-xs text-on-primary/75 mt-1">
              Share it with a new owner. You earn ₹50 after their listing is created.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={copyReferralCode}
              className="inline-flex items-center justify-center gap-2 bg-on-primary text-primary-container font-bold px-4 py-2 rounded-xl text-sm hover:bg-on-primary/90 w-full sm:w-auto"
            >
              <Copy className="w-4 h-4" /> Copy code
            </button>
            <button
              onClick={handleRedeem}
              disabled={!(referrals?.referralEarnings > 0)}
              className="inline-flex items-center justify-center gap-2 border border-on-primary/50 text-on-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-on-primary/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <WalletCards className="w-4 h-4" /> Redeem
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-on-primary/20">
          <div>
            <p className="font-sans text-[10px] sm:text-xs text-on-primary/70">Referrals</p>
            <p className="font-headline text-xl sm:text-2xl font-bold">{referrals?.referralCount || 0}</p>
          </div>
          <div>
            <p className="font-sans text-[10px] sm:text-xs text-on-primary/70">Commission</p>
            <p className="font-headline text-xl sm:text-2xl font-bold">₹{referrals?.referralEarnings || 0}</p>
          </div>
        </div>
      </section>

      {loading ? (
        <p className="py-12 text-center text-on-surface-variant">Loading your businesses...</p>
      ) : businesses.length === 0 ? (
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-2">No businesses yet</h2>
          <p className="font-sans text-sm text-on-surface-variant mb-6">Create your first listing and make it easy for local customers to find you.</p>
          <Link to="/create" className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-bold px-5 py-3 rounded-xl text-sm shadow-sm hover:bg-secondary/90 hover:shadow-md transition-all">
            <Plus className="w-4 h-4" /> Create your first listing
          </Link>
        </section>
      ) : (
        <section className="space-y-4">
          {businesses.map((business) => (
            <article
              key={business.slug}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center shadow-sm hover:shadow-md hover:border-secondary/30 transition-all"
            >
              <div className="w-full md:w-48 aspect-[16/9] rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
                {business.image ? (
                  <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary bg-primary/5">
                    {business.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="font-headline text-xl font-bold text-on-surface">{business.name}</h2>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-container text-success">{business.status || 'active'}</span>
                </div>
                <p className="font-sans text-sm text-on-surface-variant">{business.category} · {business.city}</p>
                <p className="font-sans text-xs text-outline mt-2 truncate">{publicUrl(business.slug)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to={`/${business.slug}`} target="_blank" className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-tertiary/10 hover:border-tertiary/30 hover:text-on-tertiary-container transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </Link>
                <Link to={`/create?edit=${business.slug}`} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-colors">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Link>
                <button onClick={() => handleShare(business)} className="inline-flex items-center gap-1.5 border border-outline-variant px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors">
                  {navigator.share ? <Share2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Share
                </button>
                <button onClick={() => handleDelete(business)} className="inline-flex items-center gap-1.5 border border-error/30 px-3 py-2 rounded-lg text-xs font-semibold text-error hover:bg-error-container transition-colors">
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