/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        birthstone: ["Birthstone", "cursive"],
        jolly: ["Jolly Lodger", "cursive"],
        sans: ["Source Sans 3", "sans-serif"],
      },
      colors: {
        // Aquí puedes agregar los colores de tu logo, por ejemplo:
        // primary: '#123456',
        // secondary: '#789abc',
      }
    },
  },
  plugins: [],
}
