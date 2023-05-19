<script lang="ts">
    import Fa from "svelte-fa";
    import { faPenToSquare, faBarsStaggered, faPlus } from "@fortawesome/free-solid-svg-icons";
</script>

<div class={"flex flex-row flex-wrap justify-center gap-x-5 mt-20"}>
    <a href={"/admin/posts"} class={"w-1/6 h-44 flex flex-col bg-primary hover:bg-primary-focus rounded-md shadow-lg transition-all hover:cursor-pointer active:bg-primary"}>
        <Fa class={"text-primary-content mt-auto text-5xl"} icon={faPenToSquare} />
        <span class={"open-sans text-primary-content text-center mb-auto text-xl"}>Posts</span>
    </a>
    <a href={"/admin/categories"} class={"w-1/6 flex flex-col h-44 bg-primary hover:bg-primary-focus rounded-md shadow-lg transition-all hover:cursor-pointer active:bg-primary"}>
        <Fa class={"text-primary-content mt-auto text-5xl"} icon={faBarsStaggered} />
        <span class={"open-sans text-primary-content text-center mb-auto text-xl"}>Categories</span>
    </a>
</div>
