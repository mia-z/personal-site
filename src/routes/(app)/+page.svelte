<script lang="ts">
    import Fa from "svelte-fa";
    import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
</script>

<div class={"flex flex-col relative z-10"}>
    <img draggable="false" src={"/me.jpg"} alt={"omg me"} class={"morphing-shadow mx-auto mt-20 h-96 w-96"} />
    <div class={"prose flex flex-col mt-10 mx-auto"}>
        <h1 class={" text-center wix-madefor-text drop-shadow-lg"}><span class={"bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-300 text-transparent"}>R</span>yan/miaz</h1>
        <hr class={"my-3"} />
        <li class={"action-list list-none text-xl open-sans flex flex-col"}>
            <ul>Skills</ul>
            <ul>Projects</ul>
            <ul>
                <a href={"https://github.com/mia-z"} target={"_blank"} rel={"noreferrer noopener"}>
                    <Fa class={"hover:text-indigo-600 transition-all text-3xl"} icon={faGithub} />
                </a>
            </ul>
            <ul class={"p-0 my-2 mx-auto text-base-content"}>
                <a href={"https://www.linkedin.com/in/ryan-cockram-21a967197"} target={"_blank"} rel={"noreferrer noopener"}>
                    <Fa class={"hover:text-fuchsia-400 transition-all text-3xl"} icon={faLinkedin} />
                </a>
            </ul>
            
        </li>
    </div>
</div>