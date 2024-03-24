/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            title: ['Unbounded', 'sans-serif'],
            montserrat: ['Montserrat', 'sans-serif'],
        },      
        extend: {
            gridTemplateColumns: {
                'n': 'repeat(auto-fit,minmax(230px, 1fr))',
            },
            colors: {
                'default': '#36362A',
                'yellow': '#eeee22',
            },
        },
    },
    plugins: [],
}