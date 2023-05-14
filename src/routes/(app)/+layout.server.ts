import type { LayoutServerLoad } from "./$types";

export const load = (async (event) => {
    return {
        username: event.locals.username
    }
}) satisfies LayoutServerLoad;