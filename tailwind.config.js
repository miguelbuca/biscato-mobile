/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        ss: "300px",
        xs: "475px",
        ml: "1485px",
      },
      colors: {
        primary: "#ae5333",
        secondary: "#232429",
        tertiary: "#746356",
      },
    },
  },
  plugins: [],
};
