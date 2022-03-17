const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.resolve.alias['@atom'] = path.resolve(
      __dirname,
      '../src/components/atom',
    );
    config.resolve.alias['@molecules'] = path.resolve(
      __dirname,
      '../src/components/molecules',
    );
    config.resolve.alias['@organisms'] = path.resolve(
      __dirname,
      '../src/components/organisms',
    );
    config.resolve.alias['@templates'] = path.resolve(
      __dirname,
      '../src/components/templates',
    );
    config.resolve.alias['@pages'] = path.resolve(__dirname, '../src/pages');
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../src/utils');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, '../src/hooks');
    config.resolve.alias['@styles'] = path.resolve(__dirname, '../src/styles');
    config.resolve.alias['@contexts'] = path.resolve(
      __dirname,
      '../src/contexts',
    );
    config.resolve.alias['@apis'] = path.resolve(__dirname, '../src/apis');
    config.resolve.alias['@images'] = path.resolve(__dirname, '../src/images');
    config.resolve.alias['@constants'] = path.resolve(
      __dirname,
      '../src/constants',
    );
    config.resolve.alias['@types'] = path.resolve(__dirname, '../src/types');
    return config;
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
