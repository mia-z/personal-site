import { describe, expect, test } from "vitest";

import { createSlug } from "../src/lib/utils";

const titleWithSpaces = "This is a title";
const validTitleWithSpaces = "this_is_a_title";

const longTitle = "this is a Really Long String Thats More Than 16 Chars";
const validLongTitle = "this_is_a_really"

const titleWithSymbols = "Hello! This is my first post here, I hope you like it! That's right!";
const validTitleWithSymbols = "hello_this_is_my"
describe("Utils -> createSlug", () => {
    test("it creates a valid slug from a string with spaces", () =>  {
        const testVal = createSlug(titleWithSpaces);
        expect(testVal).toEqual(validTitleWithSpaces);
    });

    test("it creates a valid slug which is at most 16 characters long", () =>  {
        const testVal = createSlug(longTitle);
        expect(testVal).toEqual(validLongTitle);
        expect(testVal.length).toBeLessThan(17);
    });

    test("it creates a valid slug which has a symbols in it", () =>  {
        const testVal = createSlug(titleWithSymbols);
        expect(testVal).toEqual(validTitleWithSymbols);
        expect(testVal.length).toBeLessThan(17);
    });
});