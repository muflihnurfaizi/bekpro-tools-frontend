module.exports = {
  content: ["./views/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        font1: "'Lora', serif",
        font2: "'Fugaz One', cursive;",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
