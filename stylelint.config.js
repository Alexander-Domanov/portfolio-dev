module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'color-hex-length': 'long',
    'block-no-empty': true,
    'selector-class-pattern': '^[a-z][a-z0-9-]+(__[a-z0-9-]+)?$',
    'order/properties-order': [
      [
        {
          groupName: 'Positioning',
          properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
        },
        {
          groupName: 'Box model',
          properties: ['display', 'float', 'width', 'height', 'margin', 'padding'],
        },
        {
          groupName: 'Typography',
          properties: [
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
            'text-align',
            'color',
          ],
        },
      ],
      { unspecified: 'bottomAlphabetical' },
    ],
  },
};
