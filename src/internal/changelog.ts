import { readdirSync, readFileSync } from "fs";
import { last } from "lodash-es";
import { cleanWhitespace, stripExcessNewlines } from "./regexes.js";

const files: string[] = readdirSync("res/changelogs");

export const changelogs = new Map<string, string>();

for (const file of files) {
	const changelog = readFileSync(`res/changelogs/${file}`, "utf-8");
	changelogs.set(getVersionFromFileName(file), processChangelog(changelog));
}

/**
 * Gets the version from the file name.
 * @param file
 */
export function getVersionFromFileName(file: string): string {
	return file.split(".").slice(0, 3).join(".");
}

/**
 * Process the changelog, by stripping header symbols, replacing them with bold indicators, and removing excess newlines.
 *
 * @param raw
 */
export function processChangelog(raw: string): string {
	const lines = raw.split("\n");
	for (let i = 0; i < 2; i++) {
		lines.shift();
	}
	return cleanWhitespace(lines.join("\n")).trim();
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
