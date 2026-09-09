// API Service connected to Express Backend

const API_URL = 'http://localhost:5000/api';

// Fetch all businesses
export const fetchBusinesses = async () => {
  try {
    const response = await fetch(`${API_URL}/businesses`);
    const json = await response.json();
    if (json.success) {
      return json.data;
    }
    throw new Error(json.error);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
};

// Fetch a single business by slug
export const fetchBusinessBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/businesses/${slug}`);
    const json = await response.json();
    if (json.success) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching business ${slug}:`, error);
    return null;
  }
};

// Add a new business
export const addBusiness = async (businessData) => {
  try {
    const response = await fetch(`${API_URL}/businesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(businessData),
    });
    const json = await response.json();
    if (json.success) {
      return json.data.slug;
    }
    throw new Error(json.error);
  } catch (error) {
    console.error('Error adding business:', error);
    return null;
  }
};

// Mock image upload
export const uploadImage = async (localUrl, path) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!localUrl) {
        resolve(null);
        return;
      }
      // Just return the localUrl simulating a successful upload
      // When ready, update this to upload to a bucket (e.g., S3 or Cloudinary) and return the public URL
      resolve(localUrl);
    }, 500);
  });
};
