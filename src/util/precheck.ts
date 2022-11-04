import {GuildMember} from "discord.js";
import {compare, Compare} from "./compare.js";

/**
 * Compares two members by their highest roles.
 *
 * @param commandUser
 * @param targetUser
 */
export function compareRoles(
	commandUser: GuildMember,
	targetUser: GuildMember
): Compare {
	return compare(
		commandUser.roles.highest.position,
		targetUser.roles.highest.position
	);
}

/**
 * Checks if there are no parameters provided.
 *
 * @param params The parameters to check
 */
export function noParametersProvided(params: unknown[]): boolean {
	return params.every((param: unknown) => typeof param === "undefined");
}
