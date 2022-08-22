import type { AsynchronousIterable } from "@vangware/types";
import type { Test } from "./Test.js";

/**
 * Array of `Test`.
 *
 * @category Test
 * @example
 * ```typescript
 * const tests: Tests<number> = [
 * 	{
 * 		given: "a number",
 * 		must: "make it double",
 * 		received: double(2),
 * 		wanted: 4,
 * 	}
 * ];
 * ```
 */
export type Tests<Value = unknown> = AsynchronousIterable<Test<Value>>;
