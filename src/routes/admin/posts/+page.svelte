<script lang="ts">
    import Modal from "$components/Modal.svelte";
    import type { PageData } from "./$types";
    import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
    import type { Post } from "@prisma/client";
    import Fa from "svelte-fa";

    export let data: PageData;

    let deleteModalOpen = false;
    let canDismissDeleteModal = true;

    let postToDelete: Post | null = null;

    const onPublishPostToggle = async (event: HTMLInputElement, id: string) => {
        console.log(event.checked);
    }

    const onDeletePostClick = (post: Post) =>  {
        postToDelete = post;
        deleteModalOpen = true;
    }

    const deletePost = async (id: string) => {
        canDismissDeleteModal = false;
        const deleteRes = await fetch("/api/admin/posts/" + id, {
            method: "DELETE"
        });
        console.log(deleteRes);
        canDismissDeleteModal = true;
        deleteModalOpen = false;
    }
</script>

<div class={"container mx-auto grid grid-cols-6 mt-20"}>
    <a href={"/admin/posts/editor"} class={"btn btn-primary gap-2 col-start-6"}>
        <span>New post</span>
        <Fa icon={faPlus} />
    </a>
</div>
<div class={"container mx-auto mt-5"}>
    <table class={"table table-zebra w-full"}>
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
                <tr class={"grid grid-cols-12 text-center"}>
                    <td class={"col-span-1 flex"}><span class={"m-auto"}>{post.id}</span></td>
                    <td class={"col-span-7 flex"}><span class={"m-auto"}>{post.title}</span></td>
                    <td class={"col-span-2 flex"}><span class={"m-auto"}>{post.category.categoryName}</span></td>
                    <td class={"col-span-1 flex"}><span class={"m-auto"}>
                        <div class={"form-control"}>
                            <label class={"label cursor-pointer"}>
                                <span class={"label-text"}></span> 
                                <input type={"checkbox"} checked={post.published ? "checked" : ""} class={"checkbox checkbox-primary"} />
                            </label>
                        </div>
                    </td>
                    <td class={"col-span-1 flex"}>
                        <label on:click={() => onDeletePostClick(post)} on:keydown={() => onDeletePostClick(post)} for={"confirm-delete-post-modal"} class={"btn btn-secondary btn-sm m-auto"}><Fa icon={faTrash} />
                    </td>
                </tr>
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