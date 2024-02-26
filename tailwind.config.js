/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,tsx}", ".tsx"],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-muted": "var(--color-button-muted)",
        },
      },
      gradientColorStops: {
        skin: {
          hue: "var(--color-fill)",
        },
      },
    },
  },
  plugins: [],
};
