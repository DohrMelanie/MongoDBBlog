// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|form|input|navbar|ripple|spinner|card|container|divider|dropdown|modal|popover|select|table|tooltip).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class"
};