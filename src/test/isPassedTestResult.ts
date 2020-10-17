import { isUndefined } from "@vangware/utils";
import { TestResult } from "../types/TestResult";

/**
 * Checks if given `TestResult` passed.
 * @param testResult TestResult to check.
 */
export const isPassedTestResult = ({ error }: TestResult) => isUndefined(error);

export default isPassedTestResult;
