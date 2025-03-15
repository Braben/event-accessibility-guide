import { mtConfig } from "@material-tailwind/react";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],

  theme: {
    extend: {},
  },

  plugins: [mtConfig, require("daisyui"), flowbite.plugin()],
};
