<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto, invalidate, invalidateAll } from "$app/navigation";
    import Modal from "$components/Modal.svelte";
    import type { ActionData, PageData } from "./$types";
    import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
    import type { Post } from "@prisma/client";
    import Fa from "svelte-fa";
    import axios from "axios";
    import type { SvelteDOMEvent } from "../../../app";
    import Blockable from "$components/Blockable.svelte";

    export let data: PageData;
    export let form: ActionData;

    let createModalOpen = false;
    let canDismissCreateModal = true;
    let newPostTitle = "";

    let deleteModalOpen = false;
    let canDismissDeleteModal = true;

    let postToDelete: Post;

    $: busyRowIds = [-1];

    const onPublishPostToggle = async (event: SvelteDOMEvent<HTMLInputElement>, id: number) => {
        busyRowIds = [...busyRowIds, id];
        const publishRes = await axios.put(`/api/admin/posts/${id}/publish/`, {
            publish: event.currentTarget.checked
        }, {
            validateStatus: () => true
        });

        if (publishRes.status === 200) {
            console.log("got 200, invalidating");
            await invalidateAll();
        } else {
            console.log("not 200 from publish endpoint");
            console.log(publishRes.status);
        }
        busyRowIds = busyRowIds.filter(x => x !== id);
    }

    const onDeletePostClick = (post: Post) =>  {
        postToDelete = post;
        deleteModalOpen = true;
    }

    const deletePost = async (id: string | number) => {
        canDismissDeleteModal = false;
        const deleteRes = await axios.delete("/api/admin/posts/" + id, {
            validateStatus: () => true
        });
        console.log(deleteRes);
        await invalidateAll();
        canDismissDeleteModal = true;
        deleteModalOpen = false;
    }
</script>

<div class={"container mx-auto grid grid-cols-6 mt-20"}>
    <button on:click={() => createModalOpen = true} class={"btn btn-primary gap-2 col-start-6"}>
        <span>New post</span>
        <Fa icon={faPlus} />
    </button>
</div>
<div class={"container mx-auto mt-5"}>
    <table class={"table w-full"}>
        <thead>
            <tr class={"grid grid-cols-12 text-center"}>
                <th class={"col-span-1"}>ID</th>
                <th class={"col-span-7"}>Post title</th>
                <th class={"col-span-2"}>Category</th>
                <th class={"col-span-1"}>Published</th>
                <th class={"col-span-1"}><!--Delete button--></th>
            </tr>
        </thead>
        <tbody>
            {#each data.posts as post(post.id)}
                <Blockable as={"tr"} class={"grid grid-cols-12 text-center hover relative"} blocked={busyRowIds.some(x => x === post.id)}>
                    <td class={"col-span-1 hover flex"}><span class={"m-auto"}>{post.id}</span></td>
                    <td class={"col-span-7 flex"}><a class={"w-full h-full flex"} href={"/admin/posts/" + post.id}><div class={"m-auto"}>{post.title}</div></a></td>
                    <td class={"col-span-2 flex"}><span class={"m-auto"}>{post.category.categoryName}</span></td>
                    <td class={"col-span-1 flex"}><span class={"m-auto"}>
                        <input on:click|preventDefault={(e) => onPublishPostToggle(e, post.id)} type={"checkbox"} checked={post.published ? true : false} class={"checkbox checkbox-primary"} />
                    </td>
                    <td class={"col-span-1 flex"}>
                        <button on:click={() => onDeletePostClick(post)} class={"btn btn-secondary btn-sm m-auto"}>
                            <Fa icon={faTrash} />
                        </button>
                    </td>
                </Blockable>
            {/each}
        </tbody>
    </table>
</div>

<Modal bind:open={deleteModalOpen} bind:canDismiss={canDismissDeleteModal}>
    <div slot="title">Delete post?</div>
    <div slot="content">
        <p class={"mb-5 text-center"}>Are you sure you want to delete post titled: {postToDelete?.title}</p>
        <div class={"flex flex-row justify-around"}>
            <button class={"btn btn-primary w-1/3"} on:click={() => deleteModalOpen = false}>
                Cancel
            </button>
            <button class={"btn btn-secondary w-1/3"} on:click={() => deletePost(postToDelete.id)}>
                Delete
            </button>
        </div>
    </div>
    <div slot="no-dismiss-text">
        Deleting post..
    </div>
</Modal>

<Modal bind:open={createModalOpen} bind:canDismiss={canDismissCreateModal}>
    <div slot="title">Create Post</div>
    <div slot="content">
        <form action="?/createPost" method="POST" use:enhance={async ({  }) => {
            canDismissCreateModal = false;
            return async ({ result, update }) =>{
                if (result.type === "success") {
                    goto(`/admin/posts/${result.data?.newPostId}/edit`);
                } else if (result.type === "failure") {
                    console.log(result);
                    canDismissCreateModal = true;
                    await update();
                }
            }
        }}>
            <div class={"flex flex-col"}>
                <div class={"flex flex-row gap-x-2"}>
                    <div class={"form-control flex-grow"}>
                        <label for="postTitle" class={"label"}>
                            <span class={"label-text"}>Post title</span>
                            {#if form?.errors?.postTitle}
                                <span class={"label-text-alt text-error"}>{form?.errors?.postTitle._errors.join(", ")}</span>
                            {/if}
                        </label>
                        <input class:input-error={form?.errors?.postTitle} bind:value={newPostTitle} name="postTitle" type="text" placeholder="Title" class={"placeholder:text-center text-center input input-bordered w-full"} />
                    </div>
                    <div class={"form-control flex-grow"}>
                        <label for="postCategory" class={"label"}>
                            <span class={"label-text"}>Category</span>
                            {#if form?.errors?.postCategory}
                                <span class={"label-text-alt text-error"}>{form?.errors?.postCategory._errors.join(", ")}</span>
                            {/if}
                        </label>
                        <select name="postCategory" class:select-error={form?.errors?.postCategory} class={"select select-bordered"}>
                            <option selected disabled>Select category</option>
                            {#each data.categories as category}
                                <option value={category.id}>{category.categoryName}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <div class={"divider"}></div>
            <div class={"flex flex-row justify-around"}>
                <button class={"btn btn-primary w-1/3"} type="button" on:click={() => createModalOpen = false}>
                    Cancel
                </button>
                <button class={"btn btn-secondary w-1/3"} type="submit">
                    Create
                </button>
            </div>
        </form>
    </div>
    <div slot="no-dismiss-text">
        Creating post..
    </div>
</Modal>