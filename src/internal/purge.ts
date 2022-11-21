import { HasId } from "./types";

export interface MessageLike {
	author: HasId;
	content: string;
}

export interface PurgeFilter {
	target?: HasId;
	keyword?: string;
	invert: boolean;
}

export function purgeFilter(message: MessageLike, config: PurgeFilter): boolean {
	const { target, invert } = config;
	let keyword;
	if (config.keyword !== undefined) {
		keyword = config.keyword?.toLowerCase();
	}

	// prettier-ignore
	const matchesFilter = (
		(!target || message.author.id === target.id)
		&& (!keyword || message.content.toLowerCase().includes(keyword))
	);

	return invert ? !matchesFilter : matchesFilter;
}
