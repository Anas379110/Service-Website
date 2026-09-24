/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts}'],
  theme: {
    extend: {
      fontFamily: { arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'] },
      colors: {
        // هوية Service — تركوازي/أزرق ثقة + رمادي فاتح (UI-UX.md)
        brand: {
          DEFAULT: '#0E7C86',
          dark: '#0A5A61',
          light: '#E6F4F5',
        },
        neutral: { 50: '#F7F7F7', 900: '#1A1A1A' },
      },
    },
  },
  plugins: [],
};
