const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve.alias["@atom"] = path.resolve(__dirname, '../src/components/atom');
    config.resolve.alias["@mocules"] = path.resolve(__dirname, '../src/components/mocules');
    config.resolve.alias["@organisms"] = path.resolve(__dirname, '../src/components/organisms');
    config.resolve.alias["@templates"] = path.resolve(__dirname, '../src/components/templates');
    config.resolve.alias["@pages"] = path.resolve(__dirname, "../src/pages");
    config.resolve.alias["@utils"] = path.resolve(__dirname, "../src/utils");
    config.resolve.alias["@hooks"] = path.resolve(__dirname, "../src/hooks");
    config.resolve.alias["@styles"] = path.resolve(__dirname, '../src/styles');
    config.resolve.alias["@contexts"] = path.resolve(__dirname, '../src/contexts');
    config.resolve.alias["@apis"] = path.resolve(__dirname, "../src/apis");
    return config
  }
}

