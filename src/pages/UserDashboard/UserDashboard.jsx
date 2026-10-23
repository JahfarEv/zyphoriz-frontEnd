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
  CreditCard,
  AlertCircle,
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
  const [payingBusinessId, setPayingBusinessId] = useState(null);

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

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () =>
        reject(new Error("Unable to load Razorpay Checkout"));
      document.body.appendChild(script);
    });

  const handleRetryPayment = async (business) => {
    const businessId = business._id || business.id;
    if (!businessId || payingBusinessId) return;

    setPayingBusinessId(businessId);
    try {
      await loadRazorpay();
      const { order, keyId } = await api.payments.createOrder({ businessId });
      if (!order?.id || !keyId) {
        throw new Error("Razorpay order was not created");
      }

      const result = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Zyphoriz",
          description: "Standard business listing",
          order_id: order.id,
          prefill: {
            name: business.name,
            email: business.email,
            contact: business.phone,
          },
          notes: { businessId },
          theme: { color: "#0f766e" },
          handler: async (paymentResponse) => {
            try {
              resolve(
                await api.payments.checkout({
                  businessId,
                  ...paymentResponse,
                }),
              );
            } catch (error) {
              reject(error);
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment was cancelled")),
          },
        });

        razorpay.on("payment.failed", (response) => {
          reject(
            new Error(
              response.error?.description || "Payment failed",
            ),
          );
        });
        razorpay.open();
      });

      setBusinesses((current) =>
        current.map((item) =>
          (item._id || item.id) === businessId
            ? { ...item, ...(result.business || {}), status: "active" }
            : item,
        ),
      );
      await showAlert({
        icon: "success",
        title: "Payment successful",
        text: `${business.name} is now publicly available.`,
      });
    } catch (error) {
      showError(error.message);
    } finally {
      setPayingBusinessId(null);
    }
  };

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
    <main className="w-full min-h-screen bg-[#16292C] px-4 md:px-8 pt-6 pb-28 md:py-8 relative overflow-hidden">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_8%_0%,rgba(20,184,166,0.16),transparent_42%),radial-gradient(circle_at_92%_100%,rgba(232,162,61,0.08),transparent_50%)]" />

      <div className="relative ">
        {/* Header */}
        <header className="relative flex items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="hidden sm:flex items-center gap-3.5 min-w-0">
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

          {/* <h1 className="font-headline text-xl font-bold text-white sm:hidden">
            Dashboard
          </h1> */}

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
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
          className="mb-6 hidden bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md sm:grid
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
     <section className="relative mb-6 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_60%,#b94630_100%)] p-4 text-white shadow-[0_20px_45px_-20px_rgba(20,184,166,0.55)]">
  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[16px] border-white/10" />

  {/* Top row: code + actions */}
  <div className="relative flex items-center justify-between gap-3">
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
        Referral code
      </p>
      <p className="mt-0.5 break-all font-mono text-base font-bold leading-tight sm:text-lg">
        {referrals?.referralCode || user?.referralCode}
      </p>
    </div>

    <div className="flex flex-shrink-0 items-center gap-1.5">
      <button
        onClick={copyReferralCode}
        aria-label="Copy referral code"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0f766e] transition-colors hover:bg-white/90 active:scale-95 sm:h-8 sm:w-8"
      >
        <Copy className="h-4 w-4" />
      </button>
      <button
        onClick={handleRedeem}
        disabled={loading}
        aria-label="Redeem commission"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-white/50 px-3 text-xs font-bold transition-colors hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-8"
      >
        <WalletCards className="h-3.5 w-3.5" />
        Redeem
      </button>
    </div>
  </div>

  {/* Stats row */}
  <div className="relative mt-3 grid grid-cols-2 gap-2 border-t border-white/20 pt-2.5">
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[11px] text-white/70">Referrals</span>
      <span className="font-headline text-base font-bold leading-none">
        {referrals?.referralCount || 0}
      </span>
    </div>
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[11px] text-white/70">Earned</span>
      <span className="font-headline text-base font-bold leading-none">
        ₹{referrals?.referralEarnings || 0}
      </span>
    </div>
  </div>

  {referrals?.pendingRedemption && (
    <p className="relative mt-2 rounded-md border border-white/20 bg-black/10 px-2.5 py-1.5 text-[11px] text-white/85">
      ₹{referrals.pendingRedemption.amount} redemption pending review.
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
<section className="space-y-3 sm:space-y-4">
  {businesses.map((business) => {
    const id = business._id || business.id;
    const isPending = business.status === "pending_payment";
    const isPaying = payingBusinessId === id;
    const img =
      business.image ||
      business.coverImage ||
      (Array.isArray(business.gallery) && business.gallery[0]);

    return (
      <article
        key={business.slug || id}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md transition-all hover:border-[#14b8a6]/40 hover:bg-white/[0.06] sm:p-4"
      >
        {/* Main row */}
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          {/* Thumbnail */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] sm:aspect-[16/9] sm:h-auto sm:w-40 sm:rounded-xl">
            {img ? (
              <img
                src={img}
                alt={business.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#14b8a6]/10 text-lg font-bold text-[#5eead4] sm:text-2xl">
                {business.name.charAt(0)} 
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="min-w-0 truncate font-headline text-sm font-bold text-white sm:text-lg">
                {business.name}
              </h2>
              <span
                className={`flex-shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold capitalize leading-none sm:px-2 sm:py-1 sm:text-[10px] ${
                  isPending
                    ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                    : "border-[#14b8a6]/30 bg-[#14b8a6]/15 text-[#5eead4]"
                }`}
              >
                {isPending ? "Pending" : business.status || "Active"}
              </span>
            </div>

            <p className="mt-0.5 truncate text-xs text-white/60 sm:text-sm">
              {business.category} · {business.city}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-white/40 sm:text-xs">
              {publicUrl(business.slug)}
            </p>
          </div>

          {/* Desktop actions */}
          <div className="hidden flex-shrink-0 items-center gap-1.5 sm:flex">
            {isPending ? (
              <button
                onClick={() => handleRetryPayment(business)}
                disabled={Boolean(payingBusinessId)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-3 py-2 text-xs font-semibold text-white transition-colors hover:from-[#0d6b64] hover:to-[#0ea5a0] disabled:opacity-60"
              >
                <CreditCard className="h-3.5 w-3.5" />
                {isPaying ? "Opening..." : "Pay now"}
              </button>
            ) : (
              <Link
                to={`/${business.slug}?ownerView=1`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </Link>
            )}
            <Link
              to={`/create?edit=${business.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-200"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit
            </Link>
            {!isPending && (
              <button
                onClick={() => handleShare(business)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-[#14b8a6]/30 hover:bg-[#14b8a6]/10 hover:text-[#5eead4]"
              >
                {navigator.share ? (
                  <Share2 className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                Share
              </button>
            )}
            <button
              onClick={() => handleDelete(business)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:border-red-400/50 hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>

        {/* Pending note (mobile + desktop) */}
        {isPending && (
          <p className="mt-2 flex items-start gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1.5 text-[11px] leading-snug text-amber-100/90 sm:mt-3 sm:items-center sm:px-3 sm:py-2 sm:text-xs">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 sm:mt-0" />
            <span>Payment pending — publish to make this page public.</span>
          </p>
        )}

        {/* Mobile action row */}
        <div className="mt-2.5 grid grid-cols-4 gap-1.5 border-t border-white/10 pt-2.5 sm:hidden">
          {isPending ? (
            <button
              onClick={() => handleRetryPayment(business)}
              disabled={Boolean(payingBusinessId)}
              className="col-span-2 flex min-h-9 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-[11px] font-semibold text-white transition-opacity active:scale-[0.98] disabled:opacity-60"
            >
              <CreditCard className="h-3.5 w-3.5" />
              {isPaying ? "Opening..." : "Pay now"}
            </button>
          ) : (
            <Link
              to={`/${business.slug}?ownerView=1`}
              target="_blank"
              className="col-span-1 flex min-h-9 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/15 text-[9px] font-semibold text-white/75 active:scale-[0.98] active:bg-white/[0.06]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View
            </Link>
          )}

          <Link
            to={`/create?edit=${business.slug}`}
            className={`${
              isPending ? "col-span-1" : "col-span-1"
            } flex min-h-9 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/15 text-[9px] font-semibold text-white/75 active:scale-[0.98] active:bg-white/[0.06]`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </Link>

          {!isPending && (
            <button
              onClick={() => handleShare(business)}
              className="col-span-1 flex min-h-9 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/15 text-[9px] font-semibold text-white/75 active:scale-[0.98] active:bg-white/[0.06]"
            >
              {navigator.share ? (
                <Share2 className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              Share
            </button>
          )}

          <button
            onClick={() => handleDelete(business)}
            className={`${
              isPending ? "col-span-1" : "col-span-1"
            } flex min-h-9 flex-col items-center justify-center gap-0.5 rounded-lg border border-red-400/25 text-[9px] font-semibold text-red-300 active:scale-[0.98] active:bg-red-500/10`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </article>
    );
  })}
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
