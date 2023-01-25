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
			colors: {
				"text-black": "#404040",
				"cornflower-blue": "#739de7",
				"russian-violet-300": "#47295B",
				"russian-violet-600": "#491747",
				"indian-red": "#C65A63",
				"tuscany": "#C49AA6",
				"linked-in-blue": "#0072b1"				
			},
		},
	}
};