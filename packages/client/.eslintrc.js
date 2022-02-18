/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-plusplus': 0,
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsFor: ['ref'] }],
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['*.config.[jt]s', '*.stories.[jt]sx'],
      rules: { 'import/no-default-export': 0, 'import/no-extraneous-dependencies': 0 },
    },
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/recommended',
        'plugin:testing-library/react',
      ],
      rules: { 'import/no-extraneous-dependencies': 0, 'jest/expect-expect': [2, { assertFunctionNames: ['expect'] }] },
    },
  ],
};
