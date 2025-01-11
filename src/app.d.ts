declare namespace App {
	interface Locals {
		username: string;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare module "@fortawesome/pro-solid-svg-icons/index.es" {
	export * from "@fortawesome/pro-solid-svg-icons";
}

const themes = ["dark", "black", "luxury", "business", "coffee", "night", "halloween", "dracula"] as const;
export type DaisyThemes = typeof themes[number];

export type SvelteDOMEvent<T> = Event & { currentTarget: EventTarget & T }

export type ProjectInfo = {
	title: string,
	description: string,
	isCurrent: boolean,
	link: string
}