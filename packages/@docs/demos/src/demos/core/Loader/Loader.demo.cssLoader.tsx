import { createTheme, Loader, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { CssLoader, cssLoaderModuleCssCode, cssLoaderTsxCode } from './_CssLoader';

const code = `
import { MantineProvider, Loader } from '@empoleon/core';
import { CssLoader } from './CssLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
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
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
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

export const cssLoader: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'CssLoader.tsx', language: 'tsx', code: cssLoaderTsxCode },
    { fileName: 'CssLoader.module.css', language: 'scss', code: cssLoaderModuleCssCode },
  ],
};
