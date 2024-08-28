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
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    colors: {
      dark: "#222831",
      "dark-secondary": "#393e46",
      "dark-text": "#eeeeee",
      "dark-text-secondary": "#00ADB5",
    },
  },
  container: {
    padding: {
      DEFAULT: "15px",
    },
  },
  plugins: [flowbite.plugin()],
};
