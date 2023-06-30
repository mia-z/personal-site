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
    });
</script>

<div class={"flex flex-col relative z-10 h-screen"}>
    <img transition:fade draggable="false" src={"/me.jpg"} alt={"omg me"} class={"morphing-shadow mx-auto mt-3 md:mt-5 lg:mt-15 2xl:mt-20 w-3/4 md:h-64 md:w-64 lg:w-96 lg:h-96"} />
    <div transition:fade|global class={"prose flex flex-col mt-10 mx-auto h-full"}>
        {#if loaded}
            <div in:fly={{ y: 50 }} class={"text-4xl text-center wix-madefor-text drop-shadow-lg"}><span class={"bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-300 text-transparent"}>r</span>yan</div>
            <div transition:fade class={"flex flex-row gap-x-4 text-primary-content mt-5"}>
                <div class={"underline relative cursor-pointer cute-hover-text transition-all"} on:mouseenter={() => leftTextHovered = true} on:mouseleave={() => leftTextHovered = false} in:fly={{ delay: 400, y: -30, x: 50 }}>
                    Fullstack-web
                    {#if leftTextHovered}
                        <div class={"text-primary-content cursor-default absolute top-0 left-0"}>
                            <div in:fly={{ x: 30 }} out:fly={{ x: 50 }} class={"absolute -left-32 top-0"}>
                                React/NextJS
                            </div>
                            <div in:fly={{ y: 15, x: 30, delay: 100 }} out:fly={{ y: 15, x: 30 }} class={"absolute -left-10 -top-7"}>
                                Svelte/Svelte<span class={"text-orange-400"}>Kit</span>
                            </div>
                            <div in:fly={{ y: 15, x: 30, delay: 200 }} out:fly={{ y: 45, x: 40 }} class={"absolute -left-36 -top-14"}>
                                Razor Pages/<span class={"text-purple-400"}>MVC</span>
                            </div>
                            <div in:fly={{ y: 25, x: 10, delay: 300 }} out:fly={{ y: 65, x: 15 }} class={"absolute -left-14 -top-20"}>
                                <span class={"text-green-400"}>NodeJS</span>/Deno/BunJS
                            </div>
                        </div>
                    {/if}
                </div>
                <div class={"underline relative cursor-pointer cute-hover-text transition-all"} on:mouseenter={() => rightTextHovered = true} on:mouseleave={() => rightTextHovered = false} in:fly={{ delay: 550, y: -30, x: -50 }}>
                    Systems Developer
                    {#if rightTextHovered}
                        <div class={"text-primary-content cursor-default absolute top-0 right-0"}>
                            <div in:fly={{ x: -30 }} out:fly={{ x: -50 }} class={"absolute left-2 top-0 w-64"}>
                                <span class={"text-purple-600"}>C#</span>/.Net Framwork/Core
                            </div>
                            <div in:fly={{ y: 15, x: -30, delay: 100 }} out:fly={{ y: 15, x: -30 }} class={"absolute -left-20 -top-7"}>
                                SQL/<span class={"text-red-500"}>Redis</span>/GraphQL
                            </div>
                            <div in:fly={{ y: 15, x: -30, delay: 200 }} out:fly={{ y: 45, x: -40 }} class={"absolute -left-4 -top-14 w-40"}>
                                <span class={"text-blue-400"}>Docker</span>/Kubernetes
                            </div>
                            <div in:fly={{ y: 25, x: -10, delay: 300 }} out:fly={{ y: 65, x: -15 }} class={"absolute -left-20 -top-20 w-64"}>
                                MS Azure/<span class={"text-blue-400"}>G</span><span class={"text-red-400"}>o</span><span class={"text-yellow-400"}>o</span><span class={"text-blue-400"}>g</span><span class={"text-green-400"}>l</span><span class={"text-red-400"}>e</span> Cloud
                            </div>
                        </div>
                    {/if}
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

        {/if}
    </div>
</div>


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