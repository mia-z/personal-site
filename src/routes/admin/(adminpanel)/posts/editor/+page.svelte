<script lang="ts">
    import "$styles/vditor.less";
    import Vditor from "vditor";
    import { onMount } from "svelte";

    let vditor: Vditor;

    onMount(() => {
        vditor = new Vditor("vditor-container", {
            theme: "dark",
            minHeight: 600,
            lang: "en_US"
        });
    });

    const onSave = () => {
        console.log(vditor.getValue());
    }
</script>

<button on:click={onSave}>save</button>

<div class={"vditor-wrapper"}>
    <div id={"vditor-container"} />
</div>
