import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        lavender: '#9A50FB',
        aubergine: '#1F0244',
        lilac: '#C292FF',
        offWhite: '#33037200',
        neonGreen: '#1BFF00',
        white: '#FFFFFF',
        grey: '#707070',
        lightGrey: '#D0CBD6',
        plum: '#620A81',
        violet: '#6606E3',
        bubblegum: '#FF37DF',
      },
      fontFamily: {
        logo: ['"Abolition Soft"', 'sans-serif'],
        headline: ['"Sofia Pro"', 'sans-serif'],
        subHeadline: ['"Sofia Pro"', 'sans-serif'],
        boldText: ['"Sofia Pro"', 'sans-serif'],
        text: ['"Sofia Pro"', 'sans-serif'],
        buttonText: ['"Sofia Pro"', 'semi-bold'],
      },
    },
  },
  plugins: [],
};

export default config;