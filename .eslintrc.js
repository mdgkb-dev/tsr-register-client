module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'lines-between-class-members': 'off',
    'import/no-cycle': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    'max-len': ['error', { code: 170 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    quotes: [2, 'single', { avoidEscape: true }],
    'no-useless-escape': 0,
  },
};
