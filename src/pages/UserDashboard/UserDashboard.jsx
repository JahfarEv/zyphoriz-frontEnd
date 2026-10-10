import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { confirmAction, showAlert, showError } from "../../lib/alerts";

const ACCENT = "#14b8a6";
const ACCENT_SOFT = "#5eead4";
const MINIMUM_REDEMPTION = 1000;

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState("bank");
  const [payoutDetails, setPayoutDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    upiId: "",
  });
  const [submittingRedemption, setSubmittingRedemption] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    Promise.all([api.businesses.mine(), api.referrals.get()])
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

  const handleRedeem = async () => {
    if (referrals?.pendingRedemption) {
      await showAlert({
        icon: "info",
        title: "Redemption request pending",
        text: "Your existing referral redemption request is being reviewed.",
      });
      return;
    }

    const earnings = Number(referrals?.referralEarnings) || 0;
    if (earnings < MINIMUM_REDEMPTION) {
      await showAlert({
        icon: "warning",
        title: "Minimum not reached",
        text: `You need at least ₹${MINIMUM_REDEMPTION} in referral commission to redeem. Your current balance is ₹${earnings}.`,
      });
      return;
    }

    setRedeemModalOpen(true);
  };

  const handlePayoutFieldChange = (event) => {
    const { name, value } = event.target;
    setPayoutDetails((current) => ({ ...current, [name]: value }));
  };

  const handleRedemptionSubmit = async (event) => {
    event.preventDefault();
    setSubmittingRedemption(true);
    try {
      const result = await api.referrals.redeem({ payoutMethod, payoutDetails });
      setReferrals((current) => ({
        ...current,
        referralEarnings: result.referralEarnings,
        pendingRedemption: result.pendingRedemption,
      }));
      setRedeemModalOpen(false);
      setPayoutDetails({
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        upiId: "",
      });
      await showAlert({
        icon: "success",
        title: "Request submitted",
        text: `Your ₹${result.redemption.amount} redemption request is pending review.`,
      });
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmittingRedemption(false);
    }
  };

  const ownerInitial = (user?.email || "O").charAt(0).toUpperCase();

  return (
    <>
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
                disabled={loading}
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
                Available commission
              </p>
              <p className="font-headline text-xl sm:text-2xl font-bold">
                ₹{referrals?.referralEarnings || 0}
              </p>
            </div>
          </div>
          {referrals?.pendingRedemption && (
            <p className="relative mt-3 rounded-lg border border-white/20 bg-black/10 px-3 py-2 text-xs text-white/85">
              ₹{referrals.pendingRedemption.amount} redemption request pending review.
            </p>
          )}
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
                  {business.image || business.coverImage || (Array.isArray(business.gallery) && business.gallery[0]) ? (
                    <img
                      src={business.image || business.coverImage || business.gallery[0]}
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
    {redeemModalOpen &&
      createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !submittingRedemption) {
              setRedeemModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="redemption-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-white/15 bg-[#16292C] p-5 text-white shadow-2xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="redemption-title" className="font-headline text-xl font-bold">
                  Redeem referral commission
                </h2>
                <p className="mt-1 text-sm text-white/65">
                  Available to redeem: ₹{referrals?.referralEarnings || 0}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRedeemModalOpen(false)}
                disabled={submittingRedemption}
                aria-label="Close redemption form"
                className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRedemptionSubmit} className="space-y-4">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-white/85">
                  Payout method
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "bank", label: "Bank transfer" },
                    { value: "upi", label: "UPI" },
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPayoutMethod(method.value)}
                      aria-pressed={payoutMethod === method.value}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                        payoutMethod === method.value
                          ? "border-[#14b8a6] bg-[#14b8a6]/15 text-[#5eead4]"
                          : "border-white/15 text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-white/80">
                Account holder name
                <input
                  name="accountHolderName"
                  value={payoutDetails.accountHolderName}
                  onChange={handlePayoutFieldChange}
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#14b8a6]"
                />
              </label>

              {payoutMethod === "bank" ? (
                <>
                  <label className="block text-sm font-medium text-white/80">
                    Account number
                    <input
                      name="accountNumber"
                      value={payoutDetails.accountNumber}
                      onChange={handlePayoutFieldChange}
                      required
                      inputMode="numeric"
                      pattern="[0-9]{8,32}"
                      title="Enter an account number with 8 to 32 digits."
                      autoComplete="off"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#14b8a6]"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-white/80">
                      IFSC code
                      <input
                        name="ifscCode"
                        value={payoutDetails.ifscCode}
                        onChange={handlePayoutFieldChange}
                        required
                        pattern="[A-Za-z]{4}0[A-Za-z0-9]{6}"
                        title="Enter a valid 11-character IFSC code."
                        autoComplete="off"
                        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm uppercase text-white outline-none transition focus:border-[#14b8a6]"
                      />
                    </label>
                    <label className="block text-sm font-medium text-white/80">
                      Branch
                      <input
                        name="branch"
                        value={payoutDetails.branch}
                        onChange={handlePayoutFieldChange}
                        required
                        minLength={2}
                        maxLength={120}
                        autoComplete="off"
                        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#14b8a6]"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="block text-sm font-medium text-white/80">
                  UPI ID
                  <input
                    name="upiId"
                    value={payoutDetails.upiId}
                    onChange={handlePayoutFieldChange}
                    required
                    pattern="[\w.-]{2,100}@[A-Za-z][\w.-]{1,30}"
                    title="Enter a valid UPI ID, for example name@bank."
                    autoComplete="off"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#14b8a6]"
                  />
                </label>
              )}

              <p className="text-xs leading-relaxed text-white/50">
                Your request will be reviewed before payment. Payout details are only used to process this request.
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRedeemModalOpen(false)}
                  disabled={submittingRedemption}
                  className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingRedemption}
                  className="rounded-xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  {submittingRedemption ? "Submitting..." : "Submit request"}
                </button>
              </div>
            </form>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
};
