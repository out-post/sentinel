import { HasId } from "./types";

/**
 * A message-like object.
 */
export interface MessageLike {
	author: HasId;
	content: string;
}

/**
 * A purge filter.
 */
export interface PurgeFilter {
	target?: HasId;
	keyword?: string;
	invert: boolean;
}

/**
 * Purges messages from a dataset.
 * @param messages The messages to purge.
 * @param config The purge filter.
 * @returns The purged messages.
 */
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
