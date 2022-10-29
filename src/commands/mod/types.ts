import { GuildMember, TextChannel, User } from "discord.js";

export type PurgeConfiguration = {
	channel: TextChannel;
	replyId: string;
	interactor: User;
	invert: boolean;
	amount?: number;
	target?: GuildMember;
	keyword?: string;
	reason?: string;
};

export type EdgeCaseState = {
	isEdgeCase: boolean;
	message?: string;
};
