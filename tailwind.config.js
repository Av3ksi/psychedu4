/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        "primary-dark": "#4F46E5",
        "primary-light": "#8B5CF6",
        secondary: "#22C55E",
        "secondary-dark": "#16A34A",
        "accent-light": "#38BDF8",
        "neutral-dark": "#0F172A",
        "neutral-darker": "#0B1120",
      },
    },
  },
  plugins: [],
};
