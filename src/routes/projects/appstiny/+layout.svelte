<script lang="ts">
    import { register } from "swiper/element/bundle";

    register();
</script>

<div class={"container mx-auto flex flex-col"}>
    <div class={"flex flex-row mx-auto my-10"}>
        <div class={"my-auto lobster text-[#dedede] text-5xl border-r-2 border-white mr-2 pr-2"}>
            <span class={"A"}>A</span>ppstiny
        </div>
        <img class={"h-20 w-20 rounded-2xl"} src={"/assets/appstiny/play_store.png"} alt={"Store logo for Appstiny"} />
    </div>
    <slot />
    <div class={"flex flex-row  mt-auto justify-center w-full text-center"}>
        <a href={"/projects/appstiny"} class={" text-white underline"}>
            Project Home
        </a>
    
        <div class={"mx-5 border-l-2 border-l-white"} />
    
        <a href={"/projects/appstiny/about"} class={" text-white underline "}>
            About/Privacy
        </a>
    </div>
</div>

<style>
    span.A {
        background-clip: text;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        font-size: 3.5rem;
        background: linear-gradient(101deg, rgba(222,222,222,1) 0%, rgba(222,222,222,1) 75%, rgb(53, 91, 218) 76%, rgb(53, 91, 218) 100%);
    }
</style>