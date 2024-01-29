<script lang="ts">
    import Fa from "svelte-fa";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";

    let loaded: boolean = false;

    let leftTextHovered: boolean = false;
    let rightTextHovered: boolean = false;
    
    onMount(() => {
        loaded = true;
        setTimeout(() => {
            leftTextHovered = true;
        }, 600);
        setTimeout(() => {
            rightTextHovered = true;
        }, 750);
    });
</script>

<div class={"flex flex-col relative z-10 h-screen"}>
    <img transition:fade draggable="false" src={"/me.jpg"} alt={"omg me"} class={"morphing-shadow mx-auto mt-3 md:mt-5 lg:mt-15 2xl:mt-20 w-2/3 sm:w-1/2 lg:w-96 lg:h-96"} />
    <div transition:fade|global class={"select-none flex flex-col mt-10 mx-auto h-full"}>
        {#if loaded}
            <div in:fly={{ y: 50 }} class={"text-4xl text-center font-wix-madefor-text drop-shadow-lg text-zinc-200/90"}><span class={"bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-300 text-transparent"}>r</span>yan</div>
            <div transition:fade class={"flex flex-col mt-5"}>
                <div class={"relative text-center cute-hover-text transition-all"}>
                    Systems Engineer
                </div>
                <div class={"relative text-center cute-hover-text transition-all"}>
                    Fullstack-web
                </div>
            </div>
            <div in:fly={{ y: -50 }} class={"flex flex-col mt-5 text-center"}>
                <div class={"mx-auto semi-bold transition-all text-2xl text-zinc-200/90"}>
                    Projects
                </div>
                <div class={"flex flex-col mt-4"}>
                    <div class={"text-zinc-100 underline text-lg hover:text-fuchsia-400 transition-all"}>
                        <a href={"https://github.com/mia-z/dgg-capacitor-app"}>dgg-capacitor-app</a>
                    </div>
                    <div class={"text-sm italic text-zinc-200/90"}>
                        cross platform mobile app for destiny.gg, made with Capacitor.
                    </div>
                </div>
                <div class={"flex flex-col mt-4"}>
                    <div class={"text-zinc-100 text-lg hover:text-fuchsia-400 transition-all"}>
                        <a class={"underline"} href={"https://github.com/mia-z/capacitor-websocket"}>capacitor-websocket</a>
                    </div>
                    <div class={"text-sm italic text-zinc-200/90"}>
                        websocket plugin for capacitor that uses <br/>native implementations for iOS, Android and Web.
                    </div>
                </div>
                <div class={"flex flex-col mt-4"}>
                    <div class={"text-zinc-100 text-lg hover:text-fuchsia-400 transition-all"}>
                        <a class={"underline"} href={"https://github.com/mia-z/capacitor-websocket"}>omnichat-overlay</a>&nbsp;<span class={"cute-hover-text transition-all"}>(current)</span>
                    </div>
                    <div class={"text-sm italic text-zinc-200/90"}>
                        cross platform desktop app for providing an overlay<br/> for multiple chat sources for streaming applications.
                    </div>
                </div>
            </div>
            <div class={"flex flex-row gap-x-5 mt-auto mb-5"}>
                <div in:fly={{ x: -50 }} class={"p-0 my-2 ml-auto"}>
                    <a href={"https://github.com/mia-z"} target={"_blank"} rel={"noreferrer noopener"}>
                        <Fa class={"text-white hover:text-indigo-600 transition-all text-3xl"} icon={faGithub} />
                    </a>
                </div>
                <div in:fly={{ x: 50 }} class={"p-0 my-2 mr-auto"}>
                    <a href={"https://www.linkedin.com/in/ryan-cockram-21a967197"} target={"_blank"} rel={"noreferrer noopener"}>
                        <Fa class={"text-white hover:text-fuchsia-400 transition-all text-3xl"} icon={faLinkedin} />
                    </a>
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    :root {
        @apply bg-zinc-900 font-nunito;
    }
</style>