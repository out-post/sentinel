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
 * Gets all versions with a changelog.
 */
export function getAllVersionStrings(): string[] {
	let versions = [...changelogs.keys()]
	versions[versions.length - 1] += " (latest)";
	return versions;
}
