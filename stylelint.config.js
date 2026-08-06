module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'color-hex-length': 'long',
    'block-no-empty': true,
    'selector-class-pattern': '^[a-z][a-z0-9-]+(__[a-z0-9-]+)?$',
  },
};
