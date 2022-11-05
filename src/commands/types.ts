import { GuildMember, TextChannel, User } from "discord.js";

/**
 * A configuration for the /purge command.
 */
export interface PurgeConfiguration {
	channel: TextChannel;
	replyId: string;
	interactor: User;
	invert: boolean;
	reason: string;
	amount?: number;
	target?: GuildMember;
	keyword?: string;
}

/**
 * The state that represents whether a case is an edge case or not.
 */
export interface EdgeCaseState {
	isEdgeCase: boolean;
	warningMessage?: string;
}
