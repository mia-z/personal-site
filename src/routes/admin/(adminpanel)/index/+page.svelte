<script lang="ts">
    import Fa from "svelte-fa";
    import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div class={"grid grid-cols-3 gap-2 grid-flow-row"}>
    <div class={"rounded-2xl shadow-lg h-40 col-span-1 bg-base-200 flex flex-col p-5 top-trim"}>
        <div class={"font-wix font-bold"}>
            Posts
        </div>
        <div class={"flex h-full"}>
            <div class={"flex-1 flex flex-col"}>
                <div class={"h-full grid"}>
                    <div class={"text-center my-auto text-6xl text-secondary"}>
                        {data?.publishedCount}
                    </div>
                </div>
                <div class={"text-center text-sm font-wix italic"}>
                    published
                </div>
            </div>
            <div class={"divider divider-horizontal"} />
            <div class={"flex-1 flex flex-col"}>
                <div class={"flex-1 h-full flex justify-center"}>
                    <div class={"text-center my-auto text-6xl text-secondary"}>
                        {data?.unpublishedCount}
                    </div>
                </div>
                <div class={"flex-none"}>
                    <div class={"text-center text-sm font-wix italic"}>
                        unpublished
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class={"rounded-2xl shadow-lg h-40 col-span-1 bg-base-200"}>

    </div>
    <div class={"rounded-2xl shadow-lg h-40 col-span-1 bg-base-200"}>

    </div>
    <div class={"rounded-2xl shadow-lg h-40 col-span-1 bg-base-200"}>

    </div>
</div>

<style lang="scss">
    .top-trim {
        position: relative;
        overflow: hidden;

        &::after {
            @apply absolute w-full h-1 bg-primary;
            content: "";
            top: 0;
            left: 0;
        }
    }
</style>