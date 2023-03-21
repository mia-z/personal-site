<script lang="ts">
    import type { SwiperContainer } from "swiper/element/bundle";
    import Image from "../../../components/Image.svelte";
    import FaArrowRight from "svelte-icons/fa/FaArrowRight.svelte"

    let swiper: typeof SwiperContainer;

</script>

<div class={"flex flex-col overflow-y-scroll"}>
    <swiper-container class={"w-44 md:w-64 select-none"} bind:this={swiper} effect={"cards"}>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss1.png"} />
        </swiper-slide>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss2.png"} />
        </swiper-slide>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss3.png"} />
        </swiper-slide>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss4.png"} />
        </swiper-slide>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss5.png"} />
        </swiper-slide>
        <swiper-slide>
            <Image src={"/assets/appstiny/ss6.png"} />
        </swiper-slide>
    </swiper-container>
    <div class={"mt-3 flex flex-row justify-center text-white"}>
        <div class={"mr-5 lobster"}>
            Swipe!
        </div>
        <div class={"w-5"}>
            <FaArrowRight />
        </div>
    </div>
    <div class={"h-10 flex my-10 mb-20"}>
        <a class={"mx-auto"} href={"https://play.google.com/store/apps/details?id=com.miaz.dgg"} target={"_blank"}>
            <img class={"h-20 "} src={"/en_badge_web_generic.png"} alt={"play store badge"} />
        </a>
    </div>
</div>