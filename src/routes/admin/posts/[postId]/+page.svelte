<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
    import type { PageData } from "./$types";

    export let data: PageData;

</script>

<a href={`/admin/posts/${data.post?.id}/edit`} class={"fixed  btn btn-primary"}>
    Edit
</a>

<div class={"prose container mx-auto mt-5"}>
    <SvelteMarkdown source={data.post?.content} />
</div>