import { readdirSync, readFileSync } from "fs";
import { last, pullAt } from "lodash-es";

const files: string[] = readdirSync("res/changelogs");

export const changelogs = new Map<string, string>();
for (const file of files) {
	const changelog = readFileSync(`res/changelogs/${file}`, "utf-8");
	changelogs.set(file.split(".").slice(0, 3).join("."), processChangelog(changelog));
}

/**
 * Process the changelog, by stripping header symbols and replacing them with bold indicators.
 *
 * @param raw
 */
export function processChangelog(raw: string): string {
	const newlinesToRemove = [];
	for (let i = 0; i < raw.length; i++) {
		if (raw[i] === "\n" && raw.at(i + 1) !== "\n") {
			if (i === 0 || raw.at(i - 1) !== "\n") {
				newlinesToRemove.push(i);
			}
		}
	}
	const rawChars = raw.split("");
	pullAt(rawChars, newlinesToRemove);
	raw = rawChars.join("");

	const lines = raw.split("\n");
	for (let i = 0; i < 2; i++) {
		lines.shift();
	}
	return lines.join("\n");
}

/**
 * Gets a changelog from the specified version.
 *
 * @param version
 */
export function getChangelog(version: string): string {
	if (version.startsWith("v")) {
		version = version.slice(1); // skipcq JS-0083
	}
	if (!changelogs.has(version)) {
		throw new Error(`Changelog for version ${version} does not exist.`);
	}
	return changelogs.get(version)!.trim();
}

/**
 * Gets all version name strings.
 */
export function getAllVersionNames(): string[] {
	return [...changelogs.keys()];
}

/**
 * Gets all versions with a changelog.
 */
export function getAllVersionNamesButFancy(): string[] {
	const versions = getAllVersionNames().map((version) => `v${version}`); // skipcq JS-0083
	versions[versions.length - 1] += " (latest)";
	return versions;
}

/**
 * Gets the latest version. This is dependent on what files are present in the res/changelogs directory.
 */
export function getLatestVersionNumber(): string {
	const versionNames = getAllVersionNames();
	return last(versionNames)!;
}
