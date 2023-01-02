import { describe, expect, test } from "vitest";
import {
	getAllVersionNames,
	getAllVersionNamesButFancy,
	getChangelog,
	getLatestVersionNumberWithChangelog,
	getVersionFromFileName
} from "../src/internal/changelog.js";

const changelogToMatch = `
Welcome to the **first ever** release of TSentinel!

_**Warning**: This release is a **pre-alpha** release, meaning that it is not ready for production use. It is not recommended to use this in a production environment._

What in the **_H-E-double-hockey-sticks_** does TSentinel even have right now? I dunno, slash commands I guess?

Here are those Slash Commands:

-   \`/ban\`: Bans a user from the server, for when you don't feel like using the builtin \`/ban\` command.
-   \`/kick\`: Kicks a user from the server, for when the default \`/kick\` _just isn't doing it for you_.
-   \`/purge\`: Purges a number of messages from a channel, with multiple options for what to purge.
-   And an \`/about\` command but we don't talk about that one.

Stay tuned until I have the courage to make this thing's GitHub repository public!
`.trim();

describe("analyzing changelog file names", () => {
	test("gets the version from the file name", () => {
		expect(getVersionFromFileName("1.0.0.md")).toBe("1.0.0");
		expect(getVersionFromFileName("1.0.0-alpha.md")).toBe("1.0.0-alpha");
		expect(getVersionFromFileName("1.0.0-beta.md")).toBe("1.0.0-beta");
		expect(getVersionFromFileName("1.0.0-rc.md")).toBe("1.0.0-rc");
	});
});

describe("getting changelogs", () => {
	test("gets the changelog for v0.0.1-alpha", () => {
		expect(getChangelog("0.0.1-alpha")).toBe(changelogToMatch);
		expect(getChangelog("v0.0.1-alpha")).toBe(changelogToMatch);
	});

	test("throws when getting an invalid changelog", () => {
		expect(() => getChangelog("invalid")).toThrow();
	});
});

describe("getting changelog names", () => {
	test("is always v0.0.1-alpha as the first ever version", () => {
		expect(getAllVersionNames()[0]).toBe("0.0.1-alpha");
		expect(getAllVersionNamesButFancy()[0]).toBe("v0.0.1-alpha");
	});

	test('appends "(latest)" to the end of latest fancy version name', () => {
		const versionNames = getAllVersionNamesButFancy();
		expect(versionNames[versionNames.length - 1]).toBe(`v${getLatestVersionNumberWithChangelog()} (latest)`);
	});
});
