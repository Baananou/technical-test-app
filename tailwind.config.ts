/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./node_modules/flowbite/**/*.js",
		"./node_modules/flowbite-react/**/*.js",
		"./public/**/*.html",
		"./app/**/*.{ts,tsx}",
	],
	plugins: [require("flowbite/plugin")],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
				montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
			},
			backgroundImage: {
				"primary-gradient":
					"linear-gradient(180.96deg, #FFFFFF 0.82%, #E0E0E0 129.1%)",
			},

			colors: {
				primary: {
					light: "#7EA0B3",
					DEFAULT: "#1F2D46",
					dark: "#112033",
					shade: "#E0E0E0",
				},
				like: "#2ECC71",
				dislike: "#E74C3C",
				remove: "#F39C12",
			},
		},
	},
};
