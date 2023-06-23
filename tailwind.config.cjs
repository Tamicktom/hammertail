/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "light-noise": "var(--light-noise)",
        "noise": "var(--noise2)",
        rainbow: "var(--rainbow-gradient)",
      },
      backgroundSize: {
        "10": "10%",
        "20": "20%",
        "30": "30%",
        "100": "100%",
        "208": "208%",
      },
      screens: {
        "xsm": "320px",
        "ssm": "390px",
      },
      fontFamily: {
        primary: "var(--primary-font)",
        secondary: "var(--secondary-font)",
      },
      colors: {
        primary: {
          50: "hsl(var(--color-primary-50) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
          950: "hsl(var(--color-primary-950) / <alpha-value>)",
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
