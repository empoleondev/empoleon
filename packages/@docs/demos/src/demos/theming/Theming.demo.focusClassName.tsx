import { Button, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Theming.demo.focusClassName.module.css';

const tsxCode = `
import { EmpoleonProvider, Button } from '@empoleon/core';
import classes from './focus.module.css';

function Demo() {
  return (
    <EmpoleonProvider theme={{ focusClassName: classes.focus }}>
      <Button>Click button to see custom focus ring</Button>
    </EmpoleonProvider>
  );
}
`;

const cssCode = `
/* Use \`&:focus\` when you want focus ring to be visible when control is clicked */
.focus {
  &:focus {
    outline: 2px solid var(--empoleon-color-red-filled);
    outline-offset: 3px;
  }
}

/* Use \`&:focus-visible\` when you want focus ring to be visible
   only when user navigates with keyboard, for example by pressing Tab key */
.focus-auto {
  &:focus-visible {
    outline: 2px solid var(--empoleon-color-red-filled);
    outline-offset: 2px;
  }
}
`;

function Demo() {
  return (
    <EmpoleonThemeProvider inherit theme={{ focusClassName: classes.focus }}>
      <Button>Click button to see custom focus ring</Button>
    </EmpoleonThemeProvider>
  );
}

export const focusClassName: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code: tsxCode },
    { fileName: 'focus.module.css', language: 'scss', code: cssCode },
  ],
};
