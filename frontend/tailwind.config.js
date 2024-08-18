/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: '#6200EE',
        'primary-variant': '#3700B3',
        secondary: '#03DAC6',
        'secondary-variant': '#018786',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        error: '#B00020',
        'on-primary': '#FFFFFF',
        'on-secondary': '#000000',
        'on-background': '#000000',
        'on-surface': '#000000',
        'on-error': '#FFFFFF',
        dark:{
          primary: '#BB86FC',
          'primary-variant': '#3700B3',
          secondary: '#03DAC6',
          'secondary-variant': '#03DAC6',
          background: '#121212',
          surface: '#121212',
          error: '#CF6679',
          'on-primary': '#000000',
          'on-secondary': '#000000',
          'on-background': '#FFFFFF',
          'on-surface': '#FFFFFF',
          'on-error': '#000000'
        }  
    },
    fontFamily:{
      bitter: ['Bitter', 'serif'],
    },
    backgroundImage: {
      'landingpagecardbg': 'linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0))',
    },
    screens: {
      'mobile': {'min': '0px', 'max': '680px'},
      'lg-device': {'min': '681px'},
    }
  },
},
  plugins: [],
}