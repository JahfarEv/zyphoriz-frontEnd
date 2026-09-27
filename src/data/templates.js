export const DEFAULT_TEMPLATE = 'classic';

export const TEMPLATE_OPTIONS = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless teal & amber',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 55%, #b94630 100%)',
    // Theme tokens used by the public page
    theme: {
      accent: '#14b8a6',
      accentSoft: '#5eead4',
      highlight: '#E8A23D',
      deep: '#0f766e',
      surface: '#16292C',
      textOnSurface: '#ffffff',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep navy & electric blue',
    gradient: 'linear-gradient(135deg, #0b1220 0%, #1e3a8a 55%, #3b82f6 100%)',
    theme: {
      accent: '#3b82f6',
      accentSoft: '#93c5fd',
      highlight: '#f59e0b',
      deep: '#0b1220',
      surface: '#0f172a',
      textOnSurface: '#ffffff',
    },
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'Warm reds, oranges & cream',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 55%, #fbbf24 100%)',
    theme: {
      accent: '#ea580c',
      accentSoft: '#fdba74',
      highlight: '#fbbf24',
      deep: '#7c2d12',
      surface: '#1c1410',
      textOnSurface: '#ffffff',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Calm greens & mint',
    gradient: 'linear-gradient(135deg, #14532d 0%, #16a34a 55%, #86efac 100%)',
    theme: {
      accent: '#16a34a',
      accentSoft: '#86efac',
      highlight: '#facc15',
      deep: '#14532d',
      surface: '#0f1a14',
      textOnSurface: '#ffffff',
    },
  },
  {
    id: 'royal',
    name: 'Royal',
    description: 'Purple & gold luxury',
    gradient: 'linear-gradient(135deg, #3b0764 0%, #7e22ce 55%, #facc15 100%)',
    theme: {
      accent: '#7e22ce',
      accentSoft: '#d8b4fe',
      highlight: '#facc15',
      deep: '#3b0764',
      surface: '#1a0f24',
      textOnSurface: '#ffffff',
    },
  },
  {
    id: 'mono',
    name: 'Mono',
    description: 'Clean black & white',
    gradient: 'linear-gradient(135deg, #111827 0%, #374151 55%, #9ca3af 100%)',
    theme: {
      accent: '#374151',
      accentSoft: '#d1d5db',
      highlight: '#f59e0b',
      deep: '#111827',
      surface: '#0b0f17',
      textOnSurface: '#ffffff',
    },
  },
];

export const getTemplateConfig = (id) =>
  TEMPLATE_OPTIONS.find((t) => t.id === id) ||
  TEMPLATE_OPTIONS.find((t) => t.id === DEFAULT_TEMPLATE) ||
  TEMPLATE_OPTIONS[0];