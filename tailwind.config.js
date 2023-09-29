/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {screens: {
        "mobileDeviceOnly": {"min": "300px", "max": "799px"},
        "mobileDeviceLesserThan500": {"min": "300px", "max": "499px"},
        "smallerDevice": {"min": "300px", "max": "399px"},
        "smallDevice": {"min": "350px", "max": "1000px"},
        "semiSmallDevice": {"min": "351px", "max": "399px"},
        "bonusDevice": {"min": "400px", "max": "499px"},
        "aboveBonusDevice": {"min": "800px"},
        "generalDevice": {"max": "1000px"},
        "mediumDevice": {"min": "500px", "max": "1000px"},
        "tablet": {"min": "767px", "max": "1000px"},
        "largeDevice": {"min": "1001px"},
      },},
  },
  plugins: [],
}