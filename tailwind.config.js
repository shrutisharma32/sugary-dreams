/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A50B5E',
        button: '#A94064',
        mulberry: '#C54B8C',
        hunter: '#6C546F',
        back: '#ede5e6',
        hoverbg: '#f1e5e6',
        hoverbutton: '#8d0b50',
        hovermenu: '#a94065',
        dis: '#efdbde',
        verify: '#80b577'
      },
    },
  },
  plugins: [],
};
