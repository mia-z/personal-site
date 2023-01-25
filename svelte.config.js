import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import vercel from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		adapter: vercel(),
	},
};

export default config;
