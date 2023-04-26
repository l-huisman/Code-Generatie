/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./modals/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b0764",
      },
      fontFamily: {
        barlow: ["var(--font-barlow)"],
        poppins: ["var(--font-poppins)"],
      },
      backgroundImage: {
        stars: 'url("/images/stars.jpg")',
      },
    },
  },
  plugins: [],
};
