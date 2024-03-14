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
        extend: {
            gridTemplateColumns: {
                'n': 'repeat(auto-fit,minmax(230px, 1fr))',
            },
        },
    },
    plugins: [],
}