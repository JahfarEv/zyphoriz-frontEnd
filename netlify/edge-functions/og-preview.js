// const API_BASE_URL = 'https://api.zyphoriz.com';
// const SITE_URL = 'https://zyphoriz.com';
// const FALLBACK_IMAGE = `${SITE_URL}/image/Zyphoriz%201.png`;
// const SOCIAL_CRAWLER =
//   /(facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|Slackbot|SkypeUriPreview|Pinterest|redditbot)/i;

// const escapeHtml = (value) =>
//   String(value)
//     .replace(/&/g, '&amp;')
//     .replace(/"/g, '&quot;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;');

// const getAbsoluteImageUrl = (image) => {
//   if (!image) return FALLBACK_IMAGE;

//   try {
//     const url = new URL(image, SITE_URL);
//     return ['http:', 'https:'].includes(url.protocol) ? url.href : FALLBACK_IMAGE;
//   } catch {
//     return FALLBACK_IMAGE;
//   }
// };

// // const getSocialImageUrl = (image) => {
// //   const url = new URL(getAbsoluteImageUrl(image));
// //   if (url.hostname === 'res.cloudinary.com' && url.pathname.includes('/image/upload/')) {
// //     url.pathname = url.pathname.replace(
// //       '/image/upload/',
// //       '/image/upload/c_fill,w_1200,h_630,g_auto,q_auto/',
// //     );
// //     return { url: url.href, dimensions: { width: 1200, height: 630 } };
// //   }
// //   return { url: url.href, dimensions: null };
// // };

// const getSocialImageUrl = (image) => {
//   const url = new URL(getAbsoluteImageUrl(image));

//   // Force Cloudinary images into WhatsApp/Facebook recommended
//   // large-preview dimensions: 1200 x 630 (1.91:1)
//   if (
//     url.hostname === 'res.cloudinary.com' &&
//     url.pathname.includes('/image/upload/')
//   ) {
//     url.pathname = url.pathname.replace(
//       '/image/upload/',
//       '/image/upload/c_fill,w_1200,h_630,g_auto,q_auto,f_jpg/'
//     );

//     // return {
//     //   url: url.href,
//     //   dimensions: {
//     //     width: 1200,
//     //     height: 630,
//     //   },
//     // };


//     const transformedUrl = url.href;

// return {
//   url: `${transformedUrl}?v=2`,
//   dimensions: {
//     width: 1200,
//     height: 630,
//   },
// };
//   }

//   return {
//     url: url.href,
//     dimensions: null,
//   };
// };


// const renderMetadata = ({ title, description, url, image, imageDimensions }) => `<!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>${escapeHtml(title)}</title>
//     <meta name="description" content="${escapeHtml(description)}">
//     <link rel="canonical" href="${escapeHtml(url)}">
//     <link rel="icon" href="${escapeHtml(image)}">
//     <meta property="og:type" content="website">
//     <meta property="og:title" content="${escapeHtml(title)}">
//     <meta property="og:description" content="${escapeHtml(description)}">
//     <meta property="og:url" content="${escapeHtml(url)}">
//     <meta property="og:image" content="${escapeHtml(image)}">
// <meta property="og:image:secure_url" content="${escapeHtml(image)}">
// <meta property="og:image:type" content="image/jpeg">
// <meta property="og:image:alt" content="${escapeHtml(title)}">

// ${imageDimensions ? `
// <meta property="og:image:width" content="${imageDimensions.width}">
// <meta property="og:image:height" content="${imageDimensions.height}">
// ` : ''}
//     ${imageDimensions ? `<meta property="og:image:width" content="${imageDimensions.width}">\n    <meta property="og:image:height" content="${imageDimensions.height}">` : ''}
//     <meta name="twitter:card" content="summary_large_image">
//     <meta name="twitter:title" content="${escapeHtml(title)}">
//     <meta name="twitter:description" content="${escapeHtml(description)}">
//     <meta name="twitter:image" content="${escapeHtml(image)}">
//   </head>
//   <body><a href="${escapeHtml(url)}">${escapeHtml(title)}</a></body>
// </html>`;

