import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import tsEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/*.min.js', '**/index.html', '**/package-lock.json'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,vue}'],
    extends: ['js/recommended', 'ts/recommended', 'vue/flat/essential', prettierConfig],
    plugins: {
      js,
      ts: tsEslint,
      vue: pluginVue,
      prettier: prettierPlugin,
    },
    rules: {
      // @ts-expect-error TODO разобраться потом
      ...prettierPlugin?.configs?.recommended?.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'no-console': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'warn',
      curly: 'warn',
      'no-else-return': 'warn',
      'object-property-newline': 'warn',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowTernary: true,
          allowShortCircuit: true,
          allowTaggedTemplates: true,
        },
      ],
      // TODO временные опции пока только начали применять ts, убрать потом
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // ! TODO
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true,
      },
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },
  {
    files: ['**/*.spec.{js,ts}', '**/*.test.{js,ts}'],
    plugins: { jest: pluginJest },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
  },
]);
