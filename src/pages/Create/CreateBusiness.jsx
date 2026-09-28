// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import {
//   Store,
//   Phone,
//   Mail,
//   MapPin,
//   FileText,
//   Globe,
//   Instagram,
//   Facebook,
//   Youtube,
//   MessageCircle,
//   ArrowRight,
//   ShieldCheck,
//   Tag,
//   IndianRupee,
//   CheckCircle2,
//   Sparkles,
//   Image,
//   UploadCloud,
//   X,
//   Plus,
//   Images,
//   Clock,
// } from "lucide-react";
// import { useRegistration } from "../../context/RegistrationContext";
// import { useAuth } from "../../context/AuthContext";
// import { api } from "../../lib/api";
// import {
//   DEFAULT_TEMPLATE,
//   TEMPLATE_OPTIONS,
//   getTemplateConfig,
// } from "../../data/templates";

// const toSlug = (name) =>
//   name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");

// const isValidPhone = (phone) => {
//   const trimmedPhone = phone.trim();
//   const digitCount = trimmedPhone.replace(/\D/g, "").length;
//   return (
//     /^\+?[\d\s()-]+$/.test(trimmedPhone) && digitCount >= 10 && digitCount <= 15
//   );
// };

// const defaultOpeningHours = [
//   { day: "Monday", open: true, from: "09:00", to: "18:00" },
//   { day: "Tuesday", open: true, from: "09:00", to: "18:00" },
//   { day: "Wednesday", open: true, from: "09:00", to: "18:00" },
//   { day: "Thursday", open: true, from: "09:00", to: "18:00" },
//   { day: "Friday", open: true, from: "09:00", to: "18:00" },
//   { day: "Saturday", open: true, from: "09:00", to: "18:00" },
//   { day: "Sunday", open: false, from: "09:00", to: "18:00" },
// ];

// export const CreateBusiness = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { updateFormData } = useRegistration();
//   const editSlug = searchParams.get("edit");

//   const bannerInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const [form, setForm] = useState(() => ({
//     name: "The Awesome Bakery",
//     category: "",
//     phone: "+91 9876543210",
//     whatsapp: "+91 9876543210",
//     email: "hello@awesomebakery.com",
//     address: "123 Baker Street, Main Junction",
//     city: "Kochi",
//     location: "https://maps.google.com/?q=kochi",
//     description:
//       "We bake the best cakes and pastries in town. Freshly baked everyday with love and premium ingredients.",
//     website: "https://awesomebakery.com",
//     instagram: "",
//     facebook: "",
//     youtube: "",
//     video: "",
//     additionalPhones: ["", ""],
//     referralCode: searchParams.get("referral") || "",
//     bannerImage: null,
//     bannerFile: null,
//     galleryImages: [],
//     galleryFiles: [],
//     template: DEFAULT_TEMPLATE,
//     openingHours: defaultOpeningHours,
//   }));

//   const [categories, setCategories] = useState([]);
//   const [businessToEdit, setBusinessToEdit] = useState(null);
//   const [loadingEdit, setLoadingEdit] = useState(Boolean(editSlug));
//   const [editLoadError, setEditLoadError] = useState("");

//   useEffect(() => {
//     api.categories
//       .list()
//       .then(({ categories: items }) => setCategories(items || []))
//       .catch(() => {});
//     if (!editSlug) {
//       setLoadingEdit(false);
//       return undefined;
//     }

//     let isActive = true;
//     setLoadingEdit(true);
//     setBusinessToEdit(null);
//     setEditLoadError("");
//     api.businesses
//       .mine()
//       .then(({ businesses = [] }) => {
//         if (!isActive) return;
//         const match = businesses.find((business) => business.slug === editSlug);
//         if (!match) {
//           setEditLoadError(
//             "This business could not be found in your listings.",
//           );
//           return;
//         }

//         setBusinessToEdit(match);
//         setForm((current) => ({
//           ...current,
//           ...match,
//           category: match.categoryId || "",
//           categoryName: match.category || "",
//           bannerImage: match.image || match.coverImage || null,
//           galleryImages: match.gallery || [],
//           additionalPhones: [...(match.additionalPhones || []), "", ""].slice(
//             0,
//             2,
//           ),
//           openingHours: match.openingHours || defaultOpeningHours,
//         }));
//       })
//       .catch((error) => {
//         if (isActive) setEditLoadError(error.message);
//       })
//       .finally(() => {
//         if (isActive) setLoadingEdit(false);
//       });

//     return () => {
//       isActive = false;
//     };
//   }, [editSlug]);

//   const [errors, setErrors] = useState({});

//   const set = (field) => (e) =>
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));

//   const validate = () => {
//     const errs = {};
//     if (!form.name.trim()) errs.name = "Business name is required";
//     if (!form.phone.trim()) errs.phone = "Phone number is required";
//     else if (!isValidPhone(form.phone))
//       errs.phone = "Enter a valid phone number";
//     form.additionalPhones.forEach((phone, index) => {
//       if (phone.trim() && !isValidPhone(phone)) {
//         errs[`additionalPhone${index + 2}`] = "Enter a valid phone number";
//       }
//     });
//     if (!form.email.trim()) errs.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       errs.email = "Enter a valid email";
//     if (!form.address.trim()) errs.address = "Address is required";
//     if (!form.city.trim()) errs.city = "City / Town is required";
//     if (!form.description.trim()) errs.description = "Description is required";
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editSlug && !businessToEdit) return;
//     if (!validate()) return;
//     const slug = editSlug || toSlug(form.name);
//     const selectedCat = categories.find((c) => c.id === form.category);
//     if (editSlug && businessToEdit) {
//       const payload = new FormData();
//       const fields = {
//         name: form.name,
//         category: selectedCat?.name || "",
//         categoryId: form.category || "",
//         phone: form.phone,
//         whatsapp: form.whatsapp,
//         email: form.email,
//         website: form.website,
//         address: form.address,
//         city: form.city,
//         location: form.location,
//         description: form.description,
//         instagram: form.instagram,
//         facebook: form.facebook,
//         youtube: form.youtube,
//         video: form.video,
//         additionalPhones: JSON.stringify(
//           form.additionalPhones.filter((phone) => phone.trim()),
//         ),
//         template: form.template || DEFAULT_TEMPLATE,
//         openingHours: JSON.stringify(form.openingHours),
//       };
//       Object.entries(fields).forEach(([key, value]) =>
//         payload.append(key, value || ""),
//       );
//       if (form.bannerFile) payload.append("banner", form.bannerFile);
//       (form.galleryFiles || []).forEach((file) =>
//         payload.append("gallery", file),
//       );
//       try {
//         await api.businesses.update(businessToEdit._id, payload);
//         navigate("/dashboard");
//       } catch (error) {
//         setErrors({ submit: error.message });
//       }
//       return;
//     }
//     updateFormData({
//       ...form,
//       slug,
//       categoryName: selectedCat?.name || "",
//       selectedPlan: "standard",
//       planPrice: "₹499/yr",
//       template: form.template || DEFAULT_TEMPLATE,
//     });
//     // This goes to payment checkout since it's the CreateBusiness flow
//     navigate("/payment/checkout");
//   };

