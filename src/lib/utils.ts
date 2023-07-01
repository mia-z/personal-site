const whitespaceRegex = new RegExp(/\s+/g);
const nonLetterRegex = new RegExp(/[^a-zA-Z_]+/g);

export const createSlug = (title: string) => {
    return title
        .replaceAll(whitespaceRegex, "_")
        .replaceAll(nonLetterRegex, "")
        .slice(0, 16)
        .toLowerCase();
}