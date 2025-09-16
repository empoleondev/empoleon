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

import { render } from 'solid-js/web';
import type { Preview } from '@storybook/html-vite';
import { EmpoleonProvider, useEmpoleonColorScheme } from '../packages/@empoleon/core'; // Adjust path as needed

// Theme sync component
function ThemeSync(props: { theme: string; children: any }) {
  // This will run in SolidJS context
  const { setColorScheme } = useEmpoleonColorScheme();

  // Set theme immediately
  setColorScheme(props.theme === 'dark' ? 'dark' : 'light');

  return props.children;
}

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
    const theme = context.globals.theme || 'light';

    // Create container for SolidJS
    const container = document.createElement('div');
    container.setAttribute('data-theme', theme);
    container.style.minHeight = '100vh';
    container.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    container.style.color = theme === 'dark' ? '#ffffff' : '#000000';

    // Render SolidJS component tree with providers
    render(() => (
      <EmpoleonProvider>
        <ThemeSync theme={theme}>
          <Story />
        </ThemeSync>
      </EmpoleonProvider>
    ), container);

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
