<script lang="ts">
    import { faPenToSquare, faChartBar, faHouseUser, faRightFromBracket, faHamburger, faBars } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { page } from "$app/stores";

    let drawerOpen: boolean = true;
</script>

<div class={"drawer lg:drawer-open"}>
    <input bind:value={drawerOpen} id={"sidebar-drawer"} type="checkbox" class={"drawer-toggle"} />
    <div class={"drawer-content flex flex-col px-2 container mx-auto"}>
        <div class={"navbar bg-base-200 rounded-2xl mt-2 shadow-lg"}>
            <div class={"flex-none"}>
                <label for={"sidebar-drawer"} class={"lg:invisible btn btn-square btn-ghost"}>
                    <Fa icon={faBars} size={"2x"} />
                </label>
            </div>
            <div class={"flex-1"}>
                <div class={"mx-auto btn btn-ghost normal-case text-2xl lobster"}>Admin</div>
            </div>
        </div>
        <div class={"flex flex-col py-2"}>
            <slot />
        </div>
    </div> 
    <div class={"drawer-side"}>
        <label for={"sidebar-drawer"} class={"drawer-overlay"}></label>
        <div class={"min-h-full bg-base-200 text-base-content flex flex-col w-80 py-4"}>
            <div class={"p-3 relative flex mask mask-squircle bg-primary"}>
                <div class={"absolute top-0 left-0 w-full h-full glass opacity-20"}></div>
                <img class={"w-20 m-auto"} src={"https://www.nevicar.com/imgs/wowee.png"} alt={"Wowee!"} />
            </div>
            <ul class={"menu menu-lg p-4 font-bold font-wix"}>
                <li><a href={"/admin/index"} class:active={$page.url.pathname.includes("index")}><Fa icon={faHouseUser} />Index</a></li>
                <li><a href={"/admin/posts"} class:active={$page.url.pathname.includes("posts")}><Fa icon={faPenToSquare} />Posts</a></li>
                <li><a href={"/admin/categories"} class:active={$page.url.pathname.includes("categories")}><Fa icon={faChartBar} />Categories</a></li>
            </ul>
            <ul class={"menu p-4 mt-auto"}>
                <li class={"mt-auto "}><a class={"hover:bg-error hover:text-error-content"} href={"/admin"}><Fa class={"rotate-180"} icon={faRightFromBracket} />Log out</a></li>
            </ul>
        </div>
    </div>
</div>

