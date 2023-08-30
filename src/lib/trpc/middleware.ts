import { t } from "./t";
import l from "$lib/server/Logger";
import { v4 as uuid } from "uuid"

export const logger = t.middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const id = uuid();
    l.info({ source: "tRPC", text: `Received tRPC call to [${path}] [${id}]` });
    const res = await next();
    const ms = Date.now() - start;
    if (res.ok) {
        l.info({ source: "tRPC", text: `Finished tRPC call to [${path}] [${id}] after ${ms}ms` });
    } else {
        l.error({ source: "tRPC", text: `Error with tRPC call [${id}] - ${type} ${path}` });
    }
    return res;
});