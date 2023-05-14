/** @type {import("tailwindcss").Config} */

const colours = require("tailwindcss/colors");

module.exports = {
	content: [
		"src/**/*.{tsx,ts,js,jsx,html,svelte}",
	],
	darkMode: "class",
	theme: {
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem",
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	daisyui: {
		themes: ["dark"]
	}
};