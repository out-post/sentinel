import { describe, expect, test } from "vitest";
import { getManpage, processedManpage } from "../../src/internal/manpage.js";

const banManpage = `
## NAME

\`ban\` - ban members from a guild

## SYNOPSIS

\`ban target:@user, cleanup:y/n, notify:y/n, suppress?:false, reason?:"Unspecified"\`

## DESCRIPTION

Bans a member from the guild. Specifically, adds the user to the ban list. The user is removed from the guild and cannot
rejoin in any way whatsoever.

## OPTIONS

\`target:@user\`: The target to be banned.

\`cleanup?:y/n\`: Deletes the last 7 days of messages from the user.

\`notify?:y/n\`: Notifies the user that they have been banned.

\`suppress?:false\`: Suppresses all output.

\`reason?:"Unspecified"\`: The reason for the ban. If not specified, the reason will be "Unspecified".

## EXAMPLES

\`/ban target:@user\`: Bans the user from the guild.

\`/ban target:@user cleanup:True reason:"Example reason"\`: Bans the user, supplies a ban reason and performs cleanup.

## SEE ALSO

\`/kick\`: A softer alternative to banning, only removing a member from a guild.

## HISTORY

\`ban\` was introduced in Sentinel 0.0.1.

## BUGS

\`target\` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which
might fail.
`.trim();

const processedBanManpage = `
**NAME**

\`ban\` - ban members from a guild

**SYNOPSIS**

\`ban target:@user, cleanup:y/n, notify:y/n, suppress?:false, reason?:"Unspecified"\`

**DESCRIPTION**

Bans a member from the guild. Specifically, adds the user to the ban list. The user is removed from the guild and cannot
rejoin in any way whatsoever.

**OPTIONS**

\`target:@user\`: The target to be banned.

\`cleanup?:y/n\`: Deletes the last 7 days of messages from the user.

\`notify?:y/n\`: Notifies the user that they have been banned.

\`suppress?:false\`: Suppresses all output.

\`reason?:"Unspecified"\`: The reason for the ban. If not specified, the reason will be "Unspecified".

**EXAMPLES**

\`/ban target:@user\`: Bans the user from the guild.

\`/ban target:@user cleanup:True reason:"Example reason"\`: Bans the user, supplies a ban reason and performs cleanup.

**SEE ALSO**

\`/kick\`: A softer alternative to banning, only removing a member from a guild.

**HISTORY**

\`ban\` was introduced in Sentinel 0.0.1.

**BUGS**

\`target\` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which
might fail.
`.trim();

describe("getting manpages", () => {
	test("gets the manpage for /ban", () => {
		expect(getManpage("ban")).toBe(processedBanManpage);
	});

	test("throws when getting an invalid manpage", () => {
		expect(() => getManpage("invalid")).toThrow();
	});
});

describe("processing manpages", () => {
	test("processes the manpage for /ban", () => {
		expect(processedManpage(banManpage)).toBe(processedBanManpage);
	});
});
