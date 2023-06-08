<script lang="ts">
    import MarkdownEditor from "$components/MarkdownEditor.svelte";
    import Fa from "svelte-fa";
    import { faArrowLeft, faBook, faSave, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
    import { goto } from "$app/navigation";
    import type { ActionData, PageServerData } from "./$types";
    import type { Tag } from "@prisma/client";
    import { enhance } from "$app/forms";

    export let data: PageServerData;

    export let form: ActionData;

    let isNewPost = !!!data.postToEdit;

    let markdownPreviewOpen: boolean;

    let categories = data.categories;

    let currentTagText = "";

    let postToEdit = data.postToEdit;

    let postTitle = postToEdit?.title ?? "";
    let postContent = postToEdit?.content ?? "";
    let postCategory = categories.find(x => x.id === postToEdit?.categoryId);
    let postTags = (postToEdit?.tags && postToEdit?.tags.length > 0) ? postToEdit?.tags.map(x => x.text) : [];

    let editorForm: HTMLFormElement;

    const onTagInput = (ev: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
        if (ev.key === "Enter") {
            postTags = [ ...postTags, ev.currentTarget.value ]
            currentTagText = "";
        }
    }

    const onTagRemove = (tag: string) => {
        postTags = [ ...postTags.filter(x => x !== tag)];
    }
</script>

<div class={"absolute bottom-7 left-7 border-2 rounded-md shadow-lg bg-secondary w-24 h-10 flex"}>
    <div class={"m-auto text-secondary-content"}>
        {isNewPost ? "CREATING" : "EDITING"}
    </div>
</div>

<form 
    bind:this={editorForm} 
    method="POST"
    action={isNewPost ? "?/create" : "?/update"}
    use:enhance={({ form, data, action, cancel, submitter }) => {
        // `form` is the `<form>` element
        // `data` is its `FormData` object
        // `action` is the URL to which the form is posted
        // `cancel()` will prevent the submission
        // `submitter` is the `HTMLElement` that caused the form to be submitted

        return async ({ result, update }) => {
            // `result` is an `ActionResult` object
            // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
            console.log(result);
        };
    }}
    class={"container mx-auto flex flex-col lg:w-3/5 md:w-2/3 w-4/5 h-fit"}>
    <!--Hacky way to stop form submitting on enter-press inside a text input-->
    <button type="submit" disabled style="display: none" />
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
            <input type="text" name={"postTitle"} class={"input input-bordered"} />
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
            <button class={"btn btn-secondary btn-block"} type={"submit"}>
                <div class={"flex flex-row gap-x-1 justify-between"}>
                    <span class={"flex my-auto"}>
                        Save
                    </span>
                    <Fa icon={faSave} />
                </div>
            </button>
        </div>
    </div>
    <div class={"grid grid-cols-2 grid-flow-row w-full mt-3 gap-x-3"}>
        <div class={"form-control col-span-1"}>
            <input bind:value={currentTagText} placeholder={"Tags"} on:keydown={onTagInput} type="text" name="tag" class={"placeholder:italic transition-all focus:border-primary-focus input input-bordered"} />
        </div>
        <div class={"col-span-1"}>
            <select name={"category"} class={"select select-bordered w-full"}>
                <option value={null} selected>Select Category</option>
                {#each categories as category}
                    <option selected={postCategory && postCategory.id === category.id ? true : false} value={category.id}>{category.categoryName}</option>
                {/each}
            </select>
        </div>
        {#if postTags.length > 0}
            <div class={"col-span-1 flex flex-row flex-wrap p-3 gap-2 justify-center"}>
                {#each postTags as tag}
                    <div class={"badge badge-secondary gap-2"}>
                        {tag}
                        <div on:click={() => onTagRemove(tag)} on:keydown={() => onTagRemove(tag)}>
                            <Fa class={"hover:text-warning-content hover:cursor-pointer"} icon={faCircleXmark}/>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
        <div class={"hidden"}>
            <input name={"postTags"} value={postTags.join(",")} />
        </div>
    </div>
    <div class={"mt-3 w-full border-[1px] border-base-content border-opacity-20 bg-base-100 transition-all rounded-md focus-within:border-primary-focus"}>
        <MarkdownEditor
            bind:markdownString={postContent}
            bind:showPreview={markdownPreviewOpen}
        />
    </div>
    <div class={"hidden"}>
        <input name={"postContent"} value={postContent} />
    </div>
</form>