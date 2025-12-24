/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#23b5b9",
          dark: "#167e83",
        },
      },
    },
  },
  plugins: [],
};
