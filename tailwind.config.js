/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1800px",
      },
    },
    extend: {
      boxShadow: {
        lg: "0 0px 15px -3px rgb(0 0 0 / 0.13), 0 0px 6px -2px rgb(0 0 0 / 0.16)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.16), 0 8px 10px -4px rgb(0 0 0 / 0.16)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
      extend: {
        borderColor: ['hover'], // Extend border color on hover
      },
      colors: {
        primary_color: "#1C4990",
        "primary-hover": "#BF27D7",
        green_color: "#29AD17",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    { pattern: /^border-(red|green)-[^/]+$/ },
    { pattern: /^text-(red|green)-[^/]+$/ },
    {
      pattern: /^bg-(indigo|yellow|red|purple|pink|blue|green)-[^/]+$/,
      variants: [
        "hover",
        "dark",
        "dark:hover",
        "group-hover",
        "group-hover/navitem",
        "group-hover/submenu",
      ],
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
