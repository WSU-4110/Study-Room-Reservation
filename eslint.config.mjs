import antfu from "@antfu/eslint-config";

export default antfu({
	stylistic: false,
	react: true,
	nextjs: true,
	rules: {
		"perfectionist/sort-imports": "warn",
	},
});
