/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        "1/2": "50%",
        "2/5": "40%",
        "3/7": "42%",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
