module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict",
		"prettier",
	],
	rules: {
		"no-empty": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		// Leave indentation up to Prettier
		indent: "off",
		"no-tabs": "off",
		"@typescript-eslint/indent": "off",
	},
	overrides: [
		{
			files: ["src/database/*.ts"],
			rules: {
				"@typescript-eslint/no-unsafe-assignment": "off",
			},
		},
	],
	ignorePatterns: ["build", "node_modules"],
};
