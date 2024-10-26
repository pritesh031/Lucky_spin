
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "320px",

      galaxyz: "344px",

      gals8: "360px",

      xs: "375px",

      iphone12: "390px",

      pixel7: "412px",

      xss: "414px",

      mxs: "425px",

      iphone14: "430px",

      surfaceduo: "540px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1440px",

      "2xl": "2560px",
    
    },
    extend: {
      placeholder: {
        xsm: "text-xs",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-4xl",
      },
    },
  },
  plugins: [],
};
