 export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: '#F97316', soft: '#FFF7ED' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      }
    },
  },
  plugins: [],
}