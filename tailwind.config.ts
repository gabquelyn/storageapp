import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#121535",
        "light-blue": "#77CEEF",
        coffee: "#B8860B",
        ash: "#D8DAE5",
        grey: "#8F95B2"
      },
    },
  },
  plugins: [],
};
export default config;
