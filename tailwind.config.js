/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {screens: {
        "smallerDevice": {"min": "300px", "max": "350px"},
        "smallDevice": {"min": "350px", "max": "1000px"},
        "generalDevice": {"max": "1000px"},
        "mediumDevice": {"min": "500px", "max": "1000px"},
        "tablet": {"min": "767px", "max": "1220px"},
        "largeDevice": {"min": "1001px"},
      },},
  },
  plugins: [],
}