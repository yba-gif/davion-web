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
                // Davion design tokens — sovereign / instrument-grade.
                // Ink base, single restrained signal accent, cool neutrals.
                // Mirrored as --davion-* CSS variables in assets/css/main.css.
                ink: {
                    DEFAULT: '#0A0B0F', // base background
                    50: '#13151B',      // subtle layered surface
                    100: '#1B1E27',     // elevated surface (cards)
                    200: '#2A2E3A',     // hairline rules, dividers
                },
                steel: {
                    DEFAULT: '#6B7384', // secondary text, diagram lines
                    light: '#9BA3B2',   // tertiary text
                },
                bone: {
                    DEFAULT: '#E8EBF0', // primary text on ink
                    bright: '#F5F7FA',  // high-emphasis / display text
                },
                signal: {
                    DEFAULT: '#5FB8D1', // the one accent — restrained signal cyan
                    dim: '#3D7E91',     // pressed / muted accent
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            letterSpacing: {
                'display-tight': '-0.03em',
                'display-extra-tight': '-0.04em',
                'mono-wide': '0.08em',
            },
            transitionTimingFunction: {
                davion: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            },
            transitionDuration: {
                'davion-hover': '120ms',
                'davion-reveal': '240ms',
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
