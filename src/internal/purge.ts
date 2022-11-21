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
 * Applies the purge filter to a message.
 * @param message
 * @param filter The purge filter.
 * @returns The purged messages.
 */
export function purgeFilter(message: MessageLike, filter: PurgeFilter): boolean {
	const { target, invert } = filter;
	let keyword;
	if (filter.keyword !== undefined) {
		keyword = filter.keyword.toLowerCase();
	}

	// prettier-ignore
	const matchesFilter = (
		(!target || message.author.id === target.id)
		&& (!keyword || message.content.toLowerCase().includes(keyword))
	);

	return invert ? !matchesFilter : matchesFilter;
}
