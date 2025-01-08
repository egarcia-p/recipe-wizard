import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          "50": "#fcf4f4",
          "100": "#f9e7e7",
          "200": "#f5d3d3",
          "300": "#eebbbb",
          "400": "#e08989",
          "500": "#d06363",
          "600": "#bb4747",
          "700": "#9d3838",
          "800": "#823232",
          "900": "#6d2f2f",
          "950": "#3a1515",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
