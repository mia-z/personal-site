<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
</script>

<div class={"m-5 h-20 bg-base-100 rounded-md shadow-lg grid grid-cols-5"}>
    <div class={"col-start-3 prose my-auto"}>
        <h1 class={"lobster text-base-content text-center pink-first-letter"}>Projects</h1>
    </div>
</div>

<div class={"container mx-auto flex flex-col"}>
    {#each data.posts as post}
        <a href={`/projects/${post.slugIdentifier}`} >{post.title}</a>
    {/each}
</div>