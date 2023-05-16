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
        <div on:mouseenter={() => onSideHover("left")} on:mouseleave={() => offSideHover()} class={`overflow-y-scroll styled-scrollbars glass absolute top-0 left-0 right-1/2 h-full origin-left bg-transparent z-10 transition-all hover:right-[46%] ${hoveredSide === "right" ? "right-[54%]" : ""}`}>
            {#if hoveredSide === "left"}
                <div transition:fade={{ duration: 200 }} class={"prose w-[calc(100vw/2)] p-3"}>
                    <h1>One morning, when Gregor Samsa woke from troubled dreams.</h1>
                    <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into 
                        a horrible vermin. He lay on his armour-like back, 
                        and if he lifted his head a little he could see his 
                        brown belly, slightly domed and divided by arches into 
                        stiff sections. The bedding was hardly able to cover 
                        <strong>strong</strong> it and seemed ready to slide 
                        off any moment. His many legs, pitifully thin 
                        compared with the size of the rest of him, 
                        <a class="external ext" href="#">link</a> waved about 
                        helplessly as he looked. "What's happened to me? " he 
                        thought. It wasn't a dream. His room, a proper human 
                        room although a little too small, lay peacefully 
                        between its four familiar walls.</p>
                        
                        
                        <h1>One morning, when Gregor Samsa woke from troubled 
                        dreams.</h1>
                        
                        
                        <h2>The bedding was hardly able to cover it.</h2>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <h2>The bedding was hardly able to cover it.</h2>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <ul>
                        <li>Lorem ipsum dolor sit amet consectetuer.</li>
                        <li>Aenean commodo ligula eget dolor.</li>
                        <li>Aenean massa cum sociis natoque penatibus.</li>
                        </ul>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <form action="#" method="post">
                        <fieldset class={"flex flex-col"}>
                            <label for="name">Name:</label>
                            <input type="text" id="name" placeholder="Enter your full name" />
                        
                            <label for="email">Email:</label>
                            <input type="email" id="email" placeholder="Enter your email address" />
                        
                            <label for="message">Message:</label>
                            <textarea id="message" placeholder="What's on your mind?"></textarea>
                        
                            <input type="submit" value="Send message" />
                        
                        </fieldset>
                        </form>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <table class="data">
                        <tr>
                            <th>Entry Header 1</th>
                            <th>Entry Header 2</th>
                            <th>Entry Header 3</th>
                            <th>Entry Header 4</th>
                        </tr>
                        <tr>
                            <td>Entry First Line 1</td>
                            <td>Entry First Line 2</td>
                            <td>Entry First Line 3</td>
                            <td>Entry First Line 4</td>
                        </tr>
                        <tr>
                            <td>Entry Line 1</td>
                            <td>Entry Line 2</td>
                            <td>Entry Line 3</td>
                            <td>Entry Line 4</td>
                        </tr>
                        <tr>
                            <td>Entry Last Line 1</td>
                            <td>Entry Last Line 2</td>
                            <td>Entry Last Line 3</td>
                            <td>Entry Last Line 4</td>
                        </tr>
                        </table>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                </div>
            {/if}
        </div>
        <div on:mouseenter={() => onSideHover("right")} on:mouseleave={() => offSideHover()} class={`overflow-y-scroll styled-scrollbars glass absolute top-0 right-0 left-1/2 h-full origin-right bg-transparent z-10 transition-all hover:left-[46%] ${hoveredSide === "left" ? "left-[54%]" : ""}`}>
            {#if hoveredSide === "right"}
                <div transition:fade={{ duration: 200 }} class={"ml-auto text-right prose w-[calc(100vw/2)] p-3"}>
                    <h1>One morning, when Gregor Samsa woke from troubled dreams.</h1>
                    <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into 
                        a horrible vermin. He lay on his armour-like back, 
                        and if he lifted his head a little he could see his 
                        brown belly, slightly domed and divided by arches into 
                        stiff sections. The bedding was hardly able to cover 
                        <strong>strong</strong> it and seemed ready to slide 
                        off any moment. His many legs, pitifully thin 
                        compared with the size of the rest of him, 
                        <a class="external ext" href="#">link</a> waved about 
                        helplessly as he looked. "What's happened to me? " he 
                        thought. It wasn't a dream. His room, a proper human 
                        room although a little too small, lay peacefully 
                        between its four familiar walls.</p>
                        
                        
                        <h1>One morning, when Gregor Samsa woke from troubled 
                        dreams.</h1>
                        
                        
                        <h2>The bedding was hardly able to cover it.</h2>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <h2>The bedding was hardly able to cover it.</h2>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <ul>
                        <li>Lorem ipsum dolor sit amet consectetuer.</li>
                        <li>Aenean commodo ligula eget dolor.</li>
                        <li>Aenean massa cum sociis natoque penatibus.</li>
                        </ul>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <form action="#" method="post">
                        <fieldset class={"flex flex-col"}>
                            <label for="name">Name:</label>
                            <input type="text" id="name" placeholder="Enter your full name" />
                        
                            <label for="email">Email:</label>
                            <input type="email" id="email" placeholder="Enter your email address" />
                        
                            <label for="message">Message:</label>
                            <textarea id="message" placeholder="What's on your mind?"></textarea>
                        
                            <input type="submit" value="Send message" />
                        
                        </fieldset>
                        </form>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                        
                        <table class="data">
                        <tr>
                            <th>Entry Header 1</th>
                            <th>Entry Header 2</th>
                            <th>Entry Header 3</th>
                            <th>Entry Header 4</th>
                        </tr>
                        <tr>
                            <td>Entry First Line 1</td>
                            <td>Entry First Line 2</td>
                            <td>Entry First Line 3</td>
                            <td>Entry First Line 4</td>
                        </tr>
                        <tr>
                            <td>Entry Line 1</td>
                            <td>Entry Line 2</td>
                            <td>Entry Line 3</td>
                            <td>Entry Line 4</td>
                        </tr>
                        <tr>
                            <td>Entry Last Line 1</td>
                            <td>Entry Last Line 2</td>
                            <td>Entry Last Line 3</td>
                            <td>Entry Last Line 4</td>
                        </tr>
                        </table>
                        
                        
                        <p>It showed a lady fitted out with a fur hat and fur 
                        boa who sat upright, raising a heavy fur muff that 
                        covered the whole of her lower arm towards the 
                        viewer.</p>
                        
                </div>
            {/if}
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