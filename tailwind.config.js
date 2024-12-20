import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    colors: {
      dark: "#222831",
      "dark-secondary": "#393e46",
      "dark-text": "#eeeeee",
      "dark-text-secondary": "#00ADB5",
      cyan: {
        100: "#ecfeff",
        200: "#cffafe",
        300: "#a5f3fc",
        400: "#67e8f9",
        500: "#22d3ee",
        600: "#06b6d4",
        700: "#0891b2",
        800: "#0e7490",
        900: "#155e75",
      },
    },
  },
  container: {
    padding: {
      DEFAULT: "15px",
    },
  },
  plugins: [flowbite.plugin()],
};
