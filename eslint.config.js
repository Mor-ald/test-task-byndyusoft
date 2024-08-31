import js from "@eslint/js";
import globals from "globals";
import eslintReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";
import tseslint from "typescript-eslint";

export default tseslint.config({
	extends: [js.configs.recommended, ...tseslint.configs.recommended, jest.recommended],
	files: ["**/*.{ts,tsx}"],
	ignores: ["dist", "node_modules", "coverage"],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
		parserOptions: eslintReact.configs.recommended,
	},
	plugins: {
		react: eslintReact,
		reactHooks: reactHooks,
		reactRefresh: reactRefresh,
		prettierPlugin: prettierPlugin,
		jest: jest,
	},
	rules: {
		...eslintConfigPrettier.rules,
	},
});
