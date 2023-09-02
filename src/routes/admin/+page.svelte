<script lang="ts">
    import { trpc } from "$lib/trpc/client";
    import { page } from "$app/stores";
    import * as Cookie from "es-cookie";
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { slide } from "svelte/transition";
  import { goto } from "$app/navigation";

    let password: string = "";
    let loading: boolean = false;
    let error: string;

    const onPasswordInput = (e: KeyboardEvent) => {
        if (password == "") {
            error = "";
        }
        if (e.key === "Enter") {
            loading = true;
            trpc($page).admin.login.mutate(password)
                .then(res => {
                    Cookie.set("_t", res);
                    goto("/admin/start");
                })
                .catch(e => {
                    if (e.message === "UNAUTHORIZED") {
                        error = "Incorrect password"
                    } else {
                        error = "Login error";
                    }
                });
            loading = false;
        }
    }
</script>

<div class={"m-auto w-96 p-1 bg-gradient-to-br variant-gradient-secondary-tertiary shadow-lg rounded-full relative"}>
    <div class={"input-group input-group-divider grid-cols-[auto_1fr_auto]"}>
        <div class="input-group-shim">Password</div>
        <input disabled={loading} readonly={loading} bind:value={password} on:keydown={onPasswordInput} class={``} type="password" />
        {#if loading}
            <div transition:slide={{ axis: "x" }} class={"input-group-shim"}><ProgressRadial stroke={100} meter="stroke-tertiary-500" class={"h-5 w-5"} /></div>
        {/if}
    </div>
    {#if error}
        <div transition:slide class={"absolute top-14 left-0 w-full text-center text-sm text-error-400"}>
            {error}
        </div>
    {/if}
</div>