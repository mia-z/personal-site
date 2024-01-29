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
                160: "40rem",
                176: "44rem",
                192: "48rem",
                208: "52rem"
            },
            fontFamily: {
                "lobster": ["Lobster", "cursive"],
                "open-sans": ["Open Sans", "sans-serif"],
                "arimo": ["Arimo"],
                "roboto": ["Roboto Flex", "sans-serif"],
                "roboto-monospace": ["Roboto Mono", "monospace"],
                "wix-madefor-text": ["Wix Madefor Text", "sans-serif"],
                "nunito": ["Nunito Sans", "sans-serif"],
            },
        },
    },
    plugins: []
} satisfies Config;

export default config;