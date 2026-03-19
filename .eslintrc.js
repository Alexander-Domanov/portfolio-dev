module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
};
