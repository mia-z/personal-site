<script lang="ts">
    import { trpc } from "$lib/trpc/client";
    import { page } from "$app/stores";
    import * as Cookie from "es-cookie";

    let password: string = "";
    let loading: boolean = false;

    const onPasswordInput = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            loading = true;
            const loginRes = await trpc($page).admin.login.mutate(password);
            Cookie.set("_t", loginRes);
        }
    }
</script>

<div class={"m-auto w-96 p-5 bg-gradient-to-br variant-gradient-secondary-tertiary shadow-lg rounded-full"}>
    <div class={"input-group input-group-divider grid-cols-[auto_1fr_auto]"}>
        <div class="input-group-shim">Password</div>
        <input bind:value={password} on:keydown={onPasswordInput} class={""} type="password" />
    </div>
</div>