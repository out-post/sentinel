// Rust saves the day!

/**
 * An enum for representing the result of a comparison.
 */
export enum Compare {
	/**
	 * Represents a state where the first value is smaller than the second value.
	 */
	SMALLER = -1,

	/**
	 * Represents a state where the first value is equal to the second value.
	 */
	EQUAL = 0,

	/**
	 * Represents a state where the first value is larger than the second value.
	 */
	LARGER = 1,
}

/**
 * Compares two numbers.
 *
 * @param   a The first number
 * @param   b The second number
 * @returns The result of the comparison
 */
export function compare(a: number, b: number): Compare {
	if (a < b) {
		return Compare.SMALLER;
	} else if (a === b) {
		return Compare.EQUAL;
	} else {
		return Compare.LARGER;
	}
}
