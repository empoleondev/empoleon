import { Button, ButtonFactory, Group, PartialVarsResolver } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const inlineCode = `
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@empoleon/core';

const varsResolver: PartialVarsResolver<ButtonFactory> = (theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}
`;

const providerCode = `
import { Button, Group, EmpoleonProvider, createTheme } from '@empoleon/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL Button</Button>
        <Button size="xxs">XXS Button</Button>
      </Group>
    </EmpoleonProvider>
  );
}
`;

const varsResolver: PartialVarsResolver<ButtonFactory> = (_theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

Button.extend({
  vars: (_theme, props) => {
    if (props.size === 'xxl') {
      return {
        root: {
          '--button-height': '60px',
          '--button-padding-x': '30px',
          '--button-fz': '24px',
        },
      };
    }

    if (props.size === 'xxs') {
      return {
        root: {
          '--button-height': '24px',
          '--button-padding-x': '10px',
          '--button-fz': '10px',
        },
      };
    }

    return { root: {} };
  },
});

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}

export const vars: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { code: providerCode, language: 'tsx', fileName: 'EmpoleonProvider.tsx' },
    { code: inlineCode, language: 'tsx', fileName: 'Inline.tsx' },
  ],
};
