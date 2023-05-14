<script lang="ts">
    import Modal from "./Modal.svelte";
    import SvelteMarkdown from "svelte-markdown";

    export let showPreview: boolean = false;
    export let markdownString: string = "";

</script>

<div class={"w-full h-full inline-flex gap-2.5  py-5 px-2.5 leading-[21px]"}>
    <div class={"line-numbers w-5 pt-1 text-right"}>
        {#each Array(markdownString.split("\n").length) as _}
            <span></span>
        {/each}
    </div>
    <textarea 
        bind:value={markdownString} 
        rows="10" cols="40"
        class={"w-full min-h-full textarea textarea-bordered focus:border-primary-focus leading-[21px] pl-2 text-primary-content bg-base-100 pt-1 outline-none resize-none overflow-y-hidden roboto-monospace"} 
    />
</div>

<Modal bind:open={showPreview}>
    <div slot="title">
        Markdown Preview
    </div>
    <div slot="content" class={"prose p-4"}>
        <SvelteMarkdown source={markdownString} />
    </div>
</Modal>

<style>
    .line-numbers {
        font-family: monospace;
        width: 20px;
        text-align: right;
    }

    .line-numbers span {
        counter-increment: linenumber;
        --webkit-counter-increment: linenumber;
    }

    .line-numbers span::before {
        content: counter(linenumber);
        display: block;
    }
</style>