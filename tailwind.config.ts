import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // brand teal
        brand: "#0BB5A7",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};

export default config;
