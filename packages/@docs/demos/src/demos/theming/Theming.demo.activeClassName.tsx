import { Button, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Theming.demo.activeClassName.module.css';

const tsxCode = `
import { EmpoleonProvider, Button } from '@empoleon/core';
import classes from './active.module.css';

function Demo() {
  return (
    <EmpoleonProvider theme={{ activeClassName: classes.active }}>
      <Button>Press me to see active styles</Button>
    </EmpoleonProvider>
  );
}
`;

const cssCode = `
.active {
  transition: transform 50ms ease-in-out;

  &:active {
    transform: scale(0.97);
  }
}
`;

function Demo() {
  return (
    <EmpoleonThemeProvider theme={{ activeClassName: classes.active }}>
      <Button>Press me to see active styles</Button>
    </EmpoleonThemeProvider>
  );
}

export const activeClassName: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code: tsxCode },
    { fileName: 'active.module.css', language: 'scss', code: cssCode },
  ],
};
