import { toast } from "@zerodevx/svelte-toast";

export const successToast = (text: string) => toast.push(text, {
    theme: {
        "--toastBackground": "rgb(34 197 94)",
    }
});

export const errorToast = (text: string) => toast.push(text, {
    theme: {
        "--toastBackground": "rgb(239 68 68)",
    }
});

export const notifyToast = (text: string) => toast.push(text, {
    theme: {
        "--toastBackground": "rgb(59 130 246)",
    }
});
