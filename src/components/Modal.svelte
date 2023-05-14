<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import IoClose from "svelte-icons-pack/io/IoClose";
  import Icon from "svelte-icons-pack";

  export let open: boolean;
</script>

{#if open}
  <div transition:fade on:click={() => open = false} on:keyup={() => open = false} class={`absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm`}>
      <div class={"py-5"}>
          <div on:click|stopPropagation on:keydown|stopPropagation transition:fly={{ y: 50 }} class={"m-auto bg-neutral rounded-md shadow-xl container xl:w-1/2"}>
              <div class={"flex flex-col"}>
                  <div class={"h-10 rounded-t-md p-1"}>
                      <div class={"flex px-2 h-full rounded-t-sm w-full"}>
                          <div class={"my-auto select-none line-clamp-1 w-fit text-xl cursor-pointer text-neutral-content hover:bg-neutral-focus rounded-md transition-all p-1 px-2"}>
                              <slot name="title" />
                          </div>
                          <div class={"my-auto select-none ml-auto flex rounded-full transition-all cursor-pointer w-8 h-8 active:bg-neutral hover:bg-neutral-focus"}>
                              <div class={"text-center m-auto"} on:click={() => open = false} on:keyup={() => open = false}>
                                  <Icon src={IoClose} color={"white"} />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class={"my-1 px-3"}>
                      <hr class={"border-accent"} />
                  </div>
                  <div class={"min-h-6 text-neutral-content"}>
                      <slot name="content" />
                  </div>
              </div>
          </div>
      </div>
  </div>
{/if}