<script lang="ts">
    import MarkdownEditor from "$components/MarkdownEditor.svelte";
    import Fa from "svelte-fa";
    import { faArrowLeft, faBook, faSave, faCircleXmark, faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
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
    let postDescription = postToEdit?.description ?? "";
    let postImageType = postToEdit?.imageType ?? "LINK";
    let postImageData = postToEdit?.imageData ?? "";

    let savingPost = false;
const tags = [
    "Tag One", "Second", "memes", "A very long tag to see how it gets handled", "A sixth Tag"
]
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

<div class={"container mx-auto flex flex-row flex-wrap mt-5 lg:w-3/5 md:w-2/3 w-4/5 h-fit gap-x-2 gap-y-2"}>
    <!--BACK BUTTON START-->
    <div class={"w-1/6 mb-5"}>
        <a href={"/admin/posts/" + postToEdit?.id} class={"btn btn-secondary btn-block flex flex-row gap-x-1"}>
                <Fa icon={faArrowLeft} />
                <span class={"flex my-auto"}>
                    Back
                </span>
        </a>
    </div>
    <!--BACK BUTTON START-->
    <!--TITLE START-->
    <div class={"grow bg-base-100 flex mb-5 rounded-lg shadow-lg"}>
        <div class={"m-auto select-none text-4xl lobster"}>
            Create Post
        </div>
    </div>
    <!--TITLE END-->
    <!--PREVIEW BUTTON START-->
    <div class={"w-1/6 mb-5"}>
        <button class={"btn btn-primary btn-block"} on:click={() => markdownPreviewOpen = true}>
            <div class={"flex flex-row gap-x-1 justify-between"}>
                <span class={"flex my-auto"}>
                    Preview
                </span>
                <Fa icon={faBook} />
            </div>
        </button>
    </div>
    <!--PREVIEW BUTTON END-->
    <!--SAVE BUTTON START-->
    <div class={"w-1/6 mb-5"}>
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
    <!--SAVE BUTTON END-->
    <!--POST TITLE START-->
    <div class={"w-1/2 form-control"}>
        <label for="postTitle" class="label">
            <span class="label-text">Title</span>
            <span class={`label-text-alt ${postTitle.length > 50 ? "block" : "hidden"} ${postTitle.length > 64 ? "text-error" : "text-success"}`}>{postTitle.length > 64 ? "Title too long - " : ""}{postTitle.length}/64</span>
        </label>
        <input bind:value={postTitle} type="text"  id={"postTitle"} name={"postTitle"} placeholder={"Write post title here.."} class={"focus:border-primary-focus input input-bordered muted-placeholder"} />
    </div>
    <!--POST TITLE END-->
    <!--POST CATEGORY START-->
    <div class={"grow form-control"}>
        <label for="postCategory" class="label">
            <span class="label-text">Category</span>
        </label>
        <select bind:value={postCategory.id} id={"postCategory"} class={"focus:border-primary-focus select select-bordered w-full focus:outline-none"}>
            {#each categories as category}
                <option selected={postCategory && postCategory.id === category.id ? true : false} value={category.id}>{category.categoryName}</option>
            {/each}
        </select>
    </div>
    <!--POST CATEGORY END-->
    <!--POST DESCRIPTION START-->
    <div class={"w-full form-control"}>
        <label for="postDescription" class="label">
            <span class="label-text">Description</span>
            <span class={`label-text-alt ${postDescription.length > 240 ? "block" : "hidden"} ${postDescription.length > 255 ? "text-error" : "text-success"}`}>{postDescription.length > 255 ? "Description too long - " : ""}{postDescription.length}/255</span>
        </label>
        <input bind:value={postDescription} type="text"  id={"postDescription"} name={"postDescription"} class={"focus:border-primary-focus input input-bordered muted-placeholder"} placeholder={"Write description here.."} />
    </div>
    <!--POST DESCRIPTION END-->
    <!--POST TAGS START-->
    <div class={"w-1/2"}>
        <div class={"form-control"}>
            <label for="postTag" class="label">
                <span class="label-text">Tags</span>
            </label>
            <div class={"flex flex-row space-x-2"}>
                <input bind:value={currentTagText} id={"postTag"} placeholder={"Write tags here.."} on:keydown={onTagInput} type="text" class={"placeholder:italic transition-all focus:border-primary-focus input input-bordered grow muted-placeholder"} />
                <button class={"btn btn-primary"}>
                    <Fa icon={faPlus} class={""} />
                </button>
            </div>            
        </div>
        <div class={"flex flex-row flex-wrap bg-base-200 rounded-lg mt-2 p-2"}>
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
            {:else}
                <div class={"m-auto italic opacity-50"}>
                    No tags yet
                </div>
            {/if}
        </div>
    </div>
    <!--POST TAGS END-->
    <!--POST IMAGE START-->
    <div class={"grow"}>
        picture
    </div>
    <!--POST IMAGE END-->
    <!--POST CONTENT START-->
    <div class={"mt-3 w-full border-[1px] border-base-content border-opacity-20 bg-base-100 transition-all rounded-md focus-within:border-primary-focus"}>
        <MarkdownEditor
            bind:markdownString={postContent}
            bind:showPreview={markdownPreviewOpen}
        />
    </div>
    <!--POST CONTENT END-->
    <div class={"hidden"}>
        <input name={"postContent"} value={postContent} />
    </div>
    <div class={"hidden"}>
        <input name={"postId"} value={postToEdit?.id} />
    </div>
</div>