import type { Test } from "./types/Test.js";

/**
 * Check if given value is a {@link Test}.
 *
 * @category Test
 * @example
 * ```typescript
 * isTest({ given: "🟢", must: "🟩", received: "🟩", wanted: "🟩" }); // true
 * isTest({ given: 1, must: 2, received: 3, wanted: 4 }); // false
 * isTest(); // false
 * ```
 * @param value Value to check.
 * @returns `true` if is a {@link Test}, `false` otherwise.
 */
export const isTest = <Actual = unknown>(value: Actual | Test): value is Test =>
	typeof value === "object" &&
	"given" in value &&
	typeof value.given === "string" &&
	"must" in value &&
	typeof value.must === "string" &&
	"received" in value &&
	"wanted" in value;
