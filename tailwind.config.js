// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        card: '#232324',
        card2: '#2A2A2B',
        line: '#353537',
        paper: '#F2F2F2',
        muted: '#A6A6A9',
        accent: '#2FA9F9',
        mint: '#62D9A8',
        flame: '#FF8A4E',
        island: '#ECECEA',
        islandink: '#141414',
        field: '#1E1E1F',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['"Golos Text"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        badge: '0.08em',
      },
      zIndex: {
        curtain: 70,
        cursor: 80,
      },
      boxShadow: {
        sticker: '0 18px 40px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}