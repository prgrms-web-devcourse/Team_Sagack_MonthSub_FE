const CracoAlias = require('craco-alias');

export const babel = {
  presets: ['@emotion/babel-preset-css-prop'],
};
export const plugins = [
  {
    plugin: CracoAlias,
    options: {
      source: 'tsconfig',
      baseUrl: './src',
      tsConfigPath: './tsconfig.path.json',
    },
  },
];
