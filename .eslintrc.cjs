module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // un-ban a type that's banned by default
          '{}': false
        }
      }
    ],
    'no-warning-comments': [
      1,
      { terms: ['todo', 'fixme'], location: 'anywhere' }
    ],
    'no-console': ['error']
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ]
};
