<script lang="ts">
    import "../styles/tw.css";
    import "../styles/globals.scss";
    import { onMount } from "svelte";
    import { themes } from "../constants";
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import type { DaisyThemes } from "../app";
    
    let theme: DaisyThemes = themes[0];
    let rootEle: HTMLHtmlElement | null;

    onMount(() => {
        rootEle = document.querySelector("html");
        if (rootEle) {
            rootEle.setAttribute("data-theme", theme);
        }
    });

    const onThemeChange = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
        if (rootEle)
            rootEle.setAttribute("data-theme", e.currentTarget.value);
    }

</script>


<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<!-- <div class={"absolute top-0 left-0 h-10 w-20 z-50"}>
    <select on:change={onThemeChange}>
        {#each themes as theme}
            <option value={theme} class={"capitalize"}>{theme}</option>
        {/each}
    </select>
</div> -->

<div class={"min-h-[100vh] flex flex-col bg-base-300 relative select-none"}>
    <slot />
</div>

<SvelteToast />

<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 8rem;
        --toastContainerLeft: calc(50vw - 8rem);
        --toastContainerBorderRadius: 50px;
        --toastBorderRadius: "6px";
        --toastBarBackground: rgb(255 255 255);
    }
</style>