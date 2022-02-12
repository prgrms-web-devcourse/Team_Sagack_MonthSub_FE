const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@atom': path.resolve(__dirname, 'src/components/atom'),
      '@mocules': path.resolve(__dirname, 'src/components/mocules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@templates': path.resolve(__dirname, 'src/components/templates'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      // '@styles': path.resolve(__dirname, 'src/styles'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@(.*)$': '<rootDir>/src$1',
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
};
