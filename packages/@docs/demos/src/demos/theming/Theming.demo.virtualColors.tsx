import { Box } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Box } from '@empoleon/core';

export function Demo() {
  return (
    <Box bg="primary" c="white" p="md" fw={700}>
      This box has virtual background color,
      it is pink in dark mode and cyan in light mode
    </Box>
  );
}
`;

const appCode = `
import { createTheme, EmpoleonProvider, virtualColor } from '@empoleon/core';
import { Demo } from './Demo';

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});

function App() {
  return (
    <EmpoleonProvider theme={theme}>
      <Demo />
    </EmpoleonProvider>
  );
}
`;

function Demo() {
  return (
    <Box bg="virtual" c="white" p="md" fw={700}>
      This box has virtual background color, it is pink in dark mode and cyan in light mode
    </Box>
  );
}

export const virtualColors: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'App.tsx', code: appCode, language: 'tsx' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
