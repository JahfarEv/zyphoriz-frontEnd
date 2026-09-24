export const TEMPLATE_OPTIONS = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean premium look for local shops and services',
    accent: '#14b8a6',
    accentSoft: '#5eead4',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 58%, #b94630 100%)',
    surface: 'rgba(20, 184, 166, 0.08)',
  },
  {
    id: 'amber',
    name: 'Amber Glow',
    description: 'Warm and standout styling for food and retail brands',
    accent: '#E8A23D',
    accentSoft: '#f8d688',
    gradient: 'linear-gradient(135deg, #B94630 0%, #E8A23D 55%, #F7D7A8 100%)',
    surface: 'rgba(232, 162, 61, 0.08)',
  },
  {
    id: 'premium',
    name: 'Premium Luxe',
    description: 'Luxury palette suited for salons, clinics, and studios',
    accent: '#7c3aed',
    accentSoft: '#c4b5fd',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #7c3aed 55%, #c084fc 100%)',
    surface: 'rgba(124, 58, 237, 0.08)',
  },
];

export const DEFAULT_TEMPLATE = 'classic';

export const getTemplateConfig = (templateId) =>
  TEMPLATE_OPTIONS.find((template) => template.id === templateId) || TEMPLATE_OPTIONS[0];
