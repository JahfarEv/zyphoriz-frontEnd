const API_BASE_URL = 'https://api.zyphoriz.com';
const SITE_URL = 'https://zyphoriz.com';
const FALLBACK_IMAGE = `${SITE_URL}/image/Zyphoriz%201.png`;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const firstString = (candidate) => {
  if (typeof candidate === 'string') return candidate.trim() || null;
  if (candidate && typeof candidate === 'object') {
    const value =
      candidate.secure_url || candidate.url || candidate.image || candidate.src;
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
};

const pickBusinessImage = (business) => {
  const candidates = [
    business?.image,
    business?.coverImage,
    business?.bannerImage,
    business?.cover,
    business?.banner,
    business?.profileImage,
    business?.logo,
    business?.thumbnail,
    Array.isArray(business?.images) ? business.images[0] : null,
    Array.isArray(business?.gallery) ? business.gallery[0] : null,
    Array.isArray(business?.media) ? business.media[0] : null,
  ];

  for (const candidate of candidates) {
    const value = firstString(candidate);
    if (value) return value;
  }
  return null;
};

const getAbsoluteImageUrl = (image) => {
  const value = firstString(image);
  if (!value) return FALLBACK_IMAGE;

  try {
    const url = new URL(value, SITE_URL);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return FALLBACK_IMAGE;
    return url.href;
  } catch {
    return FALLBACK_IMAGE;
  }
};

const getSocialImage = (image) => {
  const absolute = getAbsoluteImageUrl(image);
  let url;
  try {
    url = new URL(absolute);
  } catch {
    return { url: FALLBACK_IMAGE, dimensions: null };
  }

  if (url.hostname === 'res.cloudinary.com' && url.pathname.includes('/image/upload/')) {
    const marker = '/image/upload/';
    const index = url.pathname.indexOf(marker);
    const prefix = url.pathname.slice(0, index);
    const rest = url.pathname.slice(index + marker.length);
    const parts = rest.split('/').filter(Boolean);
    while (
      parts.length > 1 &&
      !/^v\d+$/.test(parts[0]) &&
      !/\.(jpe?g|png|webp|gif|avif|bmp|tiff)$/i.test(parts[0])
    ) {
      parts.shift();
    }

    url.pathname = `${prefix}${marker}c_fill,w_1200,h_630,g_auto,q_auto,f_jpg/${parts.join('/')}`;
    url.searchParams.set('v', '2');
    return { url: url.href, dimensions: { width: 1200, height: 630 } };
  }

  return { url: url.href, dimensions: null };
};

const renderMetadata = ({ business, slug, image }) => {
  const title = `${business.name} | Zyphoriz`;
  const description =
    business.description ||
    business.descriptionSections?.[0]?.description ||
    `Discover ${business.name} on Zyphoriz.`;
  const url = `${SITE_URL}/${encodeURIComponent(business.slug || slug)}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(url)}">
    <link rel="icon" href="${FALLBACK_IMAGE}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Zyphoriz">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta property="og:image" content="${escapeHtml(image.url)}">
    <meta property="og:image:secure_url" content="${escapeHtml(image.url)}">
    <meta property="og:image:alt" content="${escapeHtml(business.name)}">
    ${image.dimensions ? `<meta property="og:image:width" content="${image.dimensions.width}">
    <meta property="og:image:height" content="${image.dimensions.height}">` : ''}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(image.url)}">
  </head>
  <body><a href="${escapeHtml(url)}">${escapeHtml(title)}</a></body>
</html>`;
};

export default async function handler(request, response) {
  const slug = request.query?.slug;
  if (typeof slug !== 'string' || !/^[a-z0-9-]+$/i.test(slug)) {
    response.status(400).send('A valid business slug is required.');
    return;
  }

  let apiResponse;
  try {
    apiResponse = await fetch(
      `${API_BASE_URL}/api/v1/businesses/slug/${encodeURIComponent(slug)}`,
    );
  } catch {
    response.status(502).send('Unable to load business page metadata.');
    return;
  }

  if (!apiResponse.ok) {
    response
      .status(apiResponse.status === 404 ? 404 : 502)
      .send(apiResponse.status === 404 ? 'Business page not found.' : 'Unable to load business page metadata.');
    return;
  }

  let payload;
  try {
    payload = await apiResponse.json();
  } catch {
    response.status(502).send('Business API returned an invalid response.');
    return;
  }

  const business = payload?.data?.business;
  if (!payload?.success || !business) {
    response.status(502).send('Business API returned an invalid response.');
    return;
  }

  const image = getSocialImage(pickBusinessImage(business));
  response
    .status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600')
    .send(renderMetadata({ business, slug, image }));
}
