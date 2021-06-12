import type { Test } from "./Test";

/**
 * Output of the test function.
 *
 * @category Test
 */
export type TestResult = Pick<Test<unknown>, "given" | "must"> & {
	/** Error message (undefined when test passed). */
	readonly error?: string;
};
