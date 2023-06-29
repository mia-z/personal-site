<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import Fa from "svelte-fa";
    import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
    
    export let blocked: boolean = false;
</script>

<svelte:element this={$$props.as} {...$$props} class={"relative " + $$props.class}>
    {#if blocked}
        <div role={"dialog-backdrop"} transition:fade class={`absolute top-0 cursor-wait left-0 h-full w-full animate-pulse bg-gray-700 rounded-md`}>
            {#if $$slots.blockerContent}
                <slot name="blockerContent" />
            {:else}
                <div class={"flex flex-row h-full w-full"}>
                    <div class={"my-auto ml-auto mr-2 flex text-white"}>
                        <slot name="blockInfoText">
                            Loading
                        </slot>
                    </div>
                    <div class={"my-auto mr-auto ml-2 flex"}>
                        <span class={"loading loading-spinner my-auto"}></span>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
    <slot {blocked} />
</svelte:element>