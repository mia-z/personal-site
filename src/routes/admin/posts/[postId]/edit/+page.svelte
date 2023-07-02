<script lang="ts">
    import MarkdownEditor from "$components/MarkdownEditor.svelte";
    import Fa from "svelte-fa";
    import { faArrowLeft, faBook, faSave, faCircleXmark, faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
    import type { ActionData, PageServerData } from "./$types";
    import axios from "axios";
    import { errorToast, notifyToast, successToast } from "$lib/toast";
    import { fade, fly } from "svelte/transition";
    import type { SvelteDOMEvent } from "../../../../../app";
    import { invalidateAll } from "$app/navigation";

    export let data: PageServerData;
    export let form: ActionData;

    let categories = data.categories;
    let postToEdit = data.postToEdit;

    let markdownPreviewOpen: boolean;

    let currentTagText = "";

    let postTitle = postToEdit?.title ?? "";
    let postContent = postToEdit?.content ?? "";
    let postCategory = categories.find(x => x.id === postToEdit?.categoryId) ?? { id: -1 };
    $: postTags = (data.postToEdit?.tags && data.postToEdit?.tags.length > 0) ? data.postToEdit?.tags : [];
    let postDescription = postToEdit?.description ?? "";
    let postImageType = postToEdit?.imageType ?? "BASE64";
    let postImageData = postToEdit?.imageData ?? "";

    let postFileData: string;
    let postFileDataFilename: string;

    let savingPost = false;

    const onTagInput = async (ev: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
        if (ev.key === "Enter") {
            await onSaveTag();
        }
    }

    const onSaveTag = async () => {
        const saveTagRes = await axios.post(`/api/admin/posts/${postToEdit.id}/tag`, {
            text: currentTagText
        }, {
            validateStatus: () => true
        });
        currentTagText = "";
        console.log(saveTagRes);
        await invalidateAll();
    }

    const onTagRemove = async (tagId: number) => {
        const saveTagRes = await axios.delete(`/api/admin/posts/${postToEdit.id}/tag/${tagId}`, {
            validateStatus: () => true
        });
        currentTagText = "";
        console.log(saveTagRes);
        await invalidateAll();
    }

    const savePost = async () => {
        if (clientPayloadValidator()) {
            savingPost = true;
            const saveRes = await axios.put("/api/admin/posts/" + postToEdit?.id, {
                content: postContent,
                categoryId: postCategory?.id,
                title: postTitle,
                description: postDescription,
                imageData: postImageData,
                imageType: postImageType
            });
            savingPost = false;
            successToast("Saved post!");
            console.log(saveRes.status);
        }   
    }

    const onPostImageUpload = async (event: SvelteDOMEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            switch (event.currentTarget.files[0].type) {
                case "image/png":
                case "image/jpg":
                case "image/jpeg": console.log("Good image"); break;
                default: errorToast("Please pick only png or jpeg images."); return;
            }
            const f = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    postImageData = reader.result as string; //coercion needed here because TS couldnt infer the .valueOf()==="string" ???
                    postFileData = postImageData;
                    postFileDataFilename = f.name
                    successToast("Image uploaded");
                } else {
                    errorToast("Bad image, try again.");
                }
                
            }
            reader.readAsDataURL(f);
        }
    }

    const clientPayloadValidator = (): boolean => {
        if (postTitle.length < 1) {
            errorToast("Must enter a post title");
            return false;
        }

        if (postTitle.length > 64) {
            errorToast("Post title too long");
            return false;
        }

        if (postDescription.length > 255) {
            errorToast("Post description too long");
            return false;
        }
        return true;
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
                <button on:click={() => onSaveTag()} class={"btn btn-primary m-auto"}>
                    <Fa icon={faPlus} class={""} />
                </button>
            </div>            
        </div>
        <div class={"flex flex-row flex-wrap bg-base-200 rounded-lg mt-2 p-2 min-h-12"}>
            {#if postTags.length > 0}
                <div class={"col-span-1 flex flex-row flex-wrap p-3 gap-2 justify-center"}>
                    {#each postTags as tag}
                        <div class={"badge badge-secondary gap-2"}>
                            {tag.text}
                            <button on:click={() => onTagRemove(tag.id)} on:keydown={() => onTagRemove(tag.id)}>
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
        <div class={"form-control"}>
            <label for="postTag" class="label">
                <span class="label-text">Picture</span>
            </label>
            <div class={"flex flex-col rounded-lg bg-base-200 min-h-[6.5rem] transition-all"}>
                <div class={"tabs tabs-boxed rounded-b-none flex flex-row justify-around"}>
                    <a on:click={() => {postImageType = "LINK"; postImageData = ""}} href={"#"} class:tab-active={postImageType === "LINK"} class={`tab transition-all`}>Link</a> 
                    <a on:click={() => {postImageType = "BASE64"; if (postFileData) postImageData = postFileData;}} href={"#"} class:tab-active={postImageType === "BASE64"} class={`tab transition-all`}>Upload Image</a> 
                </div>
                {#if postImageType === "LINK"}
                    <div class={"h-full p-2 flex flex-col"}>
                        <input bind:value={postImageData} type="text" placeholder={"Enter image uri.."} class={"focus:border-primary-focus input input-bordered muted-placeholder"} />
                    </div>
                {:else}
                    <div class={"h-full flex flex-col p-2"}>
                        <input id={"post-image-upload"} type={"file"} on:change={onPostImageUpload} class={"hidden"} />
                        <label for={"post-image-upload"} placeholder={"Enter image uri.."} class={"btn btn-primary"}>Upload</label>
                        {#if postFileDataFilename}
                            <div class={"mx-auto text-sm italic"}>
                                {postFileDataFilename}
                            </div>
                        {/if}

                    </div>
                {/if}
                {#if postImageData && postImageData !== ""}
                    <img src={postImageData} class={"w-28 m-auto my-3"} alt={"The image you linked above"} />
                {/if}
            </div>            
        </div>
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
</div>

<style lang="scss">
    .tabs-boxed {
        @apply bg-base-100;
    }
</style>