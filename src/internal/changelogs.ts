import { readdirSync, readFileSync } from "fs";

const files: string[] = readdirSync("res/changelogs");

export const changelogs = new Map<string, string>();
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
	if (!changelogs.has(version)) {
		throw new Error(`Changelog for version ${version} does not exist.`);
	}
	return changelogs.get(version)!.trim();
}

/**
 * Gets all version name strings.
 */
export function getAllVersionStrings(): string[] {
	return [...changelogs.keys()];
}

/**
 * Gets all versions with a changelog.
 */
export function getAllVersionNames(): string[] {
	const versions = getAllVersionStrings(); // skipcq JS-0083
	versions[versions.length - 1] += " (latest)";
	return versions;
}

/**
 * Gets the latest version. This is dependent on what files are present in the res/changelogs directory.
 */
export function getLatestVersionNumber(): string {
	const versionNames = getAllVersionStrings();
	return versionNames[versionNames.length - 1];
}
