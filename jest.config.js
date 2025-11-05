/** @type {import('jest').Config} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	clearMocks: true,
	testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
	collectCoverageFrom: [
		"TS/testing/**/*.ts",
		"!**/*.spec.ts",
		"!**/*.test.ts",
	],
};
