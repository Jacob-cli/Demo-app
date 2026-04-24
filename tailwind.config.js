/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wire: {
          bg: '#f5f5f5',
          card: '#ffffff',
          border: '#d4d4d4',
          text: '#171717',
          muted: '#737373',
          accent: '#2563eb',
          success: '#16a34a',
          warning: '#ca8a04',
          danger: '#dc2626',
        }
      }
    },
  },
  plugins: [],
}
