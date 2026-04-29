/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: false, // Disable SWC to avoid conflicts
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  features: {
    buildStoriesJson: true,
  },
  env: (config) => ({
    ...config,
    FAST_REFRESH: 'false',
  }),
  webpackFinal: async (config) => {
    // Disable all development optimizations that cause issues
    config.mode = 'development';
    config.devtool = false;
    config.optimization = {
      ...config.optimization,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    };
    
    // Remove React Fast Refresh plugin entirely
    config.plugins = config.plugins.filter(plugin => {
      const name = plugin.constructor.name;
      return name !== 'ReactRefreshPlugin' && name !== 'RefreshPlugin';
    });
    
    // Override babel configuration to remove react-refresh
    config.module.rules = config.module.rules.map(rule => {
      if (rule.test && (rule.test.test('.js') || rule.test.test('.jsx'))) {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use = rule.use.map(use => {
            if (use.loader && use.loader.includes('babel-loader')) {
              return {
                ...use,
                options: {
                  ...use.options,
                  plugins: (use.options.plugins || []).filter(plugin => {
                    if (typeof plugin === 'string') {
                      return !plugin.includes('react-refresh');
                    }
                    if (Array.isArray(plugin)) {
                      return !plugin[0].includes('react-refresh');
                    }
                    return true;
                  }),
                  presets: use.options.presets,
                  cacheDirectory: false,
                },
              };
            }
            return use;
          }).filter(use => {
            // Remove react-refresh loader entirely
            if (use.loader && use.loader.includes('react-refresh')) {
              return false;
            }
            return true;
          });
        }
      }
      return rule;
    });
    
    return config;
  },
};
export default config;
