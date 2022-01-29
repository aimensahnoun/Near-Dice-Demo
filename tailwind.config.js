module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "near-blue": "#5F8AFA",
        success: "#218838",
        danger: "#DC3545",
        "modal-bg": "rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
