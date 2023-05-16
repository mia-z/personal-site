<script lang="ts">
    import Fa from "svelte-fa";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<div class={"min-h-[100vh] flex flex-col bg-base-300 relative select-none"}>
    <slot />
</div>



