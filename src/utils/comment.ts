/**
 * Takes a title and a value and turns it into an inline comment.
 *
 * @category Common
 */
export const comment =
	(formatter: (input: string) => string) => (value: string) =>
		formatter(`// ${value}`);
