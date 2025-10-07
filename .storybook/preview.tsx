// import type { Preview } from 'storybook-solidjs-vite';

// export const preview: Preview = {
//   parameters: {
//     // automatically create action args for all props that start with "on"
//     actions: { argTypesRegex: '^on.*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//   }
// };

import type { Preview } from '@storybook/html-vite';
import { render } from 'solid-js/web';

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story: any, context: any) => {
    const container = document.createElement('div');

    render(() => <Story {...context.args} />, container);

    return container;
  },
];

const preview: Preview = {
  globalTypes,
  decorators,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
