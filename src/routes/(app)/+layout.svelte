<script lang="ts">
    import Fa from "svelte-fa";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<div class={"min-h-[100vh] flex flex-col bg-base-300 relative"}>
    <slot />

    <!-- <div class={"absolute w-16 top-5 left-5 xl:w-20 md:w-16 gap-y-5 md:top-auto md:left-0 md:bottom-10 xl:h-[30vh] md:h-[20vh] flex flex-row md:flex-col-reverse md:border-r"}>
        <div class={"flex w-1/2 mx-auto text-[#dedede] mb-5 hover:text-white cursor-pointer transition-colors"}>
            <a href={"https://github.com/mia-z"} target={"_blank"} rel={"noreferrer noopener"}>
                <Fa class={"text-3xl"} icon={faGithub} />
            </a>
        </div>
        <div class={"flex w-1/2 mx-auto text-[#dedede] hover:text-linked-in-blue cursor-pointer transition-colors"}>
            <a href={"https://www.linkedin.com/in/ryan-cockram-21a967197"} target={"_blank"} rel={"noreferrer noopener"}>
                <Fa class={"text-3xl"} icon={faLinkedin} />
            </a>
        </div>
    </div>
    <div class={"mt-auto text-white text-center mx-auto left-0 w-full lobster"}>
        Made with ❤️ using <span class={"text-orange-500"}>Svelte</span>Kit        
    </div> -->
</div>



