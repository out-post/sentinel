import { GuildMember, User } from "discord.js";

/**
 * Gets the name of the user.
 *
 * @param user
 */
export function getName(user: User): string {
	return `${user.username}#${user.discriminator}`;
}

/**
 * Gets the identifier of the user.
 *
 * @param user
 */
export function getIdentifier(user: User): string {
	return `${user.username}#${user.discriminator} (${user.id})`;
}

/**
 * Gets the display name of a guild member.
 *
 * @param member
 */
export function getDisplayName(member: GuildMember): string {
	return `${member.user.username} (${member.displayName})#${member.user.discriminator}`;
}
