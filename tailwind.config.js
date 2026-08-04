/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PP Neue Montreal', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['PP Neue Montreal', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['PP Neue Montreal', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontWeight: {
        hairline: '100',
        light: '300',
        normal: '400',
        book: '450',
        medium: '600',
        semibold: '600',
        bold: '800',
        extrabold: '800',
      },
      colors: {
        page: 'rgb(var(--page) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        mute: 'rgb(var(--mute) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      maxWidth: {
        content: '40rem',
      },
    },
  },
  plugins: [],
}
