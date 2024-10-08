import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        blend: "0 -100px 50px -10px black inset",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        usp1: "linear-gradient(198deg, #6606E3 0%, #620A81 100%)",
        usp2: "linear-gradient(180deg, #6606E3 0%, #330372 100%)",
        usp3: "linear-gradient(157deg, #6606E3 0%, #330372 100%)",
        "pink-purple": "linear-gradient(319deg, #FF37DF 0%, #6E00FF 100%)",
        "calendar-bg": "url('/img/bg-img_01.webp')",
        "main-gradient":
          "radial-gradient(50% 40% at 50% 50%, #6606E3 0%, transparent 100%)",
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
        neonPurple: "#5811c0",

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
        accentOne: "#FF5E57", // coral
        accentTwo: "#FF8A00", // orange
        accentThree: "#00C8A0", // turquoise
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
        extraLight: "100",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      xxs: "320px", // main paddings: 16px (px-4)
      xs: "480px", // main paddings: 24px (px-6)
      sm: "640px", // main paddings: 32px (px-8)
      md: "960px", // main paddings: 80px (px-20)
      lg: "1024px", // main paddings: 80px (px-20)
      xl: "1280px", // main paddings: 144px (px-36)
      "2xl": "1536px", // main paddings: 144px (px-36)
      "3xl": "1920px", // main paddings: 384px (px-96)
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
