import { readdirSync, readFileSync } from "fs";

const files: string[] = readdirSync("res/changelogs");

export let changelogs: Map<string, string> = new Map();
for (const file of files) {
	const changelog = readFileSync(`res/changelogs/${file}`, "utf-8");
	const lines = changelog.split("\n");
	for (let i = 0; i < 2; i++) {
		lines.shift();
	}
	changelogs.set(file.split(".").slice(0, 3).join("."), lines.join("\n"));
}

/**
 * Gets a changelog from the specified version.
 *
 * @param version
 */
export function getChangelog(version: string): string {
	version = version.split(" ")[0];  // Just for the <version> (latest) case
	if (!changelogs.has(version)) {
		throw new Error(`Changelog for version ${version} does not exist.`);
	}
	return changelogs.get(version)!;
}

/**
 * Processes a changelog string into a blockquote.
 *
 * @param changelog
 */
export function blockquoteChangelog(changelog: string): string {
	return ">>> " + changelog;
}

/**
 * Gets all versions with a changelog.
 */
export function getAllVersionStrings(): string[] {
	return [...changelogs.keys()]
		.map(version => `${version}${version === process.env.npm_package_version ? " (latest)" : ""}`);
}
