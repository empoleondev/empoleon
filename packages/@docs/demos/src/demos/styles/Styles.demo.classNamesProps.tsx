import cx from 'clsx';
import { createTheme, EmpoleonThemeProvider, TextInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Styles.demo.classNamesProps.module.css';

const code = `
import cx from 'clsx';
import { EmpoleonProvider, createTheme, TextInput } from '@empoleon/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <TextInput required label="Required input" placeholder="Required input" />
      <TextInput error label="Input with error" placeholder="Input with error" mt="md" />
    </EmpoleonProvider>
  );
}
`;

const cssCode = `
.labelRequired {
  color: var(--empoleon-color-red-filled);
}

.inputError {
  background-color: var(--empoleon-color-red-light);
}
`;

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <TextInput required label="Required input" placeholder="Required input" />
      <TextInput error label="Input with error" placeholder="Input with error" mt="md" />
    </EmpoleonThemeProvider>
  );
}

export const classNamesProps: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
