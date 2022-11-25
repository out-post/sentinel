
/**
 * Strips leading whitespace from all lines.
 * @param raw
 */
export function trimAllLines(raw: string): string {
	return raw.split("\n").map((line) => line.trim()).join("\n");
}

/**
 * Strips excess newlines from a string that has paragraph-sentences.
 * Note that this only works for newlines that split words, not in the middle of a word.
 * @param raw
 */
export function stripExcessNewlines(raw: string): string {
	return raw
		.replace(/\n+$/, "")
		.replace(/^\n*/g, "")
		.replace(/(?<before>[^\n])\n(?<after>[^\n-])/gm, "$<before> $<after>");
}

/**
 * Strips leading & trailing whitespace + excess newlines from all lines
 * @param raw
 */
export function cleanWhitespace(raw: string): string {
	return trimAllLines(stripExcessNewlines(trimAllLines(raw.trim())));
}