// export default async (request, context) => {
//   const userAgent = request.headers.get('user-agent') || '';
//   if (!SOCIAL_CRAWLER.test(userAgent)) return context.next();

//   const { pathname } = new URL(request.url);
//   const slug = pathname.slice(1);
//   if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
//     return new Response('A valid business slug is required.', { status: 400 });
//   }

//   let response;
//   try {
//     response = await fetch(
//       `${API_BASE_URL}/api/v1/businesses/slug/${encodeURIComponent(slug)}`,
//     );
//   } catch {
//     return new Response('Unable to load business page metadata.', { status: 502 });
//   }

//   if (!response.ok) {
//     return new Response(
//       response.status === 404 ? 'Business page not found.' : 'Unable to load business page metadata.',
//       { status: response.status === 404 ? 404 : 502 },
//     );
//   }

//   let payload;
//   try {
//     payload = await response.json();
//   } catch {
//     return new Response('Business API returned an invalid response.', { status: 502 });
//   }

//   const business = payload?.data?.business;
//   if (!payload?.success || !business) {
//     return new Response('Business API returned an invalid response.', { status: 502 });
//   }

//   const canonicalUrl = `${SITE_URL}/${encodeURIComponent(business.slug || slug)}`;
//   const description = business.description
//     || business.descriptionSections?.[0]?.description
//     || `Discover ${business.name} on Zyphoriz.`;
//   const socialImage = getSocialImageUrl(
//     business.coverImage || business.bannerImage || business.image,
//   );

//   return new Response(renderMetadata({
//     title: `${business.name} | Zyphoriz`,
//     description,
//     url: canonicalUrl,
//     image: socialImage.url,
//     imageDimensions: socialImage.dimensions,
//   }), {
//     status: 200,
//     headers: {
//       'content-type': 'text/html; charset=utf-8',
//       'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
//     },
//   });
// };



const API_BASE_URL = 'https://api.zyphoriz.com';
const SITE_URL = 'https://zyphoriz.com';
const SOCIAL_CRAWLER =
  /(facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|Slackbot|Slack-ImgProxy|SkypeUriPreview|Pinterest|redditbot|Applebot|Googlebot|bingbot|vkShare|meta-externalagent|developers\.google\.com\/\+\/web\/snippet)/i;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/* ------------------------------------------------------------------ */
/*  image helpers                                                      */
/* ------------------------------------------------------------------ */

