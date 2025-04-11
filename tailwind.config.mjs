/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",    // Light background
        foreground: "#1f2937",
      },
    },
  },
  plugins: [],
};
