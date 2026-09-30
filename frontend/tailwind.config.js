/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        accent: {
          blue: '#2563EB',
          red: '#DC2626',
          green: '#16A34A',
          yellow: '#EAB308',
        }
      }
    },
  },
  plugins: [],
}
