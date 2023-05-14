<script lang="ts">
    import { enhance } from "$app/forms";
    import Fa from "svelte-fa";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";

    let loading: boolean = false;
    let errors = {
        username: null,
        password: null,
        error: null
    }
</script>

<div class={"container mx-auto min-h-screen flex flex-col"}>
    <form class={"m-auto w-1/4 p-5 rounded-md shadow-lg bg-base-300 transition-all relative"} method="post" action="?/login" use:enhance={(e) => {
        loading = true;
        errors = {
            username: null,
            password: null,
            error: null
        }
        return async ({ result, update }) => {
            if (result.type === "failure") {
                errors = {
                    username: result.data?.username?._errors.join(", "),
                    password: result.data?.password?._errors.join(", "),
                    error: result.data?.error
                }
                await update();
                loading = false;
            }
            if (result.type  === "success") {
                await update({ reset: true });
                return goto("/admin");
            }
        }
    }}>
        {#if loading}
            <div transition:fade class={"absolute top-0 left-0 h-full w-full z-50 bg-slate-800/30 backdrop-blur-sm rounded-md flex"}>
                <Fa icon={faSpinner} pulse class={"m-auto text-5xl text-primary animate-spin"} />
            </div>
        {/if}
        <div class={"form-control"}>
            <label class={"label"} for={"username"}>
                <span class={"label-text"}>Username</span>
            </label>
            <input disabled={loading} type={"text"} name={"username"} class={"input input-bordered focus:border-primary"} />
            <label class={"label"} for={"username"}>
                {#if errors.username}
                    <span transition:fly={{ x: 50, duration: 200 }} class={"label-text-alt text-error"}>{errors.username}</span>
                {/if}
            </label>
        </div>
        <div class={"form-control"}>
            <label class={"label"} for={"password"}>
                <span class={"label-text"}>Password</span>
            </label>
            <input disabled={loading} type={"password"} name={"password"} class={"input input-bordered focus:border-primary"} />
            <label class={"label"} for={"password"}>
                {#if errors.password}
                    <span transition:fly={{ x: 50, duration: 200 }} class={"label-text-alt text-error"}>{errors.password}</span>
                {/if}
            </label>
        </div>
        <div class={"form-control flex flex-row"}>
            {#if errors.error}
                <span transition:fly={{ y: 20, duration: 200 }} class={"mx-auto label-text-alt text-error"}>{errors.error}</span>
            {/if}
        </div>
        <div class={"form-control mt-7"}>
            <button class={"btn btn-primary"}>Submit</button>
        </div>
    </form>
</div>