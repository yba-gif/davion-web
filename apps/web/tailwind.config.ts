import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#60E576',
                // AA-safe shade for green-on-white TEXT (eyebrows, badges, hovers,
                // headline `.` accents). Contrast against #FFFFFF is ~5.3:1.
                // Decoration (dots, fills, borders) keeps `primary` (#60E576).
                'primary-text': '#2A8B3C',
                dark: '#212121',
                drywhite: '#FEFEFE',
                azure: '#e0f1f3',
                // aliceblue removed P1.U6, collapsed to 3 pastels (azure /
                // honeydew / whitesmoke). All previous `bg-aliceblue` swapped
                // to `bg-azure`.
                honeydew: '#d9efdf',
                drygray: {
                    100: '#212121',
                    200: 'rgba(0, 0, 0, 0.1)',
                    default: '#979797',
                },
                whitesmoke: {
                    100: '#f8f8f8',
                    200: '#f3f3f3',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                degular: ['Degular Display', 'sans-serif'],
                switzer: ['Switzer', 'sans-serif'],
            },
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('data-last', '&[data-last="true"]')
            addVariant('parent-data-last', '[data-last="true"] &')
            addVariant('data-first', '&[data-first="true"]')
            addVariant('data-active', '&[data-active="true"]')
            addVariant('data-disabled', '&[data-disabled="true"]')
        }),
    ],
}

export default config
