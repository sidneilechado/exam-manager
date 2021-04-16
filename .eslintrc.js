module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'json',
	],
	extends: [
		'airbnb-typescript/base',
		'plugin:node/recommended',
		'plugin:json/recommended',
	],
	rules: {
		// Configuring 2-spaced Tab indentation and enforces indentation level for case clauses in switch statements
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'@typescript-eslint/indent': ['error', 'tab'],

		// Requires function return to be explicit defined
		'@typescript-eslint/explicit-function-return-type': 'warn',

		// Enforces using ';' as property separator in interfaces
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'semi',
				requireLast: true,
			},
			singleline: {
				delimiter: 'semi',
				requireLast: true,
			},
		}],

		// Allows unused variables in arguments if they start with _
		// Most of the time used in middlewares that needs the parameter.
		'@typescript-eslint/no-unused-vars': ['error', {
			argsIgnorePattern: '^_',
		}],

		// Allowing import & export syntax
		'node/no-unsupported-features/es-syntax': ['error', {
			ignores: ['modules'],
		}],

		'no-console': 'off',

		// This will allow TS files imports
		'node/no-missing-import': 'off',

		// This will allow module-alias usage
		'import/no-unresolved': 'off',

		'import/prefer-default-export': 'off',

		// Set the lines' max length to 120
		'max-len': ['error', { code: 120 }],

		// Do not error when there is no space for //#region and //#endregion (foldable area markers)
		'spaced-comment': ['error', 'always', {
			line: {
				markers: ['#region', '#endregion'],
			},
		}],

		// Disable the need of using parentheses around an arrow function's body
		'implicit-arrow-linebreak': 'off',

		'import/no-cycle': 'off',

		'consistent-return': 'off',

		'no-param-reassign': 'off',
		'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

		'import/extensions': ['error', 'ignorePackages',
			{
				js: 'never',
				ts: 'never',
			},
		],
	},
};
