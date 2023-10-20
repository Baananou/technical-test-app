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
					light: "#7EA0B3", // A lighter shade of blue
					DEFAULT: "#1F2D46", // A dark blue or charcoal color
					dark: "#112033", // An even darker shade of blue
					shade: "#E0E0E0", // A shade of the primary color for button backgrounds
				},
				like: "#2ECC71", // A green color for the "like" button
				dislike: "#E74C3C", // A red color for the "dislike" button
				remove: "#F39C12", // A yellow color for the "remove" button
			},
		},
	},
};
