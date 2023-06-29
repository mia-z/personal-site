<script lang="ts">
    import MarkdownEditor from "$components/MarkdownEditor.svelte";
    import Fa from "svelte-fa";
    import { faArrowLeft, faBook, faSave, faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
    import type { ActionData, PageServerData } from "./$types";
    import axios from "axios";
    import { errorToast, notifyToast, successToast } from "$lib/toast";

    export let data: PageServerData;
    export let form: ActionData;

    let categories = data.categories;
    let postToEdit = data.postToEdit;

    let markdownPreviewOpen: boolean;

    let currentTagText = "";

    let postTitle = postToEdit?.title ?? "";
    let postContent = postToEdit?.content ?? "";
    let postCategory = categories.find(x => x.id === postToEdit?.categoryId) ?? { id: -1 };
    let postTags = (postToEdit?.tags && postToEdit?.tags.length > 0) ? postToEdit?.tags.map(x => x.text) : [];

    let savingPost = false;

    const onTagInput = (ev: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
        if (ev.key === "Enter") {
            postTags = [ ...postTags, ev.currentTarget.value ]
            currentTagText = "";
        }
    }

    const onTagRemove = (tag: string) => {
        postTags = [ ...postTags.filter(x => x !== tag)];
    }

    const savePost = async () => {
        savingPost = true;
        const saveRes = await axios.put("/api/admin/posts/" + postToEdit?.id, {
            content: postContent,
            categoryId: postCategory?.id,
            title: postTitle
        });
        savingPost = false;
        successToast("Saved post!");
        console.log(saveRes.status);
    }
</script>

<div class={"container mx-auto flex flex-col lg:w-3/5 md:w-2/3 w-4/5 h-fit"}>
    <div class={"grid grid-cols-6 grid-flow-row gap-x-4"}>
        <div class={"col-span-1 mt-auto"}>
            <a href={"/admin/posts/" + postToEdit?.id} class={"btn btn-secondary btn-block flex flex-row gap-x-1"}>
                    <Fa icon={faArrowLeft} />
                    <span class={"flex my-auto"}>
                        Back
                    </span>
            </a>
        </div>
        <div class={"col-start-2 col-span-3 form-control w-full mx-auto"}>
            <label for="postTitle" class="label">
                <span class="label-text">Post Title</span>
            </label>
            <input bind:value={postTitle} type="text"  id={"postTitle"} name={"postTitle"} class={"focus:border-primary-focus input input-bordered"} />
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
            <button class:disabled={savingPost} disabled={savingPost} class={"btn btn-secondary btn-block"} type={"submit"} on:click={() => savePost()}>
                <div class={"flex flex-row gap-x-1 justify-between"}>
                    <span class={"flex my-auto"}>
                        {savingPost ? "Saving" : "Save"}
                    </span>
                    {#if savingPost}
                        <Fa icon={faSpinner} class={"text-accent mt-auto animate-spin text-4xl"} />
                    {:else}
                        <Fa icon={faSave} />
                    {/if}
                </div>
            </button>
        </div>
    </div>
    <div class={"grid grid-cols-2 grid-flow-row w-full mt-3 gap-x-3"}>
        <div class={"form-control col-span-1"}>
            <input bind:value={currentTagText} placeholder={"Tags"} on:keydown={onTagInput} type="text" class={"placeholder:italic transition-all focus:border-primary-focus input input-bordered"} />
        </div>
        <div class={"col-span-1"}>
            <select bind:value={postCategory.id} class={"focus:border-primary-focus select select-bordered w-full focus:outline-none"}>
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
                        <button on:click={() => onTagRemove(tag)} on:keydown={() => onTagRemove(tag)}>
                            <Fa class={"hover:text-warning-content hover:cursor-pointer"} icon={faCircleXmark}/>
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
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
    <div class={"hidden"}>
        <input name={"postId"} value={postToEdit?.id} />
    </div>
</div>