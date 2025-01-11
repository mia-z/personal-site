<script lang="ts">
    import Fa from "svelte-fa";
    import { CurrentProjects } from "../constants";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";

    let loaded: boolean = false;
    
    onMount(() => {
        loaded = true;
    });
</script>

<div class={"flex flex-col relative z-10 sm:h-screen"}>
    <div class="grid grid-cols-1 sm:grid-cols-2 container lg:w-4/5 xl:w-3/5 h-full content-center mx-auto">
        <img transition:fade draggable="false" src={"/me.jpg"} alt={"omg me"} class={"col-span-1 morphing-shadow m-auto w-2/3 sm:w-3/4 lg:w-96 lg:h-96"} />
        <div transition:fade|global class={"col-span-1 select-none flex flex-col mt-10 mx-auto h-full"}>
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
                    {#each CurrentProjects as project}
                        <div class={"flex flex-col mt-4"}>
                            <div class={"text-zinc-100 text-lg hover:text-fuchsia-400 transition-all"}>
                                <a class="underline" href={project.link}>{project.title}</a>{#if project.isCurrent}&nbsp;<span class={"cute-hover-text transition-all no-underline"}>(current)</span>{/if}
                            </div>
                            <div class={"text-sm italic text-zinc-200/90"}>
                                {project.description}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    {#if loaded}
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
