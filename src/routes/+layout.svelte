<script lang="ts">
    import "../styles/tw.css";
    import "../styles/globals.scss";
</script>

<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<div class={"min-h-[100vh] flex flex-col relative"}>
    <slot />
</div>