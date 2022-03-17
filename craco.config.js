// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
};
