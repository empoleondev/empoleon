import { IconError404, IconFingerprint, IconPhoto } from '@tabler/icons-solidjs';
import {
  darken,
  defaultVariantColorsResolver,
  Group,
  EmpoleonThemeProvider,
  parseThemeColor,
  rgba,
  ThemeIcon,
  VariantColorsResolver,
} from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { IconPhoto, IconFingerprint, IconError404 } from '@tabler/icons-solidjs';
import {
  ThemeIcon,
  Group,
  MantineProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from '@empoleon/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--empoleon-color-black)',
      hoverColor: 'var(--empoleon-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: \`1px solid \${parsedColor.value}\`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--empoleon-color-red-9)',
      hover: 'var(--empoleon-color-red-8)',
      color: 'var(--empoleon-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <MantineProvider theme={{ variantColorResolver }}>
      <Group>
        <ThemeIcon color="lime.4" variant="filled">
          <IconPhoto size={20} />
        </ThemeIcon>

        <ThemeIcon color="orange" variant="light">
          <IconFingerprint size={20} />
        </ThemeIcon>

        <ThemeIcon variant="danger">
          <IconError404 size={20} />
        </ThemeIcon>
      </Group>
    </MantineProvider>
  );
}
`;

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--empoleon-color-black)',
      hoverColor: 'var(--empoleon-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--empoleon-color-red-9)',
      hover: 'var(--empoleon-color-red-8)',
      color: 'var(--empoleon-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <EmpoleonThemeProvider theme={{ variantColorResolver }}>
      <Group>
        <ThemeIcon color="lime.4" variant="filled" size="lg">
          <IconPhoto size={20} stroke='1.5' />
        </ThemeIcon>

        <ThemeIcon color="orange" variant="light" size="lg">
          <IconFingerprint size={20} stroke='1.5' />
        </ThemeIcon>

        <ThemeIcon variant="danger" size="lg">
          <IconError404 size={20} stroke='1.5' />
        </ThemeIcon>
      </Group>
    </EmpoleonThemeProvider>
  );
}

export const variantColorsResolver: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  defaultExpanded: false,
  code,
};
