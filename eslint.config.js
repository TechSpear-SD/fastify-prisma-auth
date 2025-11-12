import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-config-prettier';

export default [
    {
        ignores: ['src/generated/**', 'dist/**', 'node_modules/**', 'eslint.config.js'],
    },
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'import/order': ['warn', { 'newlines-between': 'always' }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    prettierPlugin,
];
