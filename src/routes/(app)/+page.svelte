<script lang="ts">
    import { slide, fly, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing"
    import { onMount } from "svelte";
    import "./../../styles/star-parallax.css";
    import { parallax } from "$lib/utils";

    let loaded: boolean = false;

    onMount(() => {
        const elem: HTMLDivElement | null = document.querySelector("#parallax");
        if (elem)
            document.addEventListener("mousemove", (e: MouseEvent) => parallax(e, elem));
        loaded = true;
    });

    let hoveredSide: "left" | "right" | "none" = "none";

    const onSideHover = (side: "left" | "right") => {
        hoveredSide = side;
    }

    const offSideHover = () => {
        hoveredSide = "none";
    }

</script>

<div in:fade class={""} id={"parallax-root"}>
    <div class="bg-animation z-10">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
    </div>
    <div class={"relative min-h-screen"} id={"parallax"}>
        <div on:mouseenter={() => onSideHover("left")} on:mouseleave={() => offSideHover()} class={`glass absolute top-0 left-0 right-1/2 h-full origin-left bg-transparent z-10 transition-all hover:right-[46%] ${hoveredSide === "right" ? "right-[54%]" : ""}`}>
            &nbsp;
        </div>
        <div on:mouseenter={() => onSideHover("right")} on:mouseleave={() => offSideHover()} class={`glass absolute top-0 right-0 left-1/2 h-full origin-right bg-transparent z-10 transition-all hover:left-[46%] ${hoveredSide === "left" ? "left-[54%]" : ""}`}>
            &nbsp;
        </div>
        <img draggable="false" src={"/me.jpg"} alt="omg me" class={"rounded-full h-96 morphing-shadow w-96 bg-white absolute top-[calc(50%-182px)] left-[calc(50%-182px)] z-30"} />
    </div>
</div>


<style>
    .glass {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2.3px);
        -webkit-backdrop-filter: blur(2.3px);
        border: 1px solid rgba(255, 255, 255, 0.51);
    }
</style>