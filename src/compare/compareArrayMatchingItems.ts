import type { ReadOnlyArray } from "@vangware/types";
import { lastAwareMap } from "../utils/lastAwareMap";
import { stringifyMap } from "../utils/stringifyMap";

/**
 * Takes a boolean to know if this is the last item, and a source array and
 * returns a string for matching items.
 *
 * @category Compare
 */
export const compareArrayMatchingItems =
	(lastParent: boolean) =>
	<Item>(source: ReadOnlyArray<Item>) =>
		lastAwareMap(
			last => (item: string) => `${item}${last && lastParent ? "" : ","}`
		)(stringifyMap(source));
