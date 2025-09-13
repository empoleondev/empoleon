import {
  Button,
  DEFAULT_THEME,
  EmpoleonThemeProvider,
  parseThemeColor,
  Stack,
  useEmpoleonTheme,
} from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = (props: Record<string, any>) => `
import { Button, createTheme, EmpoleonProvider, Stack } from '@empoleon/core';

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: ${props.luminanceThreshold},
});

function Wrapper(props: any) {
  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color=${
          parseThemeColor({ theme: DEFAULT_THEME, color: props.color }).isThemeColor
            ? `{\`${props.color}.\${index}\`}`
            : `"${props.color}"`
        }
      >
        Button
      </Button>
    ));

  return (
    <EmpoleonProvider theme={theme}>
      <Stack>{buttons}</Stack>
    </EmpoleonProvider>
  );
}
`;

function Wrapper(props: any) {
  const theme = useEmpoleonTheme();

  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        color={
          parseThemeColor({ theme, color: props.color }).isThemeColor
            ? `${props.color}.${index}`
            : props.color
        }
      >
        Button
      </Button>
    ));

  return (
    <EmpoleonThemeProvider
      inherit
      theme={{
        autoContrast: true,
        luminanceThreshold: props.luminanceThreshold,
      }}
    >
      <Stack>{buttons}</Stack>
    </EmpoleonThemeProvider>
  );
}

export const luminanceThreshold: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    {
      type: 'number',
      prop: 'luminanceThreshold',
      initialValue: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      libraryValue: '__',
    },
  ],
};
