import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        '600': '600px',
        '1200' : '1200px',
        '900' : '900px',
      },
      height: {
        '600': '600px',
      },
      fontFamily: {
        kanit: ['Kanit']
      }
    },
  },
  plugins: [],
};
export default config;
