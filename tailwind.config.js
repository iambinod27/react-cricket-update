/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      Raleway: ["Raleway", "sans-serif"],
    },
    // colors: {
    //   primary: "#235264",
    //   backgroundPrimary: "#964643",
    // },
  },
  rippleui: {
    removeThemes: ["dark", "light", "whateverTheme"],
  },
  plugins: [require("rippleui")],
};
