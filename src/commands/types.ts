import { GuildMember, TextChannel, User } from "discord.js";

export type UserOrMember = User | GuildMember;

/**
 * A configuration for the /purge command.
 */
export interface PurgeConfiguration {
	channel: TextChannel;
	replyId?: string;
	interactor: User;
	invert: boolean;
	suppress: boolean;
	reason: string;
	amount?: number;
	target?: GuildMember;
	keyword?: string;
}
