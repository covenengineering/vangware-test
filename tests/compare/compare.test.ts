import { greenText, redText } from "@vangware/forcli";
import { compare } from "../../src/compare/compare";
import { UNWANTED_COMMENT } from "../../src/constants";
import { suite } from "../../src/suite/suite";
import { indentMap } from "../../src/utils/indentMap";
import { joinNewLine } from "../../src/utils/joinNewLine";
import { missingComment } from "../../src/utils/missingComment";
import { stringify } from "../../src/utils/stringify";
import { wantedComment } from "../../src/utils/wantedComment";

export default suite([
	{
		given: "2 different arrays",
		must: "return comparison message",
		received: compare([0, 1, 2, 3])([2, 3, 4, 0]),
		wanted: [
			"Received: [",
			...indentMap([
				missingComment("0, 1"),
				"2,",
				"3,",
				`4, ${UNWANTED_COMMENT}`,
				`0  ${UNWANTED_COMMENT}`
			]),
			"]"
		].join("\n")
	},
	{
		given: "2 different arrays with matching elements at the end",
		must: "return comparison message",
		received: compare([0, 1, 2, 3])([13, 13, 2, 3]),
		wanted: [
			"Received: [",
			...indentMap([
				missingComment("0, 1"),
				`13, ${UNWANTED_COMMENT}`,
				`13, ${UNWANTED_COMMENT}`,
				"2,",
				"3"
			]),
			"]"
		].join("\n")
	},
	{
		given: "2 different objects with missing property",
		must: "return comparison message",
		received: compare<Record<string, string>>({
			bar: "bar",
			foo: "foo",
			foobar: "foobar"
		})({
			bar: "baz",
			baz: "bar",
			foo: "foo"
		}),
		wanted: [
			"Received: {",
			...indentMap([
				`bar: "baz", ${wantedComment(stringify("bar"))}`,
				`baz: "bar", ${UNWANTED_COMMENT}`,
				`foo: "foo"`,
				missingComment(stringify("foobar"))
			]),
			"}"
		].join("\n")
	},
	{
		given: "2 different objects (without missing property)",
		must: "return comparison message",
		received: compare<Record<string, string>>({
			bar: "bar",
			foo: "foo"
		})({
			bar: "baz",
			baz: "bar",
			foo: "foo"
		}),
		wanted: [
			"Received: {",
			...indentMap([
				`bar: "baz", ${wantedComment(stringify("bar"))}`,
				`baz: "bar", ${UNWANTED_COMMENT}`,
				`foo: "foo"`
			]),
			"}"
		].join("\n")
	},
	{
		given: "2 different strings",
		must: "return comparison message",
		received: compare("bar")("foo"),
		wanted: joinNewLine([
			`${redText("Received:")} "foo"`,
			`${greenText("Wanted:")}   "bar"`
		])
	},
	{
		given: "2 different numbers",
		must: "return comparison message",
		received: compare(13)(42),
		wanted: joinNewLine([
			`${redText("Received:")} 42`,
			`${greenText("Wanted:")}   13`
		])
	},
	{
		given: "2 different types",
		must: "return comparison message",
		received: compare<number | readonly number[]>(13)([42]),
		wanted: joinNewLine([
			`${redText("Received:")} [42]`,
			`${greenText("Wanted:")}   13`
		])
	}
]);
