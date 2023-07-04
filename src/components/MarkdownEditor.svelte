<script lang="ts">
    import CodeMirror from "./CodeMirror.svelte";

    export let markdownString: string = "";
</script>

<CodeMirror wrapperClass={"w-full h-full"} bind:doc={markdownString}  />