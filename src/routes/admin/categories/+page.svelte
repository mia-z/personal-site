<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto, invalidateAll } from "$app/navigation";
    import Modal from "$components/Modal.svelte";
    import type { Category, CategoryPayload, Post } from "@prisma/client";
    import axios from "axios";
    import type { ActionData, PageServerData } from "./$types";
    import Fa from "svelte-fa";
    import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
    import type { SvelteDOMEvent } from "../../../app";

    export let data: PageServerData;
    export let form: ActionData;

    let newCategoryName = "";
    let createModalOpen = false;    
    let canDismissCreateModal = true;

    let deleteModalOpen = false;
    let canDismissDeleteModal = true;
    let categoryToDelete: Category & { posts: Post[] }

    const onDeleteCategoryClick = async (category: Category & { posts: Post[] }) => {
        categoryToDelete = category;
        deleteModalOpen = true;
    }

    const deleteCategory = async (id: number) => {
        canDismissDeleteModal = false;
        const deleteRes = await axios.delete("/api/admin/categories/" + id, {
            validateStatus: () => true
        });
        console.log(deleteRes);
        await invalidateAll();
        canDismissDeleteModal = true;
        deleteModalOpen = false;
    }
</script>

<div class={"flex flex-col mt-10 w-96 mx-auto bg-base-200 p-3 rounded-lg shadow-lg"}>
    <button class={"btn btn-primary"} on:click={() => createModalOpen = true}>
        Add new Category
    </button>
    <div class={"mt-5 flex flex-col space-y-2"}>
        {#each data?.categories as category}
            <div class={"rounded-lg group bg-base-100 hover:bg-base-200 transition-all text-base-content flex flex-row"}>
                <div class={"grow"}>
                    <div class="stat">
                        <div class="stat-title">{category.categoryName}</div>
                        <div class="stat-value">{category.posts.length}</div>
                        <div class="stat-desc">Post(s) with this tag</div>
                    </div>
                </div>
                <button on:click={() => onDeleteCategoryClick(category)} class={"w-20 bg-primary rounded-r-lg flex hover:bg-primary-focus transition-all hover:cursor-pointer active:bg-red-400"}>
                    <Fa icon={faTrashCan} class={"m-auto text-xl text-primary-content"} />
                </button>
            </div>
        {/each}
    </div>
</div>


<Modal bind:open={deleteModalOpen} bind:canDismiss={canDismissDeleteModal}>
    <div slot="title">Delete Category?</div>
    <div slot="content">
        {#if categoryToDelete.posts.length > 0}
            <p class={"mb-5 text-center"}>
                Cannot delete category that has projects connected to it: <br />
                <span class={"font-bold"}>{categoryToDelete?.posts.map(x => x.title).join(", ")}</span>
            </p>
        {:else}
            <p class={"mb-5 text-center"}>Are you sure you want to delete Category titled: {categoryToDelete?.categoryName}</p>
        {/if}
        <div class={"flex flex-row justify-around"}>
            <button class={"btn btn-primary w-1/3"} on:click={() => deleteModalOpen = false}>
                Cancel
            </button>
            <button disabled={categoryToDelete.posts.length > 0} class={"btn btn-secondary w-1/3"} on:click={() => deleteCategory(categoryToDelete.id)}>
                Delete
            </button>
        </div>
    </div>
    <div slot="no-dismiss-text">
        Deleting Category..
    </div>
</Modal>

<Modal bind:open={createModalOpen} bind:canDismiss={canDismissCreateModal}>
    <div slot="title">Create Category</div>
    <div slot="content">
        <form action="?/createCategory" method="POST" use:enhance={async ({  }) => {
            canDismissCreateModal = false;
            return async ({ result, update }) =>{
                if (result.type === "success") {
                    await invalidateAll();
                    canDismissCreateModal = true;
                    createModalOpen = false;
                } else if (result.type === "failure") {
                    console.log("Create result was failure:");
                    console.log(result);
                    canDismissCreateModal = true;
                    await update();
                } else {
                    console.log("Create result was error:");
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
                            <span class={"label-text"}>Category name</span>
                            {#if form?.errors?.categoryName}
                                <span class={"label-text-alt text-error"}>{form?.errors?.categoryName._errors.join("")}</span>
                            {/if}
                        </label>
                        <input class:input-error={form?.errors?.categoryName} bind:value={newCategoryName} name="categoryName" type="text" placeholder="Name" class={"placeholder:text-center text-center input input-bordered w-full"} />
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