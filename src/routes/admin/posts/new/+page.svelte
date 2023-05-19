<script lang="ts">
    import MarkdownEditor from "$components/MarkdownEditor.svelte";
    import Fa from "svelte-fa";
    import { faArrowLeft, faBook, faSave } from "@fortawesome/free-solid-svg-icons";
    import { goto } from "$app/navigation";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let markdownString: string = "";
    let markdownPreviewOpen: boolean;
</script>

<div class={"container mx-auto flex flex-col lg:w-3/5 md:w-2/3 w-4/5 h-fit"}>
    <div class={"grid grid-cols-6 grid-flow-row gap-x-4"}>
        <div class={"col-span-1 mt-auto"}>
            <button class={"btn btn-secondary btn-block"}>
                <div on:click={() => goto("/admin/posts")} on:keyup={() => goto("/admin/posts")} class={"flex flex-row gap-x-1 justify-between"}>
                    <Fa icon={faArrowLeft} />
                    <span class={"flex my-auto"}>
                        Back
                    </span>
                </div>
            </button>
        </div>
        <div class={"col-start-2 col-span-3 form-control w-full mx-auto"}>
            <label for="title" class="label">
                <span class="label-text">Post Title</span>
              </label>
            <input type="text" name="post-title" class={"input input-bordered"} />
        </div>
        <div class={"col-span-1 mt-auto"}>
            <button class={"btn btn-primary btn-block"} on:click={() => markdownPreviewOpen = true}>
                <div class={"flex flex-row gap-x-1 justify-between"}>
                    <span class={"flex my-auto"}>
                        Preview
                    </span>
                    <Fa icon={faBook} />
                </div>
            </button>
        </div>
        <div class={"col-span-1 mt-auto"}>
            <button class={"btn btn-secondary btn-block"}>
                <div class={"flex flex-row gap-x-1 justify-between"}>
                    <span class={"flex my-auto"}>
                        Save
                    </span>
                    <Fa icon={faSave} />
                </div>
            </button>
        </div>
    </div>
    <MarkdownEditor
        bind:markdownString
        bind:showPreview={markdownPreviewOpen}
     />
</div>

