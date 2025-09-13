import type { StorybookConfig } from 'storybook-solidjs-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  // fuck it, we'll do it live!
  stories: [
    '../packages/@empoleon/core/src/component/**/*.story.@(js|jsx|ts|tsx)',
    '../packages/@empoleon/carousel/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/dates/src/**/*.story.@(ts|tsx)',
    '../packages/@empoleon/dropzone/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/form/src/stories/*.story.@(ts|tsx)',
    '../packages/@empoleon/modals/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/notifications/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/nprogress/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/spotlight/src/*.story.@(ts|tsx)',
    '../packages/@empoleon/tiptap/src/*.story.@(ts|tsx)',
    '../packages/@empoleonx/*/src/**/*.story.@(ts|tsx)',
    '../packages/@docs/*/src/**/*.story.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
  ],
  framework: {
    name: 'storybook-solidjs-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins?.push(tsconfigPaths());
    return config;
  },
};

export default config;
