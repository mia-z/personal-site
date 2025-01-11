import projectinfo from "./projectinfo.json"
import type {ProjectInfo} from "./app";

export const themes = ["dark", "black", "luxury", "business", "coffee", "night", "halloween", "dracula"] as const;

export const CurrentProjects = projectinfo satisfies Array<ProjectInfo>;