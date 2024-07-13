/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#2B2B2B",
      light: "#FDF9EF",
      accent: {
        100: "#F8EED4",
      },
      dk: {
        100: "#1D1D1D",
        200: "#2B2B2B",
        300: "#131313",
        400: "#333333",
      },
      lt: {
        100: "#F8EED4",
        200: "#FDF9EF",
        300: "#ffffff",
      },
      lw: {
        100: "#8A8A8A",
        200: "#6A6A6A",
      },
    },
    extend: {},
  },
  plugins: [],
};
