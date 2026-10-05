import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Copy,
  Edit3,
  ExternalLink,
  LogOut,
  Plus,
  Share2,
  Trash2,
  Mail,
  Phone,
  ShieldCheck,
  WalletCards,
  Building2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { confirmAction, showError } from "../../lib/alerts";

const ACCENT = "#14b8a6";
const ACCENT_SOFT = "#5eead4";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

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
    const confirmed = await confirmAction({
      title: `Delete ${business.name}?`,
      text: "This cannot be undone.",
    });
    if (!confirmed) return;

    try {
      await api.businesses.remove(business._id || business.id);
      setBusinesses((current) =>
        current.filter((item) => item._id !== business._id),
      );
    } catch (error) {
      setNotice(error.message);
      showError(error.message);
    }
  };

  const handleShare = async (business) => {
    const url = publicUrl(business.slug);
    try {
      if (navigator.share) {
        await navigator.share({
          title: business.name,
          text: `Visit ${business.name}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setNotice("Business URL copied to clipboard.");
        setTimeout(() => setNotice(""), 2500);
      }
    } catch {
      setNotice("Sharing was cancelled.");
      setTimeout(() => setNotice(""), 2500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const copyReferralCode = async () => {
    await navigator.clipboard?.writeText(
      referrals?.referralCode || user.referralCode,
    );
    setNotice("Referral code copied to clipboard.");
    setTimeout(() => setNotice(""), 2500);
  };

  const handleRedeem = () => {
    const earnings = referrals?.referralEarnings || 0;
    if (!earnings) {
      setNotice("Earn at least ₹50 in referral commission before redeeming.");
      setTimeout(() => setNotice(""), 2500);
      return;
    }
    setNotice(
      "Your redeem request will be available after payout details are added.",
    );
    setTimeout(() => setNotice(""), 3500);
  };

  const ownerInitial = (user?.email || "O").charAt(0).toUpperCase();

  return (
    <main className="w-full min-h-screen bg-[#16292C] px-4 md:px-8 py-8 relative overflow-hidden">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_8%_0%,rgba(20,184,166,0.16),transparent_42%),radial-gradient(circle_at_92%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

      <div className="relative ">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center font-headline text-lg font-bold shadow-[0_10px_25px_-10px_rgba(20,184,166,0.7)] flex-shrink-0">
              {ownerInitial}
            </div>
            <div className="min-w-0">
              <h1 className="font-headline text-xl font-bold text-white leading-tight truncate">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="font-sans text-sm text-white/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all
                         bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
                         hover:from-[#0d6b64] hover:to-[#0ea5a0]
                         shadow-[0_14px_30px_-12px_rgba(20,184,166,0.65)]
                         active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Create New Page
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/15 text-white/80 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-red-500/10 hover:text-red-300 hover:border-red-400/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </header>

        {/* Info strip */}
        <section
          className="mb-6 bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md
                          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                          divide-y divide-white/10 sm:divide-y-0
                          sm:divide-x sm:divide-white/10"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wider font-bold text-white/45 leading-tight">
                Email
              </p>
              <p className="text-[13px] font-semibold text-white truncate leading-tight">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wider font-bold text-white/45 leading-tight">
                Mobile
              </p>
              <p className="text-[13px] font-semibold text-white truncate leading-tight">
                {user?.mobile || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-3 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-violet-400/15 border border-violet-400/30 text-violet-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wider font-bold text-white/45 leading-tight">
                Account type
              </p>
              <p className="text-[13px] font-semibold text-white capitalize truncate leading-tight">
                {user?.role || "Owner"}
              </p>
            </div>
          </div>
        </section>

        {notice && (
          <div className="mb-5 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/30 text-[#5eead4] px-4 py-3 text-sm font-semibold">
            {notice}
          </div>
        )}

        {/* Referral — kept bold brand gradient */}
        <section
          className="mb-6 rounded-2xl p-4 sm:p-5 text-white relative overflow-hidden
                            bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_60%,#b94630_100%)]
                            shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/75">
                Your referral code
              </p>
              <p className="font-mono text-lg sm:text-xl font-bold mt-0.5 break-all">
                {referrals?.referralCode || user?.referralCode}
              </p>
              <p className="font-sans text-xs text-white/80 mt-1">
                Share it with a new owner. You earn ₹50 after their listing is
                created.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={copyReferralCode}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0f766e] font-bold px-4 py-2 rounded-xl text-sm hover:bg-white/90 w-full sm:w-auto transition-colors"
              >
                <Copy className="w-4 h-4" /> Copy code
              </button>
              <button
                onClick={handleRedeem}
                disabled={!(referrals?.referralEarnings > 0)}
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto transition-colors"
              >
                <WalletCards className="w-4 h-4" /> Redeem
              </button>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="font-sans text-[10px] sm:text-xs text-white/75">
                Referrals
              </p>
              <p className="font-headline text-xl sm:text-2xl font-bold">
                {referrals?.referralCount || 0}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] sm:text-xs text-white/75">
                Commission
              </p>
              <p className="font-headline text-xl sm:text-2xl font-bold">
                ₹{referrals?.referralEarnings || 0}
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <p className="py-12 text-center text-white/60">
            Loading your businesses...
          </p>
        ) : businesses.length === 0 ? (
          <section className="bg-white/[0.04] border border-white/10 rounded-2xl p-10 text-center backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="font-headline text-xl font-bold text-white mb-2">
              No businesses yet
            </h2>
       <p className="font-sans text-sm text-white/65 mb-6">
  Create your first page and share your website URL with your customers.
</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all
                         bg-gradient-to-r from-[#0f766e] to-[#14b8a6]
                         hover:from-[#0d6b64] hover:to-[#0ea5a0]
                         shadow-[0_14px_30px_-12px_rgba(20,184,166,0.65)]
                         active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" /> Create your first page
            </Link>
          </section>
        ) : (
          <section className="space-y-4">
            {businesses.map((business) => (
              <article
                key={business.slug}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center backdrop-blur-md shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-full md:w-48 aspect-[16/9] rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 flex-shrink-0">
                  {business.image ? (
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#5eead4] bg-[#14b8a6]/10">
                      {business.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-headline text-xl font-bold text-white">
                      {business.name}
                    </h2>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#14b8a6]/15 text-[#5eead4] border border-[#14b8a6]/30 capitalize">
                      {business.status || "active"}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-white/65">
                    {business.category} · {business.city}
                  </p>
                  <p className="font-sans text-xs text-white/45 mt-2 truncate">
                    {publicUrl(business.slug)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${business.slug}?ownerView=1`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:bg-white/[0.06] hover:text-white hover:border-white/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View my page
                  </Link>

                  <Link
                    to={`/create?edit=${business.slug}`}
                    className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:bg-amber-400/10 hover:border-amber-400/30 hover:text-amber-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </Link>

                  <button
                    onClick={() => handleShare(business)}
                    className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]/30 hover:text-[#5eead4] transition-colors"
                  >
                    {navigator.share ? (
                      <Share2 className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}{" "}
                    Share
                  </button>

                  <button
                    onClick={() => handleDelete(business)}
                    className="inline-flex items-center gap-1.5 border border-red-400/30 px-3 py-2 rounded-lg text-xs font-semibold text-red-300 hover:bg-red-500/10 hover:border-red-400/50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};
