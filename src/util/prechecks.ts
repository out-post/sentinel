import { GuildMember } from "discord.js";
import { compare, Compare } from "./compare.js";

/**
 * Compares two members by their highest roles.
 *
 * @param commandUser
 * @param targetUser
 */
export function compareRoles(commandUser: GuildMember, targetUser: GuildMember): Compare {
	return compare(commandUser.roles.highest.position, targetUser.roles.highest.position);
}
