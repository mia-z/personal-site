import { join } from "path";
import type { Config } from "tailwindcss";

const config = {
	darkMode: "class",
	content: [
        "src/**/*.{tsx,ts,js,jsx,html,svelte}"
	],
	theme: {
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
        },
    },
    plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"), 
		require("daisyui")
	],
	daisyui: {
		themes: ["dark", "black", "luxury", "business", "coffee", "night", "halloween", "dracula"]
	}
} satisfies Config;

export default config;