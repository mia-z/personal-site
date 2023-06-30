<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div>
    {#each data.posts as post}
        {post.title}
    {/each}
</div>