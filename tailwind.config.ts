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
        "usp1": "linear-gradient(198deg, #6606E3 0%, #620A81 100%)",
        "usp2": "linear-gradient(180deg, #6606E3 0%, #330372 100%)",
        "usp3": "linear-gradient(157deg, #6606E3 0%, #330372 100%)",
        "pink-purple": "linear-gradient(319deg, #FF37DF 0%, #6E00FF 100%)",
        "calendar-bg": "url('/img/bg-img_01.webp')",
      },
      colors: {
        // Tailwind default colors
        black: "#000000",
        lavender: "#9A50FB",
        aubergine: "#1F0244",
        neonGreen: "#5AE307",
        white: "#FFFFFF",
        grey: "#707070",
        plum: "#620A81",
        violet: "#6606E3",
        bubblegum: "#FF37DF",
        red: "#FF304D",
        yellow: "#FFBB00",
        blue: "#167EE6",
        taupe: "#b8b4bd",

        // PLAEEN specific colors
        // main colors
        green: "#5AE307",
        darkPurple: "#6606E3",
        lightPurple: "#C292FF",

        // text
        offWhite: "#D0CBD6",
        lightGrey: "#BFCCD8",
        mediumGrey: "#707070",
        darkGrey: "#313131",

        // alerts
        error: "#FF304D",
        warning: "#FFD500",
        success: "#0AD34B",
        info: "#1B5CDF",

        // accents
        accentOne: "#ff1ef0", // pink "#ef0c67"
        accentTwo: "#f79b31", // orange "#f79b31"
        accentThree: "#3be1e1", // cyan
        accentFour: "#bce339", // lemon
      },
      fontFamily: {
        sofia: ["sofia-pro", "sans-serif"],
        abolition: ["abolition", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
        robotoMono: ["roboto-mono", "monospace"],
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
    screens: {
      'xxs': '320px', // Example width for extra small screens
      'xs': '480px', // Example min-width for common mobile devices
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};

export default config;
