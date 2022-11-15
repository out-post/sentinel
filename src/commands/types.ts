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

/**
 * The state that represents whether a case is an edge case or not.
 */
export interface EdgeCaseState {
	isEdgeCase: boolean;
	warningMessage?: string;
}

/**
 * Organizes commands into multiple modules.
 * Add more as you see fit.
 */
export enum ModularCategory {
	Moderation = "Moderation",
	Information = "Information",
}