import { describe, expect, it } from "vitest";
import {
	getAllVersionNames,
	getAllVersionStrings,
	getChangelog,
	getLatestVersionNumber,
} from "../../src/internal/changelogs.js";

const changelogToMatch = `
Welcome to the **first ever** release of TSentinel!

_**Warning**: This release is a **pre-alpha** release, meaning that it is not ready for production use. It is not
recommended to use this in a production environment._

What in the **_H-E-double-hockey-sticks_** does TSentinel even have right now? I dunno, slash commands I guess?

Here are those Slash Commands:

-   \`/ban\`: Bans a user from the server, for when you don't feel like using the builtin \`/ban\` command.
-   \`/kick\`: Kicks a user from the server, for when the default \`/kick\` _just isn't doing it for you_.
-   \`/purge\`: Purges a number of messages from a channel, with multiple options for what to purge.
-   And an \`/about\` command but we don't talk about that one.

Stay tuned until I have the courage to make this thing's GitHub repository public!
`.trim();

describe("getting changelogs", () => {
	it("gets the changelog for v0.0.1-alpha", () => {
		expect(getChangelog("0.0.1-alpha")).eq(changelogToMatch);
	});

	it("throws when getting an invalid changelog", () => {
		expect(() => getChangelog("invalid")).throws();
	});
});

describe("getting changelog names", () => {
	it("is always v0.0.1-alpha as the first ever version", () => {
		expect(getAllVersionStrings()[0]).eq("0.0.1-alpha");
		expect(getAllVersionNames()[0]).eq("0.0.1-alpha");
	});

	it('appends "(latest)" to the end of latest version name', () => {
		const versionNames = getAllVersionNames();
		expect(versionNames[versionNames.length - 1]).eq(`${getLatestVersionNumber()} (latest)`);
	});
});