//   const handleBannerChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const preview = URL.createObjectURL(file);
//     setForm((prev) => ({ ...prev, bannerImage: preview, bannerFile: file }));
//   };

//   const removeBanner = () => {
//     setForm((prev) => ({ ...prev, bannerImage: null, bannerFile: null }));
//     if (bannerInputRef.current) bannerInputRef.current.value = "";
//   };

//   const handleGalleryChange = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((f) => URL.createObjectURL(f));
//     setForm((prev) => ({
//       ...prev,
//       galleryImages: [...prev.galleryImages, ...previews],
//       galleryFiles: [...prev.galleryFiles, ...files],
//     }));
//     if (galleryInputRef.current) galleryInputRef.current.value = "";
//   };

//   const removeGalleryImage = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       galleryImages: prev.galleryImages.filter((_, i) => i !== index),
//     }));
//   };

//   const updateHour = (index, field, value) => {
//     setForm((prev) => {
//       const updated = prev.openingHours.map((row, i) =>
//         i === index ? { ...row, [field]: value } : row,
//       );
//       return { ...prev, openingHours: updated };
//     });
//   };

//   const slug = form.name ? toSlug(form.name) : "";
//   const selectedTemplate = getTemplateConfig(form.template || DEFAULT_TEMPLATE);

//   if (loadingEdit) {
//     return (
//       <main className="px-4 py-20 text-center text-on-surface-variant">
//         Loading business details...
//       </main>
//     );
//   }

//   if (editSlug && !businessToEdit) {
//     return (
//       <main className="px-4 py-20 text-center text-on-surface-variant">
//         <p>{editLoadError || "Unable to load this business for editing."}</p>
//         <button
//           type="button"
//           onClick={() => navigate("/dashboard")}
//           className="mt-4 font-semibold text-secondary hover:underline"
//         >
//           Back to Dashboard
//         </button>
//       </main>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] relative overflow-hidden">
//       {/* Soft background wash — echoes the bunting-dot pattern from the Home hero, kept subtle here */}
//       <div
//         className="absolute inset-x-0 top-0 h-96 opacity-[0.07] pointer-events-none"
//         style={{
//           backgroundImage: `radial-gradient(#E8A23D 1.5px, transparent 1.5px)`,
//           backgroundSize: "24px 24px",
//         }}
//       />

//       <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 relative z-10">
//         {/* Header */}
//         <div className="text-center mb-8 bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] rounded-3xl px-6 py-10">
//           <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
//             <Sparkles className="w-3.5 h-3.5" />
//             Go live in minutes
//           </div>
//           <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-primary mb-2">
//             List Your Business
//           </h1>
//           <p className="font-sans text-sm text-on-primary/75 max-w-md mx-auto">
//             Get discovered by thousands of local customers. Fill in your details
//             below and go live today.
//           </p>
//         </div>

//         {/* What You Get */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
//           {[
//             {
//               icon: Globe,
//               label: "Your own business URL",
//               sub: "zyphoriz.in/{name}",
//               chip: "bg-secondary/10",
//               tint: "text-secondary",
//             },
//             {
//               icon: ShieldCheck,
//               label: "Verified Badge",
//               sub: "Trusted by customers",
//               chip: "bg-tertiary/10",
//               tint: "text-tertiary",
//             },
//             {
//               icon: Phone,
//               label: "Direct Call & WhatsApp",
//               sub: "Connect instantly",
//               chip: "bg-primary/10",
//               tint: "text-primary",
//             },
//           ].map(({ icon: Icon, label, sub, chip, tint }) => (
//             <div
//               key={label}
//               className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex items-start gap-3"
//             >
//               <div
//                 className={`w-8 h-8 rounded-lg ${chip} flex items-center justify-center flex-shrink-0`}
//               >
//                 <Icon className={`w-4 h-4 ${tint}`} />
//               </div>
//               <div>
//                 <p className="font-sans text-xs font-semibold text-on-surface">
//                   {label}
//                 </p>
//                 <p className="font-sans text-xs text-outline">{sub}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Template Picker */}
//         <div className="mb-8 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center justify-between gap-3 mb-4">
//             <div>
//               <p className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
//                 Template
//               </p>
//               <h2 className="font-headline text-xl font-bold text-on-surface">
//                 Choose your design
//               </h2>
//             </div>
//             <div className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
//               {selectedTemplate.name}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             {TEMPLATE_OPTIONS.map((template) => {
//               const isSelected =
//                 (form.template || DEFAULT_TEMPLATE) === template.id;
//               return (
//                 <button
//                   key={template.id}
//                   type="button"
//                   onClick={() =>
//                     setForm((prev) => ({ ...prev, template: template.id }))
//                   }
//                   className={`text-left rounded-2xl border p-3 transition-all ${
//                     isSelected
//                       ? "border-secondary bg-secondary/5 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.5)]"
//                       : "border-outline-variant/30 bg-background hover:border-secondary/40"
//                   }`}
//                 >
//                   <div
//                     className="h-20 rounded-xl mb-3"
//                     style={{ background: template.gradient }}
//                   />
//                   <div className="flex items-center justify-between gap-3">
//                     <div>
//                       <p className="font-sans text-sm font-bold text-on-surface">
//                         {template.name}
//                       </p>
//                       <p className="font-sans text-xs text-on-surface-variant">
//                         {template.description}
//                       </p>
//                     </div>
//                     {isSelected && (
//                       <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
//         >
//           {/* Business Name */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Business Name <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//               <input
//                 type="text"
//                 value={form.name}
//                 onChange={set("name")}
//                 placeholder="e.g. Malabar Bakery"
//                 className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                   errors.name
//                     ? "border-error"
//                     : "border-outline-variant focus:border-secondary"
//                 } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-xs text-error mt-1">{errors.name}</p>
//             )}
//             {slug && !errors.name && (
//               <p className="text-xs text-secondary mt-1 flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5" />
//                 Your URL:{" "}
//                 <span className="font-mono font-semibold">
//                   zyphoriz.in/{slug}
//                 </span>
//               </p>
//             )}
//           </div>

