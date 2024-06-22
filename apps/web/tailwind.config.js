/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      bitter: ['Bitter', 'serif'],
    },
    backgroundImage: {
      'landingpagecardbg': 'linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0))',
    },
  },
  
  plugins: [],
}