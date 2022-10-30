import { GuildMember, TextChannel, User } from "discord.js";

export interface PurgeConfiguration {
	channel: TextChannel;
	replyId: string;
	interactor: User;
	invert: boolean;
	amount?: number;
	target?: GuildMember;
	keyword?: string;
	reason?: string;
}

export interface EdgeCaseState {
	isEdgeCase: boolean;
	message?: string;
}
