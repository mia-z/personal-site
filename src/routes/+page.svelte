<script lang="ts">
    import { slide, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing"

    let shouldShow = false;
</script>

<div class={"relative flex flex-col h-full"}>
    <img class={`xl:w-72 w-52 z-20 rounded-full mx-auto xl:mt-20 mt-10 transition-transform border-russian-violet-600 border-8 shadow-[0_0_0_20px_rgba(73,23,71,0.4)]`} src={"/me.jpg"} alt="omg, it me !" />
    <div on:animationend={() => shouldShow = true} class={"mt-10 middle-line text-white grid xl:grid-cols-6 grid-cols-2"}>
        <div class={"xl:col-start-3 col-start-1 text-right flex flex-col cursor-default select-none"}>
            {#if shouldShow}
                <div class={"readex mx-3 mb-2"} in:fly={{ delay: 250, duration: 450, easing: quintOut, x: -50 }}>
                    Ryan
                </div>
                <div class={"readex mx-3 mb-2"}  in:fly={{ delay: 450, duration: 450, easing: quintOut, x: -50 }}>
                    Sweden
                </div>
                <div class={"readex mx-3 mb-2"}  in:fly={{ delay: 650, duration: 450, easing: quintOut, x: -50 }}>
                    Systems developer
                </div>
                <div class={"readex mx-3"}  in:fly={{ delay: 850, duration: 450, easing: quintOut, x: -50 }}>
                    Fullstack web
                </div>
            {/if}
        </div>
        <div class={"xl:col-start-4 col-start-2 border-l flex flex-col cursor-default select-none"}>
            {#if shouldShow}
                <div class={"readex mx-3 mb-2"} in:fly={{ delay: 1250, duration: 250, easing: quintOut, x: -50 }}>
                    Projects
                </div>
                <div class={"readex mx-3 mb-2"} in:slide={{ delay: 1500, duration: 250, easing: quintOut }}>
                    <a class={"cursor-pointer underline hover:translate-x-1 transition-transform"} href={"/projects/appstiny"}>Appstiny</a>
                </div>
                <div class={"readex mx-3 mb-2"} in:slide={{ delay: 1600, duration: 250, easing: quintOut }}>
                    <a class={"cursor-pointer underline hover:translate-x-1 transition-transform"} href={"https://github.com/mia-z/spotty-api"} target={"_blank"} rel={"noreferrer noopener"}>Spotty API</a>
                </div>
                <div class={"readex mx-3 mb-2"} in:slide={{ delay: 1700, duration: 250, easing: quintOut }}>
                    <a class={"cursor-pointer underline hover:translate-x-1 transition-transform"} href={"https://github.com/mia-z/buxt"} target={"_blank"} rel={"noreferrer noopener"}>buxt</a>
                </div>
            {/if}
        </div>
    </div>
</div>