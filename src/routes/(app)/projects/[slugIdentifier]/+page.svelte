<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class={"flex flex-col w-full mx-auto container"}>
    <img
        class={"mx-auto rounded-xl shadow-lg antialiased mt-10"}
        alt={data.headerPic?.alt_description}
        src={data.headerPic?.urls.regular ?? ""}
    />
    <div class={"text-center mt-2 flex flex-row mx-auto space-x-2 space-y-2"}>
        <sub class={"my-auto"}>
            Image courtesy of Unsplash - {data.headerPic?.user.first_name}
        </sub>
    </div>
</div>

<div class={"prose p-4 container mx-auto"}>
    {@html data.post.content?.code}
</div>
