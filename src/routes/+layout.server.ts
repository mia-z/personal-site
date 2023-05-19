import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { username } }) => {
    return {
        username
    };
}) satisfies LayoutServerLoad;