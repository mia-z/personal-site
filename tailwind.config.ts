import { join } from "path";
import type { Config } from "tailwindcss";
import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";

const config = {
	darkMode: "class",
	content: [
        "src/**/*.{tsx,ts,js,jsx,html,svelte}",
		join(require.resolve(
			"@skeletonlabs/skeleton"),
			"../**/*.{html,js,svelte,ts}"
		)
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
		forms,
		skeleton({themes: { preset: [ "skeleton" ] } })
	],
} satisfies Config;

export default config;