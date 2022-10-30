import { readdirSync, readFileSync } from "fs";

const files: string[] = readdirSync("res/manpages");
export const manpages = new Map<string, string>();

for (const file of files) {
	const contents = readFileSync(`res/manpages/${file}`, "utf-8");
	manpages.set(file.split(".")[0], processedManpage(contents)); // skipcq
}

function processedManpage(contents: string): string {
	const lines = contents.split("\n");
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith("##")) {
			lines[i] = lines[i].replace("##", "**");
			lines[i] += "**";
		}
	}
	return lines.join("\n");
}

/**
 * Gets a manpage from the specified command.
 *
 * @param command
 */
export function getManpage(command: string): string {
	if (!manpages.has(command)) {
		throw new Error(`Manpage for command ${command} does not exist.`);
	}
	return manpages.get(command)!;
}

/**
 * Gets all manpage command strings.
 */
export function getAllManpageStrings(): string[] {
	return [...manpages.keys()];
}
