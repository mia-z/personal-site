<script lang="ts">
    import { onMount } from "svelte";
    import Modal from "./Modal.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import CodeMirror from "./CodeMirror.svelte";

    export let showPreview: boolean = false;
    export let markdownString: string = "";
</script>

<CodeMirror wrapperClass={"w-full h-full"} bind:doc={markdownString}  />

<Modal bind:open={showPreview}>
    <div slot="title">
        Markdown Preview
    </div>
    <div slot="content" class={"prose p-4 w-100 mx-auto"}>
        <SvelteMarkdown source={markdownString} />
    </div>
</Modal>