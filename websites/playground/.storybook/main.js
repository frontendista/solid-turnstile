/**
 * @type { import('storybook-solidjs-vite').StorybookConfig }
 */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
};

export default config;
