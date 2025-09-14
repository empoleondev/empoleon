import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon, createTheme, Group, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './ActionIcon.demo.customSize.module.css';

const code = `
import { ActionIcon, createTheme, Group, EmpoleonThemeProvider } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <IconHeart size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <IconHeart size={32} />
        </ActionIcon>
      </Group>
    </EmpoleonThemeProvider>
  );
}
`;

const cssCode = `
.root {
  --ai-size-xxs: 16px;
  --ai-size-xxl: 50px;
}
`;

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <IconHeart size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <IconHeart size={32} />
        </ActionIcon>
      </Group>
    </EmpoleonThemeProvider>
  );
}

export const customSize: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
