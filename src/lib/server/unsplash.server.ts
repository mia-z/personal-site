import { createApi } from "unsplash-js";
import { SECRET_UNSPLASH_ACCESS_KEY } from "$env/static/private";

export const unsplashServer = createApi({
    accessKey: SECRET_UNSPLASH_ACCESS_KEY
});