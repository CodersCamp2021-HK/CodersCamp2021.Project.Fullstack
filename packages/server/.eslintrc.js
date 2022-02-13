/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['*.config.[jt]s'],
      rules: { 'import/no-default-export': 0, 'import/no-extraneous-dependencies': 0 },
    },
    {
      files: ['**/?(*.)+(spec|test).[jt]s'],
      extends: ['plugin:jest/recommended', 'plugin:jest-formatting/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
        'jest/expect-expect': [2, { assertFunctionNames: ['expect'] }],
      },
    },
  ],
};
