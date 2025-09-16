import cx from 'clsx';
import { Container, createTheme, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Container.demo.responsive.module.css';

const code = `
import cx from 'clsx';
import { MantineProvider, Container, createTheme } from '@empoleon/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Container size="responsive" bg="var(--empoleon-color-blue-light)">
        Container with responsive size
      </Container>
    </MantineProvider>
  );
}
`;

const cssCode = `
.responsiveContainer {
  max-width: 300px;

  @media (min-width: em(400px)) {
    max-width: 400px;
  }

  @media (min-width: em(600px)) {
    max-width: 600px;
  }
}
`;

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Container size="responsive" bg="var(--empoleon-color-blue-light)">
        Container with responsive size
      </Container>
    </EmpoleonThemeProvider>
  );
}

export const responsive: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
