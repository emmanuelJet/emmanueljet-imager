import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // Type Safety
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Imports
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal'],
          'pathGroups': [
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always'
        }
      ],

      // Code Style
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'func-style': ['error', 'expression', { 'allowArrowFunctions': true }],
      'no-console': 'error',
      'no-warning-comments': ['error', { 'terms': ['todo', 'fixme'], 'location': 'anywhere' }],
      'no-restricted-syntax': [
        'error',
        {
          'selector': 'Literal[value=/\\s{2,}/]',
          'message': 'String literals should not contain consecutive white spaces.'
        },
        {
          'selector': 'FunctionDeclaration',
          'message': 'Use arrow functions instead of function declarations.'
        }
      ],
    },
  },
]);

export default eslintConfig;
