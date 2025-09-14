import { IconMoon, IconSun } from '@tabler/icons-solidjs';
import cx from 'clsx';
import { ActionIcon, useComputedColorScheme, useEmpoleonColorScheme } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Theming.demo.colorSchemeControl.module.css';

const code = `
import { ActionIcon, useEmpoleonColorScheme, useComputedColorScheme } from '@empoleon/core';
import { IconSun, IconMoon } from '@tabler/icons-solidjs';
import cx from 'clsx';
import classes from './Demo.module.css';

function Demo() {
  const { setColorScheme } = useEmpoleonColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke='1.5' />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke='1.5' />
    </ActionIcon>
  );
}
`;

const cssCode = `
.icon {
  width: 22px;
  height: 22px;
}

.dark {
  @mixin dark {
    display: none;
  }

  @mixin light {
    display: block;
  }
}

.light {
  @mixin light {
    display: none;
  }

  @mixin dark {
    display: block;
  }
}
`;

function Demo() {
  const { setColorScheme } = useEmpoleonColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun class={cx(classes.icon, classes.light)} stroke='1.5' />
      <IconMoon class={cx(classes.icon, classes.dark)} stroke='1.5' />
    </ActionIcon>
  );
}

export const colorSchemeControl: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', language: 'scss', code: cssCode },
  ],
};
