import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Send,
  Youtube,
  Clock,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  X,
  AlertCircle,
  BadgeCheck,
  Star,
  Store,
  ArrowRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { api } from "../../lib/api";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { useRegistration } from "../../context/RegistrationContext";
import { useAuth } from "../../context/AuthContext";
import { getTemplateConfig, DEFAULT_TEMPLATE } from "../../data/templates";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.poketstor.platform&pcampaignid=web_share";
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const parsedUrl = new URL(url);
    const videoId =
      parsedUrl.searchParams.get("v") ||
      parsedUrl.pathname.split("/").filter(Boolean).pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch {
    return "";
  }
};

// Normalise hours — supports {day,time} and {day,open,from,to}
const normaliseHours = (hours) => {
  if (!Array.isArray(hours)) return [];
  return hours
    .map((h) => {
      if (h.time) return { day: h.day, time: h.time };
      if (!h.open) return { day: h.day, time: "Closed" };
      if (h.from && h.to) return { day: h.day, time: `${h.from} – ${h.to}` };
      return { day: h.day, time: "" };
    })
    .filter((h) => h.time);
};

export const BusinessProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, logout } = useAuth();
  const { formData, registrationCompleted } = useRegistration();
  const ownerViewRequested = searchParams.get("ownerView") === "1";

  // Try newly created business from context if just redirected from registration
  const contextBusiness =
    registrationCompleted && formData.slug === slug
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
          instagram: formData.instagram,
          facebook: formData.facebook,
          telegram: formData.telegram,
          youtube: formData.youtube,
          video: formData.video,
          location: `${formData.address}, ${formData.city}`,
          city: formData.city,
          description: formData.description,
          descriptionSections: formData.descriptionSections,
          verified: true,
          trending: false,
          rating: null,
          reviewCount: 0,
          hours: [],
          services: [],
          gallery: formData.galleryImages || [],
          image: formData.bannerImage || null,
          coverImage: formData.bannerImage || null,
          template: formData.template || DEFAULT_TEMPLATE,
        }
      : null;

  const [business, setBusiness] = useState(contextBusiness);
  const [loading, setLoading] = useState(!contextBusiness);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isOwnerView, setIsOwnerView] = useState(false);

  useEffect(() => {
    if (contextBusiness) {
      setBusiness(contextBusiness);
      setLoading(false);
      return;
    }
    setLoading(true);
    api.businesses
      .bySlug(slug)
      .then((data) => setBusiness(data?.business || data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [slug, contextBusiness]);

  useEffect(() => {
    let isActive = true;
    setIsOwnerView(false);

    if (!ownerViewRequested || authLoading || !user) return undefined;

    api.businesses
      .mine()
      .then(({ businesses = [] }) => {
        if (isActive) {
          setIsOwnerView(
            businesses.some((ownedBusiness) => ownedBusiness.slug === slug),
          );
        }
      })
      .catch((requestError) => {
        console.error("Could not verify business owner view:", requestError);
      });

    return () => {
      isActive = false;
    };
  }, [authLoading, ownerViewRequested, slug, user]);

  const handleOwnerLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  // Resolve template theme (safe even before business loads)
  const templateConfig = getTemplateConfig(
    business?.template || DEFAULT_TEMPLATE,
  );
  const theme = templateConfig.theme;

  // ---------- LOADING ----------
  if (loading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  // ---------- ERROR ----------
  if (!business) {
    return (
      <main
        className="w-full min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: theme.surface, color: theme.textOnSurface }}
      >
        <div className="max-w-md w-full text-center rounded-2xl border border-white/10 p-8 bg-white/[0.04]">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${theme.highlight}22` }}
          >
            <AlertCircle
              className="w-6 h-6"
              style={{ color: theme.highlight }}
            />
          </div>
          <h1 className="font-headline text-xl font-bold mb-2">
            Business Not Found
          </h1>
          <p className="font-sans text-sm opacity-60 mb-6">
            {error ||
              "This business page doesn't exist or may have been removed."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white font-sans font-bold px-6 py-3 rounded-xl text-sm transition-all"
            style={{
              background: `linear-gradient(135deg, ${theme.deep} 0%, ${theme.accent} 100%)`,
              boxShadow: `0 14px 30px -12px ${theme.accent}99`,
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // ---------- DERIVED ----------
  const {
    name,
    category,
    description,
    descriptionSections = [],
    phone,
    additionalPhones = [],
    whatsapp,
    email,
    website,
    address,
    city,
    location,
    hours,
    openingHours,
    services = [],
    gallery = [],
    photos = [],
    verified,
    rating,
    reviews,
    reviewCount,
    video,
    instagram,
    facebook,
    telegram,
    youtube,
    logo,
    profileImage,
    coverImage,
    image,
    ownerReferralCode,
  } = business;

  const categoryName =
    typeof category === "string" ? category : category?.name || null;

  const whatsappNumber = (whatsapp || phone || "").replace(/[^0-9]/g, "");
  const youtubeEmbedUrl = getYouTubeEmbedUrl(video);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${name} ${city || ""}`.trim(),
  )}`;

  const mapQuery = location || [address, city].filter(Boolean).join(", ");
  const mapEmbedUrl = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    : "";

  const allPhotos = (gallery.length > 0 ? gallery : photos).slice(0, 6);
  const hoursList = normaliseHours(openingHours || hours || []);
  const reviewTotal = reviews ?? reviewCount ?? 0;

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href.split("?")[0]
      : `https://zyphoriz.com/${business.slug || slug}`;

  const businessProfileImage =
    logo ||
    profileImage ||
    image ||
    coverImage ||
    (Array.isArray(gallery) && gallery[0]) ||
    (Array.isArray(photos) && photos[0]) ||
    "";

  const rawBusinessImage =
    coverImage ||
    image ||
    businessProfileImage;

  const toAbsoluteUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://zyphoriz.com";
    return `${origin}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const shareImage = toAbsoluteUrl(rawBusinessImage || businessProfileImage);
  const iconImage = toAbsoluteUrl(businessProfileImage);
  const shareTitle = `${name} | Zyphoriz`;
  const shareDescription =
    description ||
    descriptionSections?.[0]?.description ||
    `Discover ${name} on Zyphoriz.`;

  return (
    <>
      <Helmet>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDescription} />
        <link rel="canonical" href={shareUrl} />
        {iconImage && <link rel="icon" href={iconImage} />}

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zyphoriz" />
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:url" content={shareUrl} />
        {shareImage && <meta property="og:image" content={shareImage} />}
        {shareImage && <meta property="og:image:secure_url" content={shareImage} />}
        <meta property="og:image:alt" content={name} />
        {shareImage && <meta property="og:image:width" content="1200" />}
        {shareImage && <meta property="og:image:height" content="630" />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta name="twitter:description" content={shareDescription} />
        {shareImage && <meta name="twitter:image" content={shareImage} />}
      </Helmet>

      {isOwnerView && (
        <header className="relative z-10 flex w-full items-center justify-between gap-3 border-b border-white/10 bg-[#16292c] px-4 py-3 text-white md:px-8">
          <Link to="/" aria-label="Zyphoriz home" className="flex-shrink-0">
            <img
              src="/image/zypho.png"
              alt="Zyphoriz"
              className="h-8 w-auto max-w-[100px] object-contain md:h-9 md:max-w-[150px]"
            />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:bg-white/10 sm:px-3"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>My Dashboard</span>
            </Link>
            <button
              type="button"
              onClick={handleOwnerLogout}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:bg-white/10 sm:px-3"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>
      )}

      <div
        className="w-full min-h-screen pb-12 relative overflow-hidden"
        style={{
          backgroundColor: theme.surface,
          color: theme.textOnSurface,
        }}
      >
        {/* Dot pattern tinted by template highlight */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${theme.highlight} 1.5px, transparent 1.5px)`,
            backgroundSize: "26px 26px",
          }}
        />

        {/* ---------- COVER BANNER ---------- */}
        <section className="w-full h-56 md:h-80 relative overflow-hidden">
          {coverImage || image ? (
            <img
              src={coverImage || image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{ background: templateConfig.gradient }}
            >
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `radial-gradient(#FBF6EC 1.5px, transparent 1.5px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <span className="font-headline text-8xl md:text-9xl font-black text-white/20 relative z-10">
                {name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

          <div className="absolute left-4 md:left-8 bottom-5 flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide uppercase">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.highlight }}
            />
            {templateConfig.name} template
          </div>
        </section>

        {/* ---------- MAIN CONTAINER ---------- */}
        <div className="w-full  px-4 md:px-6 relative -mt-12 md:-mt-16">
          {/* ----- HEADER CARD ----- */}
          <div
            className="rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,0.45)] p-5 md:p-7 flex flex-col md:flex-row gap-5 items-start md:items-center mb-8 border"
            style={{
              backgroundColor: `${theme.surface}F2`,
              borderColor: `${theme.accent}33`,
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Logo */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border-4 shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{
                background: templateConfig.gradient,
                borderColor: theme.surface,
              }}
            >
              {logo || image ? (
                <img
                  src={logo || image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-headline text-3xl font-black text-white">
                  {name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="font-headline text-2xl md:text-3xl font-bold">
                  {name}
                </h1>
                {verified && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={{
                      backgroundColor: `${theme.accent}26`,
                      color: theme.accentSoft,
                    }}
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>

              {categoryName && (
                <p
                  className="inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-bold uppercase tracking-wide mb-2"
                  style={{
                    backgroundColor: `${theme.highlight}1F`,
                    color: theme.highlight,
                  }}
                >
                  {categoryName}
                </p>
              )}

              {/* {rating > 0 && (
                <div className="flex items-center gap-1.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5"
                      style={{
                        color:
                          i < Math.round(rating)
                            ? theme.highlight
                            : "#ffffff30",
                        fill:
                          i < Math.round(rating)
                            ? theme.highlight
                            : "transparent",
                      }}
                    />
                  ))}
                  <span className="font-sans text-xs opacity-60">
                    {Number(rating).toFixed(1)} ({reviewTotal} reviews)
                  </span>
                </div>
              )}

              {(address || city || location) && (
                <p className="font-sans text-xs opacity-60 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {[address, city].filter(Boolean).join(", ") || location}
                </p>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              {phone && (
                <a href={`tel:${phone}`} className="flex-1 md:flex-none">
                  <button
                    className="w-full flex items-center justify-center gap-2 font-sans font-bold px-5 py-2.5 rounded-xl transition-all text-sm text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.deep} 0%, ${theme.accent} 100%)`,
                      boxShadow: `0 12px 24px -10px ${theme.accent}99`,
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
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
                  <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans font-bold px-5 py-2.5 rounded-xl hover:bg-[#1eb555] transition-all text-sm">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </a>
              )}
            </div>
          </div>

          {/* ----- CONTENT GRID ----- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT MAIN COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {(descriptionSections.length
                ? descriptionSections
                : [{ title: "About", description }]
              )
                .filter((section) => section.title?.trim() || section.description?.trim())
                .map((section, index) => (
                  <div
                    key={`${section.title || "section"}-${index}`}
                    className="rounded-2xl p-6 shadow-sm relative overflow-hidden border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      borderColor: `${theme.accent}33`,
                    }}
                  >
                    <div
                      className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-20"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <h2 className="relative font-headline text-lg font-bold mb-3 flex items-center gap-2">
                      <span
                        className="h-6 w-1 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                      {section.title?.trim() || "About"}
                    </h2>
                    <p className="font-sans text-sm opacity-70 leading-relaxed whitespace-pre-line">
                      {section.description}
                    </p>
                  </div>
                ))}

              {/* Services */}
              {services.length > 0 && (
                <div
                  className="rounded-2xl p-6 shadow-sm border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: `${theme.highlight}40`,
                  }}
                >
                  <h2 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                    <span
                      className="h-6 w-1 rounded-full"
                      style={{ backgroundColor: theme.highlight }}
                    />
                    Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {services.map((svc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 font-sans text-sm"
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: theme.accent }}
                        />
                        <span>
                          {typeof svc === "string" ? svc : svc?.name || ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discover more / Video */}
              <div
                className="rounded-2xl p-6 shadow-sm border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: `${theme.accent}33`,
                }}
              >
                <h2 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                  <Youtube
                    className="w-5 h-5"
                    style={{ color: theme.accentSoft }}
                  />
                  Discover more
                </h2>
                {youtubeEmbedUrl ? (
                  <div className="aspect-video overflow-hidden rounded-xl bg-black">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={`${name} video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl min-h-48 flex items-end">
                    {coverImage || image ? (
                      <img
                        src={coverImage || image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: templateConfig.gradient }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                    <div className="relative z-10 p-5 text-white">
                      <p className="text-sm font-semibold mb-1">
                        Want to see more from {name}?
                      </p>
                      <p className="text-xs text-white/80 mb-4">
                        Explore related videos, reviews, and local content on
                        YouTube.
                      </p>
                      <a
                        href={youtubeSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold transition-all hover:bg-white/90"
                        style={{ color: theme.deep }}
                      >
                        <Youtube className="w-4 h-4" />
                        Search YouTube
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Photos / Gallery */}
              {allPhotos.length > 0 && (
                <div
                  className="rounded-2xl p-6 shadow-sm border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: `${theme.accent}33`,
                  }}
                >
                  <h2 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                    <span
                      className="h-6 w-1 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    Photos
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {allPhotos.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedPhoto(img)}
                        className="aspect-[4/3] rounded-lg overflow-hidden bg-white/5 cursor-zoom-in focus:outline-none focus:ring-2"
                        style={{ "--tw-ring-color": theme.accent }}
                        aria-label={`Open photo ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-5">
              {/* Contact Info */}
              <div
                className="rounded-2xl p-5 shadow-sm space-y-3 border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: `${theme.accent}33`,
                }}
              >
                <h3 className="font-headline text-base font-bold flex items-center gap-2">
                  <span
                    className="h-5 w-1 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  Contact Info
                </h3>

                {(address || city || location) && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60" />
                    <span className="font-sans opacity-70">
                      {[address, city].filter(Boolean).join(", ") || location}
                    </span>
                  </div>
                )}

                {phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 flex-shrink-0 opacity-60" />
                    <a
                      href={`tel:${phone}`}
                      className="font-sans opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {phone}
                    </a>
                  </div>
                )}

                {additionalPhones
                  .filter(Boolean)
                  .map((additionalPhone, index) => (
                    <div
                      key={`${additionalPhone}-${index}`}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0 opacity-60" />
                      <a
                        href={`tel:${additionalPhone}`}
                        className="font-sans opacity-70 hover:opacity-100 transition-opacity"
                      >
                        {additionalPhone}
                      </a>
                    </div>
                  ))}

                {email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 flex-shrink-0 opacity-60" />
                    <a
                      href={`mailto:${email}`}
                      className="font-sans opacity-70 hover:opacity-100 transition-opacity truncate text-xs"
                    >
                      {email}
                    </a>
                  </div>
                )}

                {website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 flex-shrink-0 opacity-60" />
                    <a
                      href={
                        website.startsWith("http")
                          ? website
                          : `https://${website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans hover:underline truncate text-xs"
                      style={{ color: theme.accentSoft }}
                    >
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}

                {(instagram || facebook || telegram || youtube) && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="font-sans text-xs font-semibold mb-2 opacity-80">
                      Follow us
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instagram && (
                        <a
                          href={instagram}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Instagram"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: `${theme.accent}26`,
                            color: theme.accentSoft,
                          }}
                        >
                          <Instagram className="w-4 h-4" />
                          Instagram
                        </a>
                      )}
                      {facebook && (
                        <a
                          href={facebook}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Facebook"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: `${theme.accent}26`,
                            color: theme.accentSoft,
                          }}
                        >
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </a>
                      )}
                      {telegram && (
                        <a
                          href={telegram}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Telegram"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: `${theme.accent}26`,
                            color: theme.accentSoft,
                          }}
                        >
                          <Send className="w-4 h-4" />
                          Telegram
                        </a>
                      )}
                      {youtube && (
                        <a
                          href={youtube}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="YouTube"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: `${theme.highlight}26`,
                            color: theme.highlight,
                          }}
                        >
                          <Youtube className="w-4 h-4" />
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Map */}
              {mapEmbedUrl && (
                <div
                  className="rounded-2xl p-5 shadow-sm border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: `${theme.highlight}40`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-headline text-base font-bold flex items-center gap-2">
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: theme.accent }}
                      />
                      Location
                    </h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        mapQuery,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: theme.accentSoft }}
                    >
                      Open map
                    </a>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <iframe
                      title={`${name} location map`}
                      src={mapEmbedUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}

              {/* Opening Hours */}
              {hoursList.length > 0 && (
                <div
                  className="min-h-[340px] rounded-2xl p-6 shadow-sm border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: `${theme.accent}33`,
                  }}
                >
                  <h3 className="font-headline text-base font-bold mb-3 flex items-center gap-2">
                    <Clock
                      className="w-4 h-4"
                      style={{ color: theme.accent }}
                    />
                    Opening Hours
                  </h3>
                  <div className="space-y-3">
                    {hoursList.map((h, i) => (
                      <div
                        key={i}
                        className="flex justify-between font-sans text-xs py-2 border-b border-white/10 last:border-0"
                      >
                        <span className="opacity-70">{h.day}</span>
                        <span className="font-semibold opacity-90">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

    <div
                className="rounded-2xl p-5 shadow-sm border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: `${theme.highlight}55`,
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${theme.highlight}26` }}
                  >
                    <Store
                      className="w-5 h-5"
                      style={{ color: theme.highlight }}
                    />
                  </div>
                  <div>
                    <h3 className="font-headline text-base font-bold leading-tight">
                      Business & products listing
                    </h3>
                    <p className="font-sans text-xs opacity-60 mt-1 leading-relaxed">
                      List your business and all your products so customers can
                      browse and reach you directly.
                    </p>
                  </div>
                </div>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 font-sans font-bold px-4 py-2.5 rounded-xl transition-all text-sm text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.deep} 0%, ${theme.accent} 100%)`,
                    boxShadow: `0 12px 24px -10px ${theme.accent}99`,
                  }}
                >
                  <Store className="w-4 h-4" />
                  Get the app
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>


              {/* CTA */}
             <div
  className="rounded-2xl min-h-[100px] px-5 py-5 flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
  style={{ background: templateConfig.gradient }}
>
  <p className="font-sans text-sm text-white/85 mb-3 relative z-10">
    Make your presence online.
  </p>

  <Link
    to={`/create${
      ownerReferralCode
        ? `?referral=${encodeURIComponent(ownerReferralCode)}`
        : ""
    }`}
    className="inline-flex items-center justify-center bg-white font-sans font-bold px-5 py-2 rounded-xl hover:bg-white/90 transition-all text-xs relative z-10"
    style={{ color: theme.deep }}
  >
    Create My Page
  </Link>
</div>
            </div>
          </div>

          {/* ---------- POWERED BY ---------- */}
          <div className="text-center mt-10 flex items-center justify-center gap-2 text-xs opacity-50 font-sans">
            <ShieldCheck
              className="w-3.5 h-3.5"
              style={{ color: theme.accentSoft }}
            />
            {verified ? "Verified by" : "Powered by"}{" "}
            <Link
              to="/"
              className="font-semibold hover:underline"
              style={{ color: theme.accentSoft }}
            >
              Zyphoriz
            </Link>
          </div>
        </div>

        {/* ---------- PHOTO LIGHTBOX ---------- */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded business photo"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close expanded photo"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Expanded business photo"
              className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
};
