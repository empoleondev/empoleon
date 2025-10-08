const empoleon = require('eslint-config-empoleon');
const vitest = require('eslint-plugin-vitest');
const solidjs = require('eslint-plugin-solid');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  ...empoleon,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
  {
    plugins: { solidjs, vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/valid-title': 'off',
        'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'expect*'],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      'no-console': 'error',
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    files: ['**/*.story.tsx'],
    rules: {
      'no-console': 'off',
    },
  }
);
