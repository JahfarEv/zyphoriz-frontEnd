const standardHours = [
  { day: 'Monday - Saturday', time: '9:00 AM - 8:00 PM' },
  { day: 'Sunday', time: '10:00 AM - 5:00 PM' },
];

const SAVED_BUSINESSES_KEY = 'nexora-saved-businesses';

export const mockBusinesses = [
  {
    id: 'celltech-mobiles',
    slug: 'celltech-mobiles',
    ownerReferralCode: 'NEX-CELL-1001',
    name: 'CellTech Mobiles',
    category: 'Electronics',
    categoryId: 'electronics',
    phone: '+91 98470 99887',
    whatsapp: '+91 98470 99887',
    website: 'https://celltech.example.com',
    location: 'Main Road, Kottakkal, Malappuram',
    city: 'Kottakkal',
    description: 'Trusted mobile phone sales, repairs, accessories and exchange offers with genuine parts and friendly service.',
    verified: true,
    trending: true,
    rating: 4.9,
    reviewCount: 128,
    hours: standardHours,
    services: ['iPhone screen replacement', 'Battery replacement', 'Phone exchange', 'Mobile accessories'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1600&q=80',
    distance: '0.8 km away',
  },
  {
    id: 'azure-bistro',
    slug: 'azure-bistro',
    ownerReferralCode: 'NEX-AZUR-1002',
    name: 'Azure Bistro',
    category: 'Food & Dining',
    categoryId: 'food',
    phone: '+91 80865 41230',
    whatsapp: '+91 80865 41230',
    website: 'https://azurebistro.example.com',
    location: 'Kottakkal Junction, Malappuram',
    city: 'Kottakkal',
    description: 'A relaxed neighbourhood bistro serving fresh pasta, coffee, desserts and Kerala-inspired plates.',
    verified: true,
    trending: true,
    rating: 4.8,
    reviewCount: 86,
    hours: standardHours,
    services: ['Dine-in', 'Takeaway', 'Catering', 'Fresh desserts'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    coverImage: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=80',
    distance: '1.4 km away',
  },
  {
    id: 'lotus-wellness-clinic',
    slug: 'lotus-wellness-clinic',
    ownerReferralCode: 'NEX-LOTU-1003',
    name: 'Lotus Wellness Clinic',
    category: 'Medical & Healthcare',
    categoryId: 'medical',
    phone: '+91 79944 22118',
    whatsapp: '+91 79944 22118',
    location: 'Hospital Road, Tirur, Malappuram',
    city: 'Tirur',
    description: 'Modern family healthcare with experienced doctors, diagnostics and compassionate patient support.',
    verified: true,
    trending: false,
    rating: 4.7,
    reviewCount: 54,
    hours: [{ day: 'Monday - Saturday', time: '8:00 AM - 7:00 PM' }, { day: 'Sunday', time: 'Closed' }],
    services: ['General consultation', 'Health checkups', 'Diagnostics', 'Women\'s wellness'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    distance: '8.2 km away',
  },
  {
    id: 'bloom-beauty-studio',
    slug: 'bloom-beauty-studio',
    ownerReferralCode: 'NEX-BLOO-1004',
    name: 'Bloom Beauty Studio',
    category: 'Beauty & Spa',
    categoryId: 'beauty',
    phone: '+91 90724 66319',
    whatsapp: '+91 90724 66319',
    location: 'Pookayil, Tanur, Malappuram',
    city: 'Tanur',
    description: 'Personal styling, skincare and occasion-ready beauty services in a calm, welcoming studio.',
    verified: false,
    trending: false,
    rating: 4.6,
    reviewCount: 39,
    hours: standardHours,
    services: ['Hair styling', 'Bridal makeup', 'Facials', 'Nail care'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    coverImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80',
    distance: '12.5 km away',
  },
];

export const getSavedBusinesses = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_BUSINESSES_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveMockBusiness = (business) => {
  const savedBusinesses = getSavedBusinesses().filter((saved) => saved.slug !== business.slug);
  localStorage.setItem(SAVED_BUSINESSES_KEY, JSON.stringify([...savedBusinesses, business]));
};

export const deleteMockBusiness = (slug, ownerId) => {
  const savedBusinesses = getSavedBusinesses().filter(
    (business) => business.slug !== slug || business.ownerId !== ownerId
  );
  localStorage.setItem(SAVED_BUSINESSES_KEY, JSON.stringify(savedBusinesses));
};

export const getAllBusinesses = () => {
  const savedBusinesses = getSavedBusinesses();
  const savedSlugs = new Set(savedBusinesses.map((business) => business.slug));
  return [...mockBusinesses.filter((business) => !savedSlugs.has(business.slug)), ...savedBusinesses];
};

export const findMockBusiness = (slug) => getAllBusinesses().find((business) => business.slug === slug);
