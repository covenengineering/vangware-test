import { UNWANTED_COMMENT } from "../constants";
import { lastAwareMap } from "../utils/lastAwareMap";
import { stringify } from "../utils/stringify";

/**
 * Takes a boolean to know if the paren is in it's last item, and a source array
 * and returns a string of unwanted elements.
 *
 * @category Compare
 */
export const compareArrayUnwantedItems = (lastParent: boolean) =>
	lastAwareMap(
		last => item =>
			`${stringify(item)}${
				last && lastParent ? " " : ","
			} ${UNWANTED_COMMENT}`
	);
