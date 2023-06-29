<script lang="ts">
    import { enhance } from "$app/forms";
    import Fa from "svelte-fa";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import type { ActionData } from "./$types";
    import Blockable from "$components/Blockable.svelte";

    export let form: ActionData;

    let loading: boolean = false;
</script>

<div class={"container mx-auto min-h-screen flex flex-col"}>
    <form class={"m-auto w-1/4 rounded-md shadow-lg bg-base-100 transition-all relative"} method="post" action="?/login" use:enhance={(e) => {
        loading = true;
        return async ({ result, update }) => {
            if (result.type === "failure") {
                await update();
                loading = false;
            }
            if (result.type  === "success") {
                await update({ reset: true });
                return goto("/admin");
            }
        }
    }}>
        <Blockable as={"div"} blocked={loading} class={"p-4"}>
            <div slot="blockInfoText">
                Logging in..
            </div>
            <div class={"form-control"}>
                <label class={"label"} for={"username"}>
                    <span class={"label-text"}>Username</span>
                </label>
                <input disabled={loading} type={"text"} name={"username"} class={"input input-bordered focus:border-primary"} />
                <label class={"label"} for={"username"}>
                    {#if form?.errors?.username}
                        <span transition:fly={{ x: 50, duration: 200 }} class={"label-text-alt text-error"}>{form?.errors?.username._errors.join("")}</span>
                    {/if}
                </label>
            </div>
            <div class={"form-control"}>
                <label class={"label"} for={"password"}>
                    <span class={"label-text"}>Password</span>
                </label>
                <input disabled={loading} type={"password"} name={"password"} class={"input input-bordered focus:border-primary"} />
                <label class={"label"} for={"password"}>
                    {#if form?.errors?.password}
                        <span transition:fly={{ x: 50, duration: 200 }} class={"label-text-alt text-error"}>{form?.errors?.password._errors.join("")}</span>
                    {/if}
                </label>
            </div>
            <div class={"form-control flex flex-row"}>
                {#if form?.error}
                    <span transition:fly={{ y: 20, duration: 200 }} class={"mx-auto label-text-alt text-error"}>{form?.error}</span>
                {/if}
            </div>
            <div class={"form-control mt-7"}>
                <button class={"btn btn-primary"}>Submit</button>
            </div>
        </Blockable>
    </form>
</div>