<script>
    import "../styles/tw.css";
    import "../styles/globals.scss";

    import IoLogoGithub from "svelte-icons/io/IoLogoGithub.svelte";
    import IoLogoLinkedIn from "svelte-icons/io/IoLogoLinkedin.svelte";
</script>

<svelte:head>
    <title>
        miaz dev
    </title>
</svelte:head>

<div class={"min-h-[100vh] flex flex-col md:h-[100vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black relative"}>
    <slot />

    <div class={"absolute w-32 top-5 left-5 xl:w-40 md:w-20 gap-y-5 md:top-auto md:left-0 md:bottom-10 xl:h-[30vh] md:h-[20vh] flex flex-row md:flex-col-reverse md:border-r"}>
        <div class={"flex w-1/3 mx-auto text-[#dedede] mb-5 hover:text-white cursor-pointer transition-colors"}>
            <a href={"https://github.com/mia-z"} target={"_blank"} rel={"noreferrer noopener"}>
                <IoLogoGithub />
            </a>
        </div>
        <div class={"flex w-1/3 mx-auto text-[#dedede] hover:text-linked-in-blue cursor-pointer transition-colors"}>
            <a href={"https://www.linkedin.com/in/ryan-cockram-21a967197"} target={"_blank"} rel={"noreferrer noopener"}>
                <IoLogoLinkedIn />
            </a>
        </div>
    </div>
    <div class={"mt-auto text-white text-center mx-auto left-0 w-full lobster"}>
        Made with ❤️ using <span class={"text-orange-500"}>Svelte</span>Kit        
    </div>
</div>



