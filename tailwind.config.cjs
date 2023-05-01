/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "noise": "url('/noise')",
        rainbow: "var(--rainbow-gradient)",
      },
      screens: {
        "xsm": "320px",
        "ssm": "390px",
      },
      fontFamily: {
        primary: "var(--primary-font)",
      },
      colors: {
        primary: {
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
        },
        secondary: {
          100: "hsl(var(--color-secondary-100) / <alpha-value>)",
          200: "hsl(var(--color-secondary-200) / <alpha-value>)",
          300: "hsl(var(--color-secondary-300) / <alpha-value>)",
          400: "hsl(var(--color-secondary-400) / <alpha-value>)",
          500: "hsl(var(--color-secondary-500) / <alpha-value>)",
          600: "hsl(var(--color-secondary-600) / <alpha-value>)",
          700: "hsl(var(--color-secondary-700) / <alpha-value>)",
          800: "hsl(var(--color-secondary-800) / <alpha-value>)",
          900: "hsl(var(--color-secondary-900) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
