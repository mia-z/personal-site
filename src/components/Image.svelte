<script lang="ts">
    import FaSpinner from "svelte-icons/fa/FaSpinner.svelte";
    import FaRegTimesCircle from "svelte-icons/fa/FaRegTimesCircle.svelte";
	import { onMount } from "svelte";
	export let src: string;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
        const img = new Image();
        img.src = src;
        loading = true;

        img.onload = () => {
            loading = false;
            loaded = true;
        };
        img.onerror = () => {
            loading = false;
            failed = true;
        };
	})
</script>

{#if loaded}
	<img {src} alt="Svelte component" />
{:else if failed}
    <FaRegTimesCircle class={"text-red-400"} />
{:else if loading}
	<FaSpinner class={"text-white animate-spin"} />
{/if}
