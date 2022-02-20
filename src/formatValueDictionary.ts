import {
	foregroundBlue,
	foregroundBrightGreen,
	foregroundBrightRed,
	foregroundYellow,
} from "@vangware/ansi";
import type { ReadOnlyRecord, TypeOfValue } from "@vangware/types";
import { formatValue } from "./formatValue.js";

/**
 * Dictionary type->formatter to be used by {@link formatValue}.
 *
 * @category Output
 */
export const formatValueDictionary: Record<
	TypeOfValue,
	(value: unknown) => string
> = {
	bigint: value => `${foregroundBrightGreen`${value}`}${foregroundBlue`n`}`,
	boolean: value => foregroundBlue`${value}`,
	function: () => foregroundYellow`Function`,
	number: value => foregroundBrightGreen`${value}`,
	object: value =>
		// eslint-disable-next-line no-null/no-null
		value === null
			? foregroundBlue`null`
			: Array.isArray(value)
			? `${foregroundBrightGreen`Array`}([ ${value
					.map(formatValue)
					.join(", ")} ])`
			: value instanceof Date
			? `${foregroundBrightGreen`Date`}(${foregroundBrightRed`"${value.toISOString()}"`})`
			: value instanceof RegExp
			? `${foregroundBrightGreen`RegExp`}(${foregroundBrightRed(
					value.toString(),
			  )})`
			: `${foregroundBrightGreen(
					// eslint-disable-next-line @typescript-eslint/ban-types
					(value as Object).constructor.name,
			  )}({ ${Object.entries(value as ReadOnlyRecord)
					.map(
						([key, propertyValue]) =>
							`${foregroundBrightRed`"${key.toString()}"`}: ${formatValue(
								propertyValue,
							)}`,
					)
					.join(", ")} })`,
	string: value => foregroundBrightRed`"${value}"`,
	symbol: () => foregroundBrightGreen`Symbol`,
	undefined: () => foregroundBlue`undefined`,
};
