/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16292C',
          container: '#244145',
          dark: '#0F1E20',
          fixed: '#DDEBE6',
          'fixed-dim': '#BFD4CD',
        },
        'on-primary': '#FBF6EC',
        'on-primary-container': '#DDEBE6',
        secondary: {
          DEFAULT: '#B94630',
          teal: '#2F756D',
          container: '#F5C5B8',
          fixed: '#F8D9D0',
        },
        'on-secondary': '#FBF6EC',
        'on-secondary-container': '#6F2115',
        tertiary: {
          DEFAULT: '#E8A23D',
          amber: '#E8A23D',
          hover: '#F4C874',
          container: '#F7D9A5',
          'fixed-dim': '#D8902F',
        },
        'on-tertiary': '#16292C',
        'on-tertiary-container': '#6D430E',
        background: '#FBF6EC',
        'on-background': '#241F1A',
        surface: {
          DEFAULT: '#FBF6EC',
          dim: '#E5D9C7',
          bright: '#FFFFFF',
          variant: '#F1E8D8',
          container: '#F5EDE1',
          'container-low': '#F8F2E9',
          'container-lowest': '#FFFFFF',
          'container-high': '#EFE3D2',
          'container-highest': '#E7D9C6',
        },
        'on-surface': '#241F1A',
        'on-surface-variant': '#655B50',
        outline: {
          DEFAULT: '#8F8172',
          variant: '#D8CABC',
        },
        error: {
          DEFAULT: '#9F2F22',
          container: '#F8D0C8',
        },
        'on-error': '#FFFFFF',
        'on-error-container': '#6F2115',
        success: {
          DEFAULT: '#2F756D',
          container: '#C7E5DD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        'container-max': '1280px',
        'margin-desktop': '40px',
        'margin-mobile': '16px',
        'gutter': '24px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
      }
    },
  },
  plugins: [],
}