//           {/* Category */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Category <span className="text-on-surface-variant/70">(optional)</span>
//             </label>
//             <div className="relative">
//               <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//               <select
//                 value={form.category}
//                 onChange={set("category")}
//                 className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                   errors.category
//                     ? "border-error"
//                     : "border-outline-variant focus:border-secondary"
//                 } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none`}
//               >
//                 <option value="">Select a category...</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {errors.category && (
//               <p className="text-xs text-error mt-1">{errors.category}</p>
//             )}
//           </div>

//           {/* Phone & WhatsApp */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 Phone Number <span className="text-error">*</span>
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                 <input
//                   type="tel"
//                   value={form.phone}
//                   onChange={set("phone")}
//                   placeholder="+91 98470 12345"
//                   className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                     errors.phone
//                       ? "border-error"
//                       : "border-outline-variant focus:border-secondary"
//                   } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-xs text-error mt-1">{errors.phone}</p>
//               )}
//             </div>
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 WhatsApp Number{" "}
//                 <span className="text-outline font-normal">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//                 <input
//                   type="tel"
//                   value={form.whatsapp}
//                   onChange={set("whatsapp")}
//                   placeholder="+91 98470 12345"
//                   className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {form.additionalPhones.map((phone, index) => (
//               <div key={index}>
//                 <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                   Additional Phone {index + 2}{" "}
//                   <span className="text-outline font-normal">(Optional)</span>
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         additionalPhones: current.additionalPhones.map(
//                           (currentPhone, phoneIndex) =>
//                             phoneIndex === index
//                               ? event.target.value
//                               : currentPhone,
//                         ),
//                       }))
//                     }
//                     placeholder="+91 98470 12345"
//                     className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                       errors[`additionalPhone${index + 2}`]
//                         ? "border-error"
//                         : "border-outline-variant focus:border-secondary"
//                     } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//                   />
//                 </div>
//                 {errors[`additionalPhone${index + 2}`] && (
//                   <p className="text-xs text-error mt-1">
//                     {errors[`additionalPhone${index + 2}`]}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Email Address <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={set("email")}
//                 placeholder="info@yourbusiness.com"
//                 className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                   errors.email
//                     ? "border-error"
//                     : "border-outline-variant focus:border-secondary"
//                 } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-xs text-error mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Address & City */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 Address / Landmark <span className="text-error">*</span>
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                 <input
//                   type="text"
//                   value={form.address}
//                   onChange={set("address")}
//                   placeholder="Street, Near Landmark"
//                   className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                     errors.address
//                       ? "border-error"
//                       : "border-outline-variant focus:border-secondary"
//                   } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//                 />
//               </div>
//               {errors.address && (
//                 <p className="text-xs text-error mt-1">{errors.address}</p>
//               )}
//             </div>
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 City / Town <span className="text-error">*</span>
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//                 <input
//                   type="text"
//                   value={form.city}
//                   onChange={set("city")}
//                   placeholder="Kottakkal"
//                   className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                     errors.city
//                       ? "border-error"
//                       : "border-outline-variant focus:border-secondary"
//                   } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20`}
//                 />
//               </div>
//               {errors.city && (
//                 <p className="text-xs text-error mt-1">{errors.city}</p>
//               )}
//             </div>
//           </div>

//           {/* Location (Google Maps Link) */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Location Map Link{" "}
//               <span className="text-outline font-normal">(Optional)</span>
//             </label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//               <input
//                 type="text"
//                 value={form.location}
//                 onChange={set("location")}
//                 placeholder="Address or Google Maps URL"
//                 className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Business Description <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <FileText className="absolute left-3 top-3.5 w-4 h-4 text-secondary" />
//               <textarea
//                 rows={3}
//                 value={form.description}
//                 onChange={set("description")}
//                 placeholder="Describe your products, services, and what makes you special..."
//                 className={`w-full pl-10 pr-4 py-3 bg-background border ${
//                   errors.description
//                     ? "border-error"
//                     : "border-outline-variant focus:border-secondary"
//                 } rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none`}
//               />
//             </div>
//             {errors.description && (
//               <p className="text-xs text-error mt-1">{errors.description}</p>
//             )}
//           </div>

//           {/* Website (optional) */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Website{" "}
//               <span className="text-outline font-normal">(Optional)</span>
//             </label>
//             <div className="relative">
//               <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//               <input
//                 type="text"
//                 value={form.website}
//                 onChange={set("website")}
//                 placeholder="https://yourbusiness.com"
//                 className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//               />
//             </div>
//           </div>

//           {/* Referral (optional) */}
//           {/* Social links and video (optional) */}
//           <div className="pt-4 border-t border-outline-variant/20 space-y-4">
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 Social Media Links{" "}
//                 <span className="text-outline font-normal">(Optional)</span>
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 <div className="relative">
//                   <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                   <input
//                     type="url"
//                     value={form.instagram}
//                     onChange={set("instagram")}
//                     placeholder="Instagram URL"
//                     className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                   <input
//                     type="url"
//                     value={form.facebook}
//                     onChange={set("facebook")}
//                     placeholder="Facebook URL"
//                     className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//                   <input
//                     type="url"
//                     value={form.youtube}
//                     onChange={set("youtube")}
//                     placeholder="YouTube channel URL"
//                     className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//                 YouTube Video{" "}
//                 <span className="text-outline font-normal">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
//                 <input
//                   type="url"
//                   value={form.video}
//                   onChange={set("video")}
//                   placeholder="https://www.youtube.com/watch?v=..."
//                   className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//                 />
//               </div>
//               <p className="font-sans text-xs text-on-surface-variant mt-1">
//                 This video will play directly on your business page.
//               </p>
//             </div>
//           </div>

//           {/* Referral (optional) */}
//           <div>
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">
//               Referral Code{" "}
//               <span className="text-outline font-normal">(Optional)</span>
//             </label>
//             <div className="relative">
//               <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
//               <input
//                 type="text"
//                 value={form.referralCode}
//                 onChange={set("referralCode")}
//                 placeholder="e.g. NEX-ABCD-1234"
//                 className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant focus:border-secondary rounded-xl font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20"
//               />
//             </div>
//             <p className="font-sans text-xs text-on-surface-variant mt-1">
//               Enter a friend's code to support their referral reward.
//             </p>
//           </div>

//           {/* ── Opening Hours ──────────────────────────────────────── */}
//           <div className="pt-4 border-t border-outline-variant/20">
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide flex items-center gap-2 mb-2">
//               <span className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
//                 <Clock className="w-3.5 h-3.5 text-secondary" />
//               </span>
//               Opening Hours
//             </label>
//             <div className="rounded-xl border border-outline-variant/30 overflow-hidden">
//               <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 px-4 py-2 bg-surface-container text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
//                 <span>Day</span>
//                 <span>Opens At</span>
//                 <span>Closes At</span>
//                 <span>Status</span>
//               </div>

//               {form.openingHours.map((row, idx) => (
//                 <div
//                   key={row.day}
//                   className={`grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[140px_1fr_1fr_auto] gap-x-3 items-center px-4 py-2.5 border-t border-outline-variant/20 transition-colors ${
//                     !row.open ? "opacity-50" : ""
//                   }`}
//                 >
//                   <span className="font-sans text-sm font-semibold text-on-surface">
//                     {row.day}
//                   </span>
//                   <input
//                     type="time"
//                     disabled={!row.open}
//                     value={row.from}
//                     onChange={(e) => updateHour(idx, "from", e.target.value)}
//                     className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-secondary disabled:cursor-not-allowed w-full"
//                   />
//                   <input
//                     type="time"
//                     disabled={!row.open}
//                     value={row.to}
//                     onChange={(e) => updateHour(idx, "to", e.target.value)}
//                     className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 text-sm text-on-surface focus:outline-none focus:border-secondary disabled:cursor-not-allowed w-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => updateHour(idx, "open", !row.open)}
//                     className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
//                       row.open ? "bg-secondary" : "bg-outline-variant"
//                     }`}
//                     aria-label={`Toggle ${row.day}`}
//                   >
//                     <span
//                       className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
//                         row.open ? "translate-x-5" : "translate-x-0"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── Banner Image ───────────────────────────────────────── */}
//           <div className="pt-4 border-t border-outline-variant/20">
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide flex items-center gap-2 mb-1">
//               <span className="w-6 h-6 rounded-md bg-tertiary/10 flex items-center justify-center">
//                 <Image className="w-3.5 h-3.5 text-tertiary" />
//               </span>
//               Banner Image
//             </label>
//             <p className="font-sans text-xs text-on-surface-variant mb-4">
//               Upload a wide banner image that appears at the top of your
//               business profile. Recommended: 1200 × 400 px.
//             </p>

//             {form.bannerImage ? (
//               <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 group">
//                 <img
//                   src={form.bannerImage}
//                   alt="Banner preview"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                   <button
//                     type="button"
//                     onClick={() => bannerInputRef.current?.click()}
//                     className="bg-white/90 text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-white transition"
//                   >
//                     <UploadCloud className="w-4 h-4" /> Change
//                   </button>
//                   <button
//                     type="button"
//                     onClick={removeBanner}
//                     className="bg-error/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-error transition"
//                   >
//                     <X className="w-4 h-4" /> Remove
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => bannerInputRef.current?.click()}
//                 className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-outline-variant hover:border-tertiary hover:bg-tertiary/5 rounded-xl py-10 transition-colors cursor-pointer group"
//               >
//                 <UploadCloud className="w-10 h-10 text-outline-variant group-hover:text-tertiary transition-colors" />
//                 <div className="text-center">
//                   <p className="font-sans text-sm font-semibold text-on-surface">
//                     Click to upload banner
//                   </p>
//                   <p className="font-sans text-xs text-on-surface-variant mt-0.5">
//                     PNG, JPG, WEBP up to 5 MB
//                   </p>
//                 </div>
//               </button>
//             )}

//             <input
//               ref={bannerInputRef}
//               id="bannerImage"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleBannerChange}
//             />
//           </div>

//           {/* ── Gallery Images ─────────────────────────────────────── */}
//           <div className="pt-4 border-t border-outline-variant/20">
//             <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wide flex items-center gap-2 mb-1">
//               <span className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
//                 <Images className="w-3.5 h-3.5 text-secondary" />
//               </span>
//               Photo Gallery
//             </label>
//             <p className="font-sans text-xs text-on-surface-variant mb-4">
//               Add multiple photos of your business — interior, products, or
//               team. Businesses with photos get 3× more views.
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {(form.galleryImages || []).map((src, idx) => (
//                 <div
//                   key={idx}
//                   className="relative group rounded-xl overflow-hidden aspect-square border border-outline-variant/30"
//                 >
//                   <img
//                     src={src}
//                     alt={`Gallery ${idx + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeGalleryImage(idx)}
//                     className="absolute top-1.5 right-1.5 bg-error text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
//                   >
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => galleryInputRef.current?.click()}
//                 className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-outline-variant hover:border-secondary hover:bg-secondary/5 rounded-xl aspect-square transition-colors cursor-pointer group"
//               >
//                 <Plus className="w-7 h-7 text-outline-variant group-hover:text-secondary transition-colors" />
//                 <span className="text-xs text-on-surface-variant group-hover:text-secondary font-semibold">
//                   Add Photo
//                 </span>
//               </button>
//             </div>

//             <input
//               ref={galleryInputRef}
//               id="galleryImages"
//               type="file"
//               accept="image/*"
//               multiple
//               className="hidden"
//               onChange={handleGalleryChange}
//             />
//           </div>

//           {/* Submit */}
//           <div className="pt-6 border-t border-outline-variant/20">
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-sans font-bold py-4 rounded-xl hover:bg-secondary/90 active:scale-[0.98] transition-all text-base shadow-md"
//             >
//               {editSlug ? "Save Changes" : "Proceed to Pay ₹499"}
//               {!editSlug && <ArrowRight className="w-5 h-5" />}
//             </button>
//             <p className="text-center font-sans text-xs text-outline mt-3">
//               🔒 Secure payment · ₹499 one-time per year · No hidden charges
//             </p>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };



import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Store,
  Phone,
  Mail,
  MapPin,
  FileText,
  Globe,
  Instagram,
  Facebook,
  Youtube,
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
  ChevronDown,
  Circle,
} from "lucide-react";
import { useRegistration } from "../../context/RegistrationContext";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import {
  DEFAULT_TEMPLATE,
  TEMPLATE_OPTIONS,
  getTemplateConfig,
} from "../../data/templates";

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

const toSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const isValidPhone = (phone) => {
  const trimmedPhone = phone.trim();
  const digitCount = trimmedPhone.replace(/\D/g, "").length;
  return (
    /^\+?[\d\s()-]+$/.test(trimmedPhone) && digitCount >= 10 && digitCount <= 15
  );
};

const defaultOpeningHours = [
  { day: "Monday", open: true, from: "09:00", to: "18:00" },
  { day: "Tuesday", open: true, from: "09:00", to: "18:00" },
  { day: "Wednesday", open: true, from: "09:00", to: "18:00" },
  { day: "Thursday", open: true, from: "09:00", to: "18:00" },
  { day: "Friday", open: true, from: "09:00", to: "18:00" },
  { day: "Saturday", open: true, from: "09:00", to: "18:00" },
  { day: "Sunday", open: false, from: "09:00", to: "18:00" },
];

/* Shared field styling — one source of truth keeps every input consistent */
const fieldClass = (hasError, extra = "") =>
  [
    "w-full rounded-xl border bg-background py-3 pl-10 pr-4",
    "font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50",
    "transition-colors focus:outline-none focus:ring-4",
    hasError
      ? "border-error focus:border-error focus:ring-error/10"
      : "border-outline-variant hover:border-outline focus:border-secondary focus:ring-secondary/10",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

const ICON =
  "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/70";
const ICON_TOP = "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-on-surface-variant/70";

const LABEL =
  "font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant";

/* ─────────────────────────────────────────────────────────────
   Presentational primitives (module scope → stable identity)
   ───────────────────────────────────────────────────────────── */

const Section = ({ icon: Icon, title, description, children, aside }) => (
  <section className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:p-7">
    <header className="mb-5 flex items-start gap-3.5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-inset ring-secondary/15">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-headline text-lg font-bold leading-tight text-on-surface">
            {title}
          </h2>
          {aside}
        </div>
        {description && (
          <p className="mt-1 font-sans text-xs leading-relaxed text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
    </header>
    <div className="space-y-5">{children}</div>
  </section>
);

const Field = ({ label, required, optional, error, hint, children, className = "" }) => (
  <div className={className}>
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label className={LABEL}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      {optional && (
        <span className="font-sans text-[11px] font-medium text-outline">
          Optional
        </span>
      )}
    </div>
    {children}
    {error ? (
      <p className="mt-1.5 font-sans text-xs font-medium text-error">{error}</p>
    ) : hint ? (
      hint
    ) : null}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Screen
   ───────────────────────────────────────────────────────────── */

export const CreateBusiness = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateFormData } = useRegistration();
  const editSlug = searchParams.get("edit");

  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [form, setForm] = useState(() => ({
    name: "The Awesome Bakery",
    category: "",
    phone: "+91 9876543210",
    whatsapp: "+91 9876543210",
    email: "hello@awesomebakery.com",
    address: "123 Baker Street, Main Junction",
    city: "Kochi",
    location: "https://maps.google.com/?q=kochi",
    description:
      "We bake the best cakes and pastries in town. Freshly baked everyday with love and premium ingredients.",
    website: "https://awesomebakery.com",
    instagram: "",
    facebook: "",
    youtube: "",
    video: "",
    additionalPhones: ["", ""],
    referralCode: searchParams.get("referral") || "",
    bannerImage: null,
    bannerFile: null,
    galleryImages: [],
    galleryFiles: [],
    template: DEFAULT_TEMPLATE,
    openingHours: defaultOpeningHours,
  }));

  const [categories, setCategories] = useState([]);
  const [businessToEdit, setBusinessToEdit] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(Boolean(editSlug));
  const [editLoadError, setEditLoadError] = useState("");

  useEffect(() => {
    api.categories
      .list()
      .then(({ categories: items }) => setCategories(items || []))
      .catch(() => {});
    if (!editSlug) {
      setLoadingEdit(false);
      return undefined;
    }

    let isActive = true;
    setLoadingEdit(true);
    setBusinessToEdit(null);
    setEditLoadError("");
    api.businesses
      .mine()
      .then(({ businesses = [] }) => {
        if (!isActive) return;
        const match = businesses.find((business) => business.slug === editSlug);
        if (!match) {
          setEditLoadError(
            "This business could not be found in your listings.",
          );
          return;
        }

        setBusinessToEdit(match);
        setForm((current) => ({
          ...current,
          ...match,
          category: match.categoryId || "",
          categoryName: match.category || "",
          bannerImage: match.image || match.coverImage || null,
          galleryImages: match.gallery || [],
          additionalPhones: [...(match.additionalPhones || []), "", ""].slice(
            0,
            2,
          ),
          openingHours: match.openingHours || defaultOpeningHours,
        }));
      })
      .catch((error) => {
        if (isActive) setEditLoadError(error.message);
      })
      .finally(() => {
        if (isActive) setLoadingEdit(false);
      });

    return () => {
      isActive = false;
    };
  }, [editSlug]);

  const [errors, setErrors] = useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Business name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!isValidPhone(form.phone))
      errs.phone = "Enter a valid phone number";
    form.additionalPhones.forEach((phone, index) => {
      if (phone.trim() && !isValidPhone(phone)) {
        errs[`additionalPhone${index + 2}`] = "Enter a valid phone number";
      }
    });
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City / Town is required";
    if (!form.description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSlug && !businessToEdit) return;
    if (!validate()) return;
    const slug = editSlug || toSlug(form.name);
    const selectedCat = categories.find((c) => c.id === form.category);
    if (editSlug && businessToEdit) {
      const payload = new FormData();
      const fields = {
        name: form.name,
        category: selectedCat?.name || "",
        categoryId: form.category || "",
        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,
        website: form.website,
        address: form.address,
        city: form.city,
        location: form.location,
        description: form.description,
        instagram: form.instagram,
        facebook: form.facebook,
        youtube: form.youtube,
        video: form.video,
        additionalPhones: JSON.stringify(
          form.additionalPhones.filter((phone) => phone.trim()),
        ),
        template: form.template || DEFAULT_TEMPLATE,
        openingHours: JSON.stringify(form.openingHours),
      };
      Object.entries(fields).forEach(([key, value]) =>
        payload.append(key, value || ""),
      );
      if (form.bannerFile) payload.append("banner", form.bannerFile);
      (form.galleryFiles || []).forEach((file) =>
        payload.append("gallery", file),
      );
      try {
        await api.businesses.update(businessToEdit._id, payload);
        navigate("/dashboard");
      } catch (error) {
        setErrors({ submit: error.message });
      }
      return;
    }
    updateFormData({
      ...form,
      slug,
      categoryName: selectedCat?.name || "",
      selectedPlan: "standard",
      planPrice: "₹499/yr",
      template: form.template || DEFAULT_TEMPLATE,
    });
    // This goes to payment checkout since it's the CreateBusiness flow
    navigate("/payment/checkout");
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, bannerImage: preview, bannerFile: file }));
  };

  const removeBanner = () => {
    setForm((prev) => ({ ...prev, bannerImage: null, bannerFile: null }));
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...previews],
      galleryFiles: [...prev.galleryFiles, ...files],
    }));
    if (galleryInputRef.current) galleryInputRef.current.value = "";
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
        i === index ? { ...row, [field]: value } : row,
      );
      return { ...prev, openingHours: updated };
    });
  };

  const slug = form.name ? toSlug(form.name) : "";
  const selectedTemplate = getTemplateConfig(form.template || DEFAULT_TEMPLATE);

  if (loadingEdit) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] px-4 text-on-primary">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3.5 backdrop-blur-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span className="font-sans text-sm">Loading business details…</span>
        </div>
      </main>
    );
  }

  if (editSlug && !businessToEdit) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] px-4 text-center text-on-primary">
        <p className="font-sans text-sm text-on-primary/80">
          {editLoadError || "Unable to load this business for editing."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-5 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  /* Live-preview derived values */
  const initials =
    (form.name || "B")
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "B";

  const categoryLabel =
    categories.find((c) => c.id === form.category)?.name ||
    form.categoryName ||
    "Category";

  const checklist = [
    { label: "Business name", done: Boolean(form.name.trim()) },
    {
      label: "Contact details",
      done: Boolean(form.phone.trim() && form.email.trim()),
    },
    {
      label: "Address & city",
      done: Boolean(form.address.trim() && form.city.trim()),
    },
    { label: "Description", done: Boolean(form.description.trim()) },
    { label: "Banner image", done: Boolean(form.bannerImage) },
    {
      label: "Gallery photos",
      done: (form.galleryImages || []).length > 0,
    },
  ];
  const completed = checklist.filter((c) => c.done).length;
  const progress = Math.round((completed / checklist.length) * 100);

  const benefits = [
    { icon: Globe, label: "Your own business URL" },
    { icon: ShieldCheck, label: "Verified badge" },
    { icon: Phone, label: "Direct call & WhatsApp" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)]">
      {/* Soft background wash — echoes the bunting-dot pattern from the Home hero, kept subtle here */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(#E8A23D 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* ── Hero ───────────────────────────────────────────── */}
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Go live in minutes
            </span>
          </div>

          <h1 className="font-headline text-3xl font-bold leading-tight text-white md:text-[2.75rem]">
            {editSlug ? "Edit your business" : "List your business"}
          </h1>

          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-white/70 md:text-base">
            {editSlug
              ? "Update your details and save your changes — they go live instantly."
              : "Get discovered by thousands of local customers. Fill in your details below and go live today."}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {benefits.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-secondary" />
                <span className="font-sans text-xs font-medium text-white/85">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* ── Left column: the form ──────────────────────── */}
            <div className="space-y-6">
              {/* Template Picker */}
              <section className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:p-7">
                <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-inset ring-secondary/15">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="font-headline text-lg font-bold leading-tight text-on-surface">
                        Choose your design
                      </h2>
                      <p className="mt-1 font-sans text-xs text-on-surface-variant">
                        You can switch templates anytime later.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary/10 px-3 py-1.5 font-sans text-xs font-bold text-secondary">
                    {selectedTemplate.name}
                  </span>
                </header>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {TEMPLATE_OPTIONS.map((template) => {
                    const isSelected =
                      (form.template || DEFAULT_TEMPLATE) === template.id;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            template: template.id,
                          }))
                        }
                        className={`group text-left rounded-2xl border p-3 transition-all ${
                          isSelected
                            ? "border-secondary bg-secondary/5 shadow-[0_12px_28px_-20px_rgba(0,0,0,0.6)]"
                            : "border-outline-variant/40 bg-background hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_12px_28px_-22px_rgba(0,0,0,0.55)]"
                        }`}
                      >
                        <div
                          className="mb-3 h-20 rounded-xl ring-1 ring-inset ring-black/5"
                          style={{ background: template.gradient }}
                        />
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-sans text-sm font-bold text-on-surface">
                              {template.name}
                            </p>
                            <p className="mt-0.5 font-sans text-xs leading-snug text-on-surface-variant">
                              {template.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 1 — Business identity */}
              <Section
                icon={Store}
                title="Business details"
                description="The essentials customers see first."
              >
                <Field
                  label="Business name"
                  required
                  error={errors.name}
                  hint={
                    slug && !errors.name ? (
                      <p className="mt-1.5 flex items-center gap-1.5 font-sans text-xs text-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Your URL:{" "}
                        <span className="font-mono font-semibold">
                          zyphoriz.in/{slug}
                        </span>
                      </p>
                    ) : null
                  }
                >
                  <div className="relative">
                    <Store className={ICON} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="e.g. Malabar Bakery"
                      className={fieldClass(errors.name)}
                    />
                  </div>
                </Field>

                <Field label="Category" optional error={errors.category}>
                  <div className="relative">
                    <Tag className={ICON} />
                    <select
                      value={form.category}
                      onChange={set("category")}
                      className={fieldClass(
                        errors.category,
                        "appearance-none pr-10",
                      )}
                    >
                      <option value="">Select a category…</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                  </div>
                </Field>

                <Field
                  label="Business description"
                  required
                  error={errors.description}
                >
                  <div className="relative">
                    <FileText className={ICON_TOP} />
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={set("description")}
                      placeholder="Describe your products, services, and what makes you special…"
                      className={fieldClass(
                        errors.description,
                        "resize-none leading-relaxed",
                      )}
                    />
                  </div>
                </Field>
              </Section>

              {/* 2 — Contact */}
              <Section
                icon={Phone}
                title="Contact details"
                description="How customers reach you. Phone and email are required."
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Phone number" required error={errors.phone}>
                    <div className="relative">
                      <Phone className={ICON} />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 98470 12345"
                        className={fieldClass(errors.phone)}
                      />
                    </div>
                  </Field>

                  <Field label="WhatsApp number" optional>
                    <div className="relative">
                      <MessageCircle className={ICON} />
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={set("whatsapp")}
                        placeholder="+91 98470 12345"
                        className={fieldClass(false)}
                      />
                    </div>
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {form.additionalPhones.map((phone, index) => (
                    <Field
                      key={index}
                      label={`Additional phone ${index + 2}`}
                      optional
                      error={errors[`additionalPhone${index + 2}`]}
                    >
                      <div className="relative">
                        <Phone className={ICON} />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              additionalPhones: current.additionalPhones.map(
                                (currentPhone, phoneIndex) =>
                                  phoneIndex === index
                                    ? event.target.value
                                    : currentPhone,
                              ),
                            }))
                          }
                          placeholder="+91 98470 12345"
                          className={fieldClass(
                            errors[`additionalPhone${index + 2}`],
                          )}
                        />
                      </div>
                    </Field>
                  ))}
                </div>

                <Field label="Email address" required error={errors.email}>
                  <div className="relative">
                    <Mail className={ICON} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="info@yourbusiness.com"
                      className={fieldClass(errors.email)}
                    />
                  </div>
                </Field>
              </Section>

              {/* 3 — Location */}
              <Section
                icon={MapPin}
                title="Location"
                description="Help customers find you on the map."
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Address / Landmark" required error={errors.address}>
                    <div className="relative">
                      <MapPin className={ICON} />
                      <input
                        type="text"
                        value={form.address}
                        onChange={set("address")}
                        placeholder="Street, near landmark"
                        className={fieldClass(errors.address)}
                      />
                    </div>
                  </Field>

                  <Field label="City / Town" required error={errors.city}>
                    <div className="relative">
                      <MapPin className={ICON} />
                      <input
                        type="text"
                        value={form.city}
                        onChange={set("city")}
                        placeholder="Kottakkal"
                        className={fieldClass(errors.city)}
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Location map link" optional>
                  <div className="relative">
                    <MapPin className={ICON} />
                    <input
                      type="text"
                      value={form.location}
                      onChange={set("location")}
                      placeholder="Google Maps URL"
                      className={fieldClass(false)}
                    />
                  </div>
                </Field>
              </Section>

              {/* 4 — Online presence */}
              <Section
                icon={Globe}
                title="Online presence"
                description="All of these are optional — add what you have."
              >
                <Field label="Website" optional>
                  <div className="relative">
                    <Globe className={ICON} />
                    <input
                      type="text"
                      value={form.website}
                      onChange={set("website")}
                      placeholder="https://yourbusiness.com"
                      className={fieldClass(false)}
                    />
                  </div>
                </Field>

                <div>
                  <p className={`${LABEL} mb-2.5`}>Social media links</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="relative">
                      <Instagram className={ICON} />
                      <input
                        type="url"
                        value={form.instagram}
                        onChange={set("instagram")}
                        placeholder="Instagram"
                        className={fieldClass(false, "pr-3")}
                      />
                    </div>
                    <div className="relative">
                      <Facebook className={ICON} />
                      <input
                        type="url"
                        value={form.facebook}
                        onChange={set("facebook")}
                        placeholder="Facebook"
                        className={fieldClass(false, "pr-3")}
                      />
                    </div>
                    <div className="relative">
                      <Youtube className={ICON} />
                      <input
                        type="url"
                        value={form.youtube}
                        onChange={set("youtube")}
                        placeholder="YouTube"
                        className={fieldClass(false, "pr-3")}
                      />
                    </div>
                  </div>
                </div>

                <Field
                  label="YouTube video"
                  optional
                  hint={
                    <p className="mt-1.5 font-sans text-xs text-on-surface-variant">
                      This video will play directly on your business page.
                    </p>
                  }
                >
                  <div className="relative">
                    <Youtube className={ICON} />
                    <input
                      type="url"
                      value={form.video}
                      onChange={set("video")}
                      placeholder="https://www.youtube.com/watch?v=…"
                      className={fieldClass(false)}
                    />
                  </div>
                </Field>
              </Section>

              {/* 5 — Opening hours */}
              <Section
                icon={Clock}
                title="Opening hours"
                description="Toggle a day off if you're closed."
              >
                <div className="overflow-hidden rounded-xl border border-outline-variant/40">
                  <div className="hidden grid-cols-[140px_1fr_1fr_auto] gap-x-3 bg-surface-container px-4 py-2.5 sm:grid">
                    <span className={LABEL}>Day</span>
                    <span className={LABEL}>Opens at</span>
                    <span className={LABEL}>Closes at</span>
                    <span className={LABEL}>Open</span>
                  </div>

                  {form.openingHours.map((row, idx) => (
                    <div
                      key={row.day}
                      className={`grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 border-t border-outline-variant/20 px-4 py-2.5 transition-colors first:border-t-0 sm:grid-cols-[140px_1fr_1fr_auto] sm:first:border-t ${
                        row.open ? "bg-transparent" : "bg-surface-container/40"
                      }`}
                    >
                      <span
                        className={`font-sans text-sm font-semibold ${
                          row.open
                            ? "text-on-surface"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {row.day}
                      </span>
                      <input
                        type="time"
                        disabled={!row.open}
                        value={row.from}
                        onChange={(e) => updateHour(idx, "from", e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface-container px-2 py-1.5 font-sans text-sm text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/15 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <input
                        type="time"
                        disabled={!row.open}
                        value={row.to}
                        onChange={(e) => updateHour(idx, "to", e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface-container px-2 py-1.5 font-sans text-sm text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/15 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => updateHour(idx, "open", !row.open)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
                          row.open ? "bg-secondary" : "bg-outline-variant"
                        }`}
                        aria-label={`Toggle ${row.day}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                            row.open ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Section>

              {/* 6 — Media */}
              <Section
                icon={Images}
                title="Photos & media"
                description="Listings with photos get up to 3× more views."
              >
                {/* Banner */}
                <div>
                  <p className={`${LABEL} mb-1`}>Banner image</p>
                  <p className="mb-3.5 font-sans text-xs text-on-surface-variant">
                    Wide image shown at the top of your profile. Recommended
                    1200 × 400 px.
                  </p>

                  {form.bannerImage ? (
                    <div className="group relative overflow-hidden rounded-xl border border-outline-variant/40">
                      <img
                        src={form.bannerImage}
                        alt="Banner preview"
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => bannerInputRef.current?.click()}
                          className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 font-sans text-xs font-semibold text-on-surface transition hover:bg-white"
                        >
                          <UploadCloud className="h-4 w-4" /> Change
                        </button>
                        <button
                          type="button"
                          onClick={removeBanner}
                          className="flex items-center gap-1.5 rounded-full bg-error/90 px-3.5 py-1.5 font-sans text-xs font-semibold text-white transition hover:bg-error"
                        >
                          <X className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current?.click()}
                      className="group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-outline-variant py-10 transition-colors hover:border-tertiary hover:bg-tertiary/5"
                    >
                      <UploadCloud className="h-9 w-9 text-outline-variant transition-colors group-hover:text-tertiary" />
                      <div className="text-center">
                        <p className="font-sans text-sm font-semibold text-on-surface">
                          Click to upload banner
                        </p>
                        <p className="mt-0.5 font-sans text-xs text-on-surface-variant">
                          PNG, JPG, WEBP up to 5 MB
                        </p>
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

                {/* Gallery */}
                <div className="border-t border-outline-variant/20 pt-5">
                  <p className={`${LABEL} mb-1`}>Photo gallery</p>
                  <p className="mb-3.5 font-sans text-xs text-on-surface-variant">
                    Interior, products, or team — add as many as you like.
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {(form.galleryImages || []).map((src, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-outline-variant/40"
                      >
                        <img
                          src={src}
                          alt={`Gallery ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-error text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                          aria-label={`Remove photo ${idx + 1}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant transition-colors hover:border-secondary hover:bg-secondary/5"
                    >
                      <Plus className="h-7 w-7 text-outline-variant transition-colors group-hover:text-secondary" />
                      <span className="font-sans text-xs font-semibold text-on-surface-variant transition-colors group-hover:text-secondary">
                        Add photo
                      </span>
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
                </div>
              </Section>

              {/* 7 — Referral */}
              <Section
                icon={Tag}
                title="Referral code"
                description="Have a friend's code? Enter it to support their reward."
              >
                <div className="relative">
                  <Tag className={ICON} />
                  <input
                    type="text"
                    value={form.referralCode}
                    onChange={set("referralCode")}
                    placeholder="e.g. NEX-ABCD-1234"
                    className={fieldClass(false, "font-mono tracking-wide")}
                  />
                </div>
              </Section>

              {/* ── Submit ──────────────────────────────────── */}
              <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:p-6">
                {errors.submit && (
                  <p className="mb-3 rounded-lg bg-error/10 px-3.5 py-2.5 font-sans text-xs font-medium text-error">
                    {errors.submit}
                  </p>
                )}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-sans text-base font-bold text-on-secondary shadow-lg shadow-secondary/25 transition-all hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99]"
                >
                  {editSlug ? "Save changes" : "Proceed to pay ₹499"}
                  {!editSlug && (
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
                <p className="mt-3 text-center font-sans text-xs text-outline">
                  🔒 Secure payment · ₹499 one-time per year · No hidden charges
                </p>
              </div>
            </div>

            {/* ── Right column: sticky preview (desktop) ────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-4">
                {/* Completion */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
                      Profile completion
                    </p>
                    <span className="font-sans text-sm font-bold text-white">
                      {progress}%
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-secondary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <ul className="mt-4 space-y-2">
                    {checklist.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-2.5 font-sans text-xs"
                      >
                        {item.done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-white/30" />
                        )}
                        <span
                          className={
                            item.done ? "text-white/80" : "text-white/50"
                          }
                        >
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live preview card */}
                <div className="overflow-hidden rounded-2xl border border-black/5 bg-surface-container-lowest shadow-2xl shadow-black/20">
                  <div className="relative h-28 w-full">
                    {form.bannerImage ? (
                      <img
                        src={form.bannerImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{ background: selectedTemplate.gradient }}
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                      Live preview
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="-mt-9 mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-surface-container-lowest bg-secondary font-headline text-lg font-bold text-on-secondary shadow-md">
                      {initials}
                    </div>

                    <h3 className="truncate font-headline text-base font-bold text-on-surface">
                      {form.name || "Your business name"}
                    </h3>
                    <p className="mt-0.5 truncate font-sans text-xs text-on-surface-variant">
                      {categoryLabel} · {form.city || "City"}
                    </p>

                    <p className="mt-2.5 line-clamp-2 font-sans text-xs leading-relaxed text-on-surface-variant">
                      {form.description ||
                        "Your description will appear here once you add it."}
                    </p>

                    <div className="mt-3.5 truncate rounded-lg bg-surface-container px-3 py-2 font-mono text-[11px] text-secondary">
                      zyphoriz.in/{slug || "your-business"}
                    </div>

                    <div className="mt-3.5 flex items-center gap-2 border-t border-outline-variant/30 pt-3.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/10">
                        <Phone className="h-3.5 w-3.5 text-secondary" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-tertiary/10">
                        <MessageCircle className="h-3.5 w-3.5 text-tertiary" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="ml-auto font-sans text-[10px] font-semibold uppercase tracking-wider text-outline">
                        {selectedTemplate.name}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="px-1 font-sans text-[11px] leading-relaxed text-white/50">
                  This is an approximate preview. Your final page uses the
                  selected template's full layout.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
};