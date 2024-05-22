/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fde68a",

          secondary: "#c4b5fd",

          accent: "#84cc16",

          neutral: "#d1d5db",

          "base-100": "#ffffff",

          info: "#2563eb",

          success: "#16a34a",

          warning: "#f59e0b",

          error: "#ff0000",
        },
      },
    ],
  },
};
