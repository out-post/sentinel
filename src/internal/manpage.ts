import { readdirSync, readFileSync } from "fs";
import { cleanWhitespace } from "./regexes.js";

const files: string[] = readdirSync("res/manpages");
export const manpages = new Map<string, string>();

for (const file of files) {
	if (![
		"how-to-manpage.md",
		"how-to-manpage-full.md",
		"man-demonstration.gif"
	].includes(file)) {
		const contents = readFileSync(`res/manpages/${file}`, "utf-8");
		manpages.set(file.split(".")[0], processManpage(contents)); // skipcq
	}
}

/**
 * Process the manpage, by stripping header symbols and replacing them with bold indicators.
 * @param raw
 */
export function processManpage(raw: string): string {
	return cleanWhitespace(raw.replace(/^## (.*)/gm, "**$1**")).trim();
}

/**
 * Gets a manpage from the specified command.
 *
 * @param command
 */
export function getManpage(command: string): string {
	if (command.startsWith("/")) {
		command = command.slice(1); // skipcq JS-0083
	}
	if (!manpages.has(command)) {
		throw new Error(`Manpage for command ${command} does not exist.`);
	}
	return manpages.get(command)!.trim();
}

/**
 * Gets all manpage command strings.
 */
export function getAllManpageNames(): string[] {
	return [...manpages.keys()];
}

/**
 * Gets all manpage names, but with a / prefix.
 */
export function getAllManpageNamesButFancy(): string[] {
	return getAllManpageNames().map((command) => `/${command}`);
}
