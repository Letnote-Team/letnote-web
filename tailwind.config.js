/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#d7ecfc",
        "primary-200": "#afdaf9",
        "primary-300": "#9bd0f7",
        "primary-400": "#87c7f6",
        primary: "#37A2F0",
        "primary-600": "#2483C7",
        "primary-700": "#237AB9",
        "gray-text": "#6F6F6F",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(40px)" },
        },
        progress: {
          "0%": { width: "100%" },
          "100%": { width: 0 },
        },
        "toast-hide": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "toast-slide-in-right": {
          "0%": { transform: "translateX(calc(100% + 1rem))" },
          "100%": { transform: "translateX(0)" },
        },
        "toast-slide-in-bottom": {
          "0%": { transform: "translateY(calc(100% + 1rem))" },
          "100%": { transform: "translateY(0)" },
        },
        "toast-swipe-out": {
          "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          "100%": {
            transform: "translateX(calc(100% + 1rem))",
          },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 1s ease-in-out infinite",
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out": "toast-swipe-out 100ms ease-out forwards",
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionProperty: {
        width: "width",
      },
    },
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix")(), require("tailwind-scrollbar")],
};
