
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: { 
    extend: {}
  },
  plugins: [require("daisyui", '@tailwindcss/typography')],
  daisyui: {

    themes: ["coffee", "dark", "cmyk"],
    darkTheme: "dracula",
    
  },
}
