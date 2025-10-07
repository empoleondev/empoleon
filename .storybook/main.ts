import path from 'path';
import type { StorybookConfig } from '@storybook/html-vite';
import fg from 'fast-glob';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

const getPath = (storyPath: string) => path.resolve(process.cwd(), storyPath).replace(/\\/g, '/');
const getGlobPaths = (paths: string[]) =>
  paths.reduce<string[]>((acc, path) => [...acc, ...fg.sync(path)], []);

function getStoryPaths() {
  return getGlobPaths([
    getPath('packages/@empoleon/*/src/**/*.story.@(js|jsx|ts|tsx)'),
    getPath('packages/@empoleon/carousel/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/code-highlight/src/CodeHighlight/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/dates/src/**/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/dropzone/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/form/src/stories/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/modals/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/notifications/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/nprogress/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/spotlight/src/*.story.@(ts|tsx)'),
    getPath('packages/@empoleon/tiptap/src/*.story.@(ts|tsx)'),
    getPath('packages/@docs/*/src/**/*.story.@(ts|tsx)'),
  ]);
}

const storiesPath = getStoryPaths().sort((a, b) => {
  const nameA = path.basename(a).toLowerCase();
  const nameB = path.basename(b).toLowerCase();

  const componentA = nameA.split('.story')[0];
  const componentB = nameB.split('.story')[0];

  const actualComponentA = componentA.startsWith('demo:')
    ? componentA.substring(5).trim()
    : componentA;
  const actualComponentB = componentB.startsWith('demo:')
    ? componentB.substring(5).trim()
    : componentB;

  const componentComparison = actualComponentA.localeCompare(actualComponentB);
  if (componentComparison !== 0) {
    return componentComparison;
  }

  const isDemoA = componentA.startsWith('demo:');
  const isDemoB = componentB.startsWith('demo:');

  if (isDemoA === isDemoB) {
    return nameA.localeCompare(nameB);
  }

  return isDemoA ? 1 : -1;
});

const config: StorybookConfig = {
  stories: storiesPath,
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins?.push(solidPlugin({ hot: false }), tsconfigPaths());
    return config;
  },
};

export default config;
