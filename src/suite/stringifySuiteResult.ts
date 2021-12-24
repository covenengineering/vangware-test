import { FAIL, PASS } from "../constants.js";
import { stringifyTestResults } from "../test/stringifyTestResults.js";
import type { SuiteResult } from "../types/SuiteResult.js";

/**
 * Takes a `SuiteResult` object and returns a stringified version of it.
 *
 * @category Suite
 */
export const stringifySuiteResult = ({ name, failed }: SuiteResult) =>
	`${failed.length > 0 ? FAIL : PASS} ${name}${
		failed.length > 0
			? `\n\n${stringifyTestResults(failed).join("\n")}`
			: ""
	}`;
