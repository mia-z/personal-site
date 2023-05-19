<script lang="ts">
    import type { LayoutServerData } from "./$types";
    import { page } from "$app/stores";

    export let data: LayoutServerData;
    
    $: cumulativeParts = $page.url.pathname
        .split("/")
        .reduce((acc: Array<{ location: string, path: string }>, curr) => [ ...acc, { location: curr, path: [ ...acc.map(x => x.location), curr ].join("/") } ], []);
    
</script>

<div class={"absolute top-5 left-5 right-5 h-20 bg-base-100 rounded-md shadow-lg grid grid-cols-5"}>
    <div class={"col-start-3 prose my-auto"}>
        <h1 class={"lobster text-base-content text-center"}><span class={"bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-300 text-transparent"}>A</span>dmin Area</h1>
    </div>
</div>
<div class={"absolute top-28 left-10 right-10 flex flex-col"}>
    <div class={"text-sm breadcrumbs mx-auto"}>
        <ul>
            {#each cumulativeParts as part (part.location)}
                <li>
                    <a href={part.path}>{part.location}</a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<div class={"mt-36 container mx-auto"}>
    <slot />
</div>