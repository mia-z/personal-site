<script lang="ts">
    import { trpc } from "$lib/trpc/client";
    import { page } from "$app/stores";
    import * as Cookie from "es-cookie";
    import { slide } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { faSpinner  } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    let password: string = "";
    let loading: boolean = false;
    let error: string;

    const onPasswordInput = (e: KeyboardEvent) => {
        if (password == "") {
            error = "";
        }
        if (e.key === "Enter") {
            error = "";
            loading = true;
            trpc($page).admin.login.mutate(password)
                .then(res => {
                    Cookie.set("_t", res);
                    goto("/admin/index");
                })
                .catch(e => {
                    if (e.message === "UNAUTHORIZED") {
                        error = "Incorrect password"
                    } else {
                        error = "Login error";
                    }
                    loading = false;
                });
        }
    }
</script>

<div class={"h-screen flex roboto"}>
    <div class={"m-auto w-96 p-1 bg-base-300 shadow-lg rounded-full relative"}>
        <div class={"join w-full"}>
            <div class={"join-item flex p-1 bg-base-200 rounded-l-full px-3"}>
                <div class={"my-auto"}>
                    Password
                </div>
            </div>
            <input disabled={loading} readonly={loading} bind:value={password} on:keydown={onPasswordInput} class={`input input-bordered flex-grow rounded-r-full join-item`} type="password" />
            
        </div>
        {#if error}
            <div transition:slide class={"absolute top-14 left-0 w-full text-center text-sm text-error"}>
                {error}
            </div>
        {/if}
        {#if loading}
            <div transition:slide={{ axis: "y" }} class={"absolute top-16 w-full left-0"}>
                <Fa icon={faSpinner} class={"mx-auto animate-spin text-3xl"} />
            </div>
        {/if}
    </div>
</div>
