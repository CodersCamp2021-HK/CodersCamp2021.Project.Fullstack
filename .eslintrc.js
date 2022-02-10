/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