const firstString = (candidate) => {
  if (typeof candidate === 'string') return candidate.trim() || null;
  if (candidate && typeof candidate === 'object') {
    const value =
      candidate.secure_url || candidate.url || candidate.image || candidate.src;
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
};

/**
 * Pick business profile image (logo / profile image / thumbnail / primary image)
 */
const pickBusinessProfileImage = (business) => {
  const candidates = [
    business?.profileImage,
    business?.logo,
    business?.image,
    business?.coverImage,
    business?.bannerImage,
    business?.thumbnail,
    Array.isArray(business?.gallery) ? business.gallery[0] : null,
    Array.isArray(business?.photos) ? business.photos[0] : null,
    Array.isArray(business?.images) ? business.images[0] : null,
  ];

  for (const candidate of candidates) {
    const value = firstString(candidate);
    if (value) return value;
  }
  return null;
};

/**
 * Prioritize cover / banner, falling back directly to business profile image
 */
const pickBusinessImage = (business) => {
  const profileImage = pickBusinessProfileImage(business);

  const candidates = [
    business?.coverImage,
    business?.bannerImage,
    business?.image,
    business?.cover,
    business?.banner,
    profileImage, // fallback is business profile image
    Array.isArray(business?.gallery) ? business.gallery[0] : null,
    Array.isArray(business?.photos) ? business.photos[0] : null,
    Array.isArray(business?.images) ? business.images[0] : null,
  ];

  for (const candidate of candidates) {
    const value = firstString(candidate);
    if (value) return value;
  }
  return profileImage;
};

const getAbsoluteImageUrl = (image, fallback = null) => {
  const value = firstString(image) || firstString(fallback);
  if (!value) return '';

  try {
    const url = new URL(value, SITE_URL);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.href;
  } catch {
    return '';
  }
};

const CLOUDINARY_TRANSFORM = 'c_fill,w_1200,h_630,g_auto,q_auto,f_jpg';

const getSocialImageUrl = (image, fallback = null) => {
  const absolute = getAbsoluteImageUrl(image, fallback);
  if (!absolute) {
    return { url: '', dimensions: null };
  }

  let url;
  try {
    url = new URL(absolute);
  } catch {
    return { url: absolute, dimensions: null };
  }

  // Cloudinary: optimize dimensions for 1200x630 social card without stripping public_id or folders
  if (url.hostname.includes('cloudinary.com') && url.pathname.includes('/image/upload/')) {
    const marker = '/image/upload/';
    const index = url.pathname.indexOf(marker);
    const prefix = url.pathname.slice(0, index);
    const rest = url.pathname.slice(index + marker.length).replace(/^\/+/, '');

    if (!rest.startsWith(CLOUDINARY_TRANSFORM)) {
      url.pathname = `${prefix}${marker}${CLOUDINARY_TRANSFORM}/${rest}`;
    }

    return {
      url: url.href,
      dimensions: { width: 1200, height: 630 },
    };
  }

  return { url: url.href, dimensions: null };
};

/* ------------------------------------------------------------------ */
/*  HTML                                                               */
/* ------------------------------------------------------------------ */

const renderMetadata = ({
  title,
  description,
  url,
  image,
  imageDimensions,
  favicon,
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(url)}">
    ${favicon ? `<link rel="icon" href="${escapeHtml(favicon)}">` : ''}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Zyphoriz">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}">
    <meta property="og:image:secure_url" content="${escapeHtml(image)}">
    <meta property="og:image:alt" content="${escapeHtml(title)}">` : ''}
    ${image && imageDimensions ? `<meta property="og:image:width" content="${imageDimensions.width}">
    <meta property="og:image:height" content="${imageDimensions.height}">` : ''}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}">` : ''}
  </head>
  <body><a href="${escapeHtml(url)}">${escapeHtml(title)}</a></body>
</html>`;

/* ------------------------------------------------------------------ */
/*  handler                                                            */
/* ------------------------------------------------------------------ */

export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';
  if (!SOCIAL_CRAWLER.test(userAgent)) return context.next();

  const { pathname } = new URL(request.url);
  const slug = pathname.slice(1);
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
    return context.next();
  }

  let response;
  try {
    response = await fetch(
      `${API_BASE_URL}/api/v1/businesses/slug/${encodeURIComponent(slug)}`,
    );
  } catch {
    return context.next();
  }

  if (!response.ok) {
    return context.next();
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    return context.next();
  }

  const business = payload?.data?.business;
  if (!payload?.success || !business) {
    return context.next();
  }

  const canonicalUrl = `${SITE_URL}/${encodeURIComponent(business.slug || slug)}`;
  const description =
    business.description ||
    business.descriptionSections?.[0]?.description ||
    `Discover ${business.name} on Zyphoriz.`;

  const businessProfileImage = pickBusinessProfileImage(business);
  const rawImage = pickBusinessImage(business) || businessProfileImage;
  const socialImage = getSocialImageUrl(rawImage, businessProfileImage);
  const profileImageUrl = getAbsoluteImageUrl(businessProfileImage || rawImage);

  const previewImage = socialImage.url || profileImageUrl;

  return new Response(
    renderMetadata({
      title: `${business.name} | Zyphoriz`,
      description,
      url: canonicalUrl,
      image: previewImage,
      imageDimensions: socialImage.dimensions,
      favicon: profileImageUrl || previewImage,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  );
};