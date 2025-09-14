import { createTheme, EmpoleonThemeProvider, useProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { JSX } from 'solid-js';

const code = `
import { useProps, EmpoleonThemeProvider, createTheme } from '@empoleon/core';

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>Default color</CustomComponent>

      <EmpoleonThemeProvider theme={theme}>
        <CustomComponent>Provider color</CustomComponent>
        <CustomComponent color="blue">Prop color</CustomComponent>
      </EmpoleonThemeProvider>
    </div>
  );
}
`;

interface CustomComponentProps {
  color?: string;
  children?: JSX.Element;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>Default color</CustomComponent>

      <EmpoleonThemeProvider theme={theme}>
        <CustomComponent>Provider color</CustomComponent>
        <CustomComponent color="blue">Prop color</CustomComponent>
      </EmpoleonThemeProvider>
    </div>
  );
}

export const usePropsHook: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
