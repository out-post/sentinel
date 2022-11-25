import { describe, expect, test } from "vitest";
import { cleanWhitespace, stripExcessNewlines, trimAllLines } from "../../src/internal/regexes.js";

describe("trimming", () => {
	test("leading whitespace", () => {
		expect(trimAllLines("   abc")).toBe("abc");
		expect(trimAllLines("   abc   def")).toBe("abc   def");
	});

	test("trailing whitespace", () => {
		expect(trimAllLines("abc   ")).toBe("abc");
		expect(trimAllLines("abc   def   ")).toBe("abc   def");
	});

	test("leading and trailing whitespace", () => {
		expect(trimAllLines("   abc   ")).toBe("abc");
		expect(trimAllLines("   abc   def   ")).toBe("abc   def");
	});

	test("multiple lines", () => {
		expect(trimAllLines("   abc\n   ")).toBe("abc\n");
		expect(trimAllLines("   abc\n   def")).toBe("abc\ndef");
		expect(trimAllLines("   \n   def   ")).toBe("\ndef");
	});
});

describe("processing excess newlines", () => {
	test("in between words", () => {
		expect(stripExcessNewlines("i like\npizza")).toBe("i like pizza");
		expect(stripExcessNewlines("i\nlike\npizza")).toBe("i like pizza");
	});

	test("with leading and trailing newlines", () => {
		expect(stripExcessNewlines("\n\ni like pizza\n\n")).toBe("i like pizza");
		expect(stripExcessNewlines("\n\ni like\npizza")).toBe("i like pizza");
	});
});

describe("cleaning whitespace", () => {
	test("fake latin", () => {
		const expected = "Tortor luctus dissentiunt tempor quidam molestie ei natoque suscipiantur laudem. Natum option appareat viris iriure. Cetero similique agam elaboraret aeque aeque mel sit vulputate fames. Efficiantur a conceptam dis sumo sociis convallis gubergren. Imperdiet reprehendunt pri semper suspendisse dicat invenire theophrastus vocibus.";
		const raw = `
		Tortor luctus
		dissentiunt tempor quidam molestie ei natoque suscipiantur     
		      laudem. Natum option appareat
		        viris iriure. Cetero similique agam   
		elaboraret aeque
		aeque mel sit vulputate fames.   
		       Efficiantur a conceptam
		       dis sumo sociis convallis gubergren. Imperdiet
		reprehendunt pri semper suspendisse dicat invenire   
		     theophrastus vocibus.
		    
		    
		`;
		expect(cleanWhitespace(raw)).toBe(expected);
	});
	test("changelog (has dashes for bulleted lists)", () => {
		const raw = `
		-   \`/ban\`:
		Bans a user from the
		    server, for when you don't feel like using the builtin \`/ban\`
		    command.	           
		-   \`/kick\`: Kicks a
		user from the server, for when the default \`/kick\` _just isn't doing it for you_.
		-   \`/purge\`:
		Purges a
		                    number of            
		messages from a
		channel, with multiple options for what to purge.         
		-   And an \`/about\` command
		    but we don't talk about that one.   
		`;
		const expected = `-   \`/ban\`: Bans a user from the server, for when you don't feel like using the builtin \`/ban\` command.
-   \`/kick\`: Kicks a user from the server, for when the default \`/kick\` _just isn't doing it for you_.
-   \`/purge\`: Purges a number of messages from a channel, with multiple options for what to purge.
-   And an \`/about\` command but we don't talk about that one.`;
		expect(cleanWhitespace(raw)).toBe(expected);
	});
});
