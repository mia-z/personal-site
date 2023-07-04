<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import type { PageData } from "./$types";
    import { faArrowLeft, faPen, faPencil } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    export let data: PageData;
</script>

<div class={"fixed flex flex-row space-x-3"}>
    <a href={"/admin/posts"} class={"btn btn-secondary btn-block flex flex-row gap-x-1"}>
        <Fa icon={faArrowLeft} />
        <span class={"flex my-auto"}>
            Back
        </span>
    </a>
    <a href={`/admin/posts/${data.post?.id}/edit`} class={"btn btn-primary btn-block flex flex-row gap-x-1"}>
        <span class={"flex my-auto"}>
            Edit
        </span>
        <Fa icon={faPencil} />
    </a>
</div>


<div class={"prose container mx-auto mt-5"}>
    {#if data.post?.content}
        {@html data.post.content.code}
    {:else}
        No content yet <!--TODO: UPDATE THIS !-->
    {/if}
</div>