import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist', '**/*.d.ts'] },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-alert': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-use-before-define': 0,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-fragments': ['error', 'element'],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/function-component-definition': [
        2,
        { namedComponents: 'function-declaration' },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                'Please use named imports from React instead of default import. Example: import { useState } from "react"',
            },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/explicit-function-return-type': 2,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enum',
          format: ['PascalCase'],
          failureMessage:
            'Enums must be in PascalCase (e.g., UserRole, OrderStatus)',
        },
        {
          selector: ['enumMember'],
          format: ['PascalCase'],
          failureMessage: 'Enum members must be in PascalCase (e.g. UserAdmin)',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          failureMessage:
            'Types must be in PascalCase (e.g., UserProps, OrderItem)',
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          prefix: ['T', 'K'],
          failureMessage:
            'Type parameters must be in PascalCase and start with T or K (e.g., TData, TResponse)',
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          failureMessage: 'Parameters must be in camelCase',
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'after',
            },
          ],
          distinctGroup: false,
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'spaced-comment': ['error', 'always', { exceptions: ['-'] }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['if', 'for', 'while', 'switch', 'try'],
        },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: ['import'], next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
    },
  },
);
