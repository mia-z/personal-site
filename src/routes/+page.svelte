<script lang="ts">
    import Fa from "svelte-fa";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";
    
    let shouldAnimate: boolean = false;
    
    
    
    onMount(() => {
        shouldAnimate = true;
    });
</script>

{#if shouldAnimate}
<div class={"flex flex-col relative z-10 h-screen"}>
    <img transition:fade draggable="false" src={"/me.jpg"} alt={"omg me"} class={"morphing-shadow mx-auto mt-3 md:mt-5 lg:mt-15 2xl:mt-20 w-3/4 md:h-64 md:w-64 lg:w-96 lg:h-96"} />
    <div transition:fade class={"prose flex flex-col mt-10 mx-auto h-full"}>
        <div in:fly={{ y: 50 }} class={"text-4xl text-center wix-madefor-text drop-shadow-lg"}><span class={"bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-300 text-transparent"}>r</span>yan</div>
        <div transition:fade class={"flex flex-row gap-x-4 text-primary-content mt-5"}>
            <div class={""} in:fly={{ delay: 400, y: -30, x: 50 }}>
                Fullstack-web
            </div>
            <div class={""} in:fly={{ delay: 550, y: -30, x: -50 }}>
                Systems Developer
            </div>
        </div>
        <div class={"divider my-3"} />
        <div in:fly={{ y: -50 }} class={"action-list text-xl open-sans flex flex-col"}>
            <div class={"p-0 my-2 mx-auto text-base-content"}>
                <a href={"/projects"}>Projects</a>
            </div>
        </div>
        <div class={"flex flex-row gap-x-5 mt-auto mb-5"}>
            <div in:fly={{ x: 50 }} class={"p-0 my-2 ml-auto text-base-content"}>
                <a href={"https://github.com/mia-z"} target={"_blank"} rel={"noreferrer noopener"}>
                    <Fa class={"hover:text-indigo-600 transition-all text-3xl"} icon={faGithub} />
                </a>
            </div>
            <div in:fly={{ x: -50 }} class={"p-0 my-2 mr-auto text-base-content"}>
                <a href={"https://www.linkedin.com/in/ryan-cockram-21a967197"} target={"_blank"} rel={"noreferrer noopener"}>
                    <Fa class={"hover:text-fuchsia-400 transition-all text-3xl"} icon={faLinkedin} />
                </a>
            </div>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .shimmer {
        -webkit-mask: linear-gradient(-60deg, #bc36b7 30%, rgba(174, 22, 194, 0.552), #9a1a9a 70%) right/300% 100%;
        background-repeat: no-repeat;
        animation: shimmer 4s infinite;
    }
    
    @keyframes shimmer {
        0% {-webkit-mask-position:right}
        85% {-webkit-mask-position:right}
        100% {-webkit-mask-position:left}
    }
</style>