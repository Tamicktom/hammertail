//@ts-check
import tailwindConfig from "../../tailwind.config.cjs"; // just an alias for the tailwind.config.js
//@ts-check
import z from "zod";

const themeSchema = z.object({
  content: z.array(z.string()),
  theme: z.object({
    extend: z.object({
      backgroundImage: z.object({
        noise: z.string(),
        rainbow: z.string(),
      }),
      screens: z.object({
        xsm: z.string(),
        ssm: z.string(),
      }),
      fontFamily: z.object({
        primary: z.string(),
      }),
      colors: z.object({
        primary: z.object({
          // 50: z.string(),
          100: z.string(),
          200: z.string(),
          300: z.string(),
          400: z.string(),
          500: z.string(),
          600: z.string(),
          700: z.string(),
          800: z.string(),
          900: z.string(),
        }),
        secondary: z.object({
          100: z.string(),
          200: z.string(),
          300: z.string(),
          400: z.string(),
          500: z.string(),
          600: z.string(),
          700: z.string(),
          800: z.string(),
          900: z.string(),
        }),
      }),
    }),
  }),
  plugins: z.array(z.unknown()),
});

const design = themeSchema.parse(tailwindConfig);

export default design;