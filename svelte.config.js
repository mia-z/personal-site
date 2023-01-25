import adapter from "@bun-community/sveltekit-adapter-bun";
import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			dynamic_origin: true
		})
	}
};

export default config;
