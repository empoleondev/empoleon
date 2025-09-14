import { createTheme, Loader, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { RingLoader, ringLoaderCode } from './_RingLoader';

const code = `
import { MantineProvider, Loader } from '@empoleon/core';
import { RingLoader } from './RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Loader />
    </EmpoleonThemeProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Loader />
    </EmpoleonThemeProvider>
  );
}

export const customType: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'RingLoader.tsx', language: 'tsx', code: ringLoaderCode },
  ],
};
