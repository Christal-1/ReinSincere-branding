/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        md: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        xl: '1200px',
        '2xl': '1320px',
      },
    },

    extend: {
      /* ================= COLORS ================= */
      colors: {
        ink: {
          1: '#F6F4EE',
          2: '#EAE7DF',
          6: '#9FB4AD',
          8: '#7C918A',
        },

        paper: {
          DEFAULT: '#0E2F28', // deep forest
          soft: '#123E34',    // emerald
          wash: '#0A1F1B',    // near-black green
        },

        accent: {
          DEFAULT: '#C8A24D', // gold
          soft: '#E6D8A3',
          muted: '#9F8742',
        },

        line: 'rgba(200,162,77,0.25)',
        overlay: 'rgba(0,0,0,0.45)',
      },

      /* ================= TYPOGRAPHY ================= */
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.05' }],
        'display-2': ['3.25rem', { lineHeight: '1.06' }],
        eyebrow: ['0.875rem', { letterSpacing: '0.08em' }],
        meta: ['0.8125rem', { letterSpacing: '0.16em' }],
      },

      /* ================= SHAPE & DEPTH ================= */
      borderRadius: {
        mdx: '14px',
        lgx: '18px',
        pill: '999px',
      },

      boxShadow: {
        card: '0 20px 40px rgba(0,0,0,0.35)',
        cardHover: '0 30px 60px rgba(0,0,0,0.45)',
        header: '0 1px 0 rgba(0,0,0,0.25)',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },

      keyframes: {
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        spinSlow: 'spinSlow 20s linear infinite',
      },
    },
  },

  plugins: [
    function ({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.backdrop-soft': {
          backdropFilter: 'blur(10px) saturate(120%)',
        },
        '.badge-rotate': {
          animation: theme('animation.spinSlow'),
        },
      });

      addComponents({
        '.btn': {
          '@apply inline-flex items-center justify-center rounded-md px-4 py-3 font-semibold transition-all':
            {},
          backgroundColor: theme('colors.accent.DEFAULT'),
          color: '#0B1512',
        },
        '.btn:hover': {
          backgroundColor: theme('colors.accent.muted'),
          transform: 'translateY(-1px)',
        },

        '.card': {
          '@apply relative overflow-hidden rounded-mdx transition-all': {},
          boxShadow: theme('boxShadow.card'),
        },
        '.card:hover': {
          boxShadow: theme('boxShadow.cardHover'),
          transform: 'translateY(-2px) scale(1.02)',
        },

        '.hero-visual': {
          '@apply relative min-h-[520px] rounded-lgx overflow-hidden':
            {},
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      });
    },
  ],
};
