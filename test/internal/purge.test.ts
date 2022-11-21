import { describe, expect, test } from "vitest";
import { MessageLike, purgeFilter, PurgeFilter } from "./../../src/internal/purge";
import { HasId } from "./../../src/internal/types";
import * as lodash from "lodash";

interface Author extends HasId {
	name: string;
}

const authors: Author[] = [
	{ name: "A", id: "1" },
	{ name: "B", id: "2" },
	{ name: "C", id: "3" },
];

const messages: MessageLike[] = [
	{
		author: authors[0],
		content: "Hello",
	},
	{
		author: authors[0],
		content: "World",
	},
	{
		author: authors[0],
		content: "Hello World",
	},
	{
		author: authors[0],
		content: "badword",
	},
	{
		author: authors[1],
		content: "hElLo",
	},
	{
		author: authors[1],
		content: "Message",
	},
	{
		author: authors[1],
		content: "inthemiddleofthesentenceawildbadwordappears",
	},
	{
		author: authors[2],
		content: "world",
	},
];

interface TestCase {
	name: string;
	config: PurgeFilter;
	matches: number[]; // Indices from the dataset
}

const testset: TestCase[] = [
	{
		name: "purge filter with no target and no keyword",
		config: { invert: false },
		matches: lodash.range(0, 8),
	},
	{
		name: 'purge filter with keyword "hello"',
		config: { invert: false, keyword: "hello" },
		matches: [0, 2, 4],
	},
	{
		name: 'purge filter with keyword "world"',
		config: { invert: false, keyword: "world" },
		matches: [1, 2, 7],
	},
	{
		name: 'purge filter with keyword "badword"',
		config: { invert: false, keyword: "badword" },
		matches: [3, 6],
	},
	{
		name: 'inverted purge filter with keyword "badword"',
		config: { invert: true, keyword: "badword" },
		matches: lodash.difference(lodash.range(0, 8), [3, 6]),
	},
	{
		name: 'purge filter with target "A"',
		config: { invert: false, target: authors[0] },
		matches: [0, 1, 2, 3],
	},
	{
		name: 'purge filter with target "B"',
		config: { invert: false, target: authors[1] },
		matches: [4, 5, 6],
	},
	{
		name: 'purge filter with target "C"',
		config: { invert: false, target: authors[2] },
		matches: [7],
	},
	{
		name: 'inverted purge filter with target "B"',
		config: { invert: true, target: authors[1] },
		matches: lodash.difference(lodash.range(0, 8), [4, 5, 6]),
	},
	{
		name: 'purge filter with target "A" and keyword "hello"',
		config: { invert: false, target: authors[0], keyword: "hello" },
		matches: [0, 2],
	},
];

function runTest(test: TestCase): number[] {
	return [...messages.entries()].filter(([, message]) => purgeFilter(message, test.config)).map(([index]) => index);
}

describe("purge filtering", () => {
	for (const testCase of testset) {
		test(testCase.name, () => {
			expect(runTest(testCase)).toEqual(testCase.matches);
		});
	}
});
