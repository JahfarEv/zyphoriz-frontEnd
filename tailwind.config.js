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
          DEFAULT: '#1a146b',
          container: '#312e81',
          fixed: '#e2dfff',
          'fixed-dim': '#c3c0ff',
        },
        'on-primary': '#ffffff',
        'on-primary-container': '#9c9af4',
        secondary: {
          DEFAULT: '#006a63',
          teal: '#0f766e',
          container: '#99efe5',
          fixed: '#9cf2e8',
        },
        'on-secondary': '#ffffff',
        'on-secondary-container': '#006f67',
        tertiary: {
          DEFAULT: '#372000',
          amber: '#f59e0b',
          container: '#543300',
          'fixed-dim': '#ffb95f',
        },
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#e49200',
        background: '#f8f9ff',
        'on-background': '#0b1c30',
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          variant: '#d3e4fe',
          container: '#e5eeff',
          'container-low': '#eff4ff',
          'container-lowest': '#ffffff',
          'container-high': '#dce9ff',
          'container-highest': '#d3e4fe',
        },
        'on-surface': '#0b1c30',
        'on-surface-variant': '#474651',
        outline: {
          DEFAULT: '#777682',
          variant: '#c8c5d3',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
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
