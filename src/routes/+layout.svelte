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

<div class={"h-[100vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black relative"}>
    <slot />

    <div class={"absolute w-40 gap-y-5 left-0 bottom-10 h-[30vh] flex flex-col-reverse border-r"}>
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
    <div class={"absolute text-sm bottom-0 text-white text-center mx-auto left-0 w-full lobster"}>
        Made with ❤️ using <span class={"text-orange-500"}>Svelte</span>Kit        
    </div>
</div>



