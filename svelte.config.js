import { vitePreprocess } from '@sveltejs/kit/vite';
import vercel from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: vercel(),
		alias: {
			"$components": "src/components",
			"$styles": "src/styles"
		}
	},
};

export default config;
