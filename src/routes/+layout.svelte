<script lang="ts">
    import "../styles/tw.css";
    import "../styles/globals.scss";
    import type { LayoutServerData } from "./$types";
</script>

<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<div class={"min-h-[100vh] flex flex-col bg-base-300 relative select-none"}>
    <slot />
</div>



