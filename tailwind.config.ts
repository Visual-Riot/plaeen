import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pink-purple": "linear-gradient(319deg, #FF37DF 0%, #6E00FF 100%)",
      },
      colors: {
        // Tailwind default colors
        black: "#000000",
        lavender: "#9A50FB",
        aubergine: "#1F0244",
        neonGreen: "#1BFF00",
        white: "#FFFFFF",
        grey: "#707070",
        plum: "#620A81",
        violet: "#6606E3",
        bubblegum: "#FF37DF",
        red: "#FF304D",
        yellow: "#FFBB00",
        blue: "#167EE6",

        // PLAEEN specific colors
        // main colors
        green: "#5AE307",
        darkPurple: "#6606E3",
        lightPurple: "#C292FF",

        // text
        offWhite: "#D0CBD6",
        lightGrey: "#B8B4BD",
        mediumGrey: "#707070",
        darkGrey: "#313131",

        // alerts
        error: "#FF304D",
        warning: "#FFD500",
        success: "#0AD34B",
        info: "#1B5CDF",

        // accents
        pinkAccent: "#FF08C4",
        cyanAccent: "#00FFFB",
      },
      fontFamily: {
        sofia: ["sofia pro", "sans-serif"],
        abolition: ["abolition", "sans-serif"],
        logo: ["abolition-soft", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semiBold: "700",
        bold: "800",
      },
      fontStyle: {
        normal: "normal",
        italic: "italic",
      },
    },
  },
  plugins: [],
};

export default config;
