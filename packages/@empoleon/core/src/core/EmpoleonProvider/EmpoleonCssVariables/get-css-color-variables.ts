import { alpha, getPrimaryShade } from '../color-functions';
import { EmpoleonColor, EmpoleonTheme } from '../theme.types';

interface GetColorVariablesInput {
  theme: EmpoleonTheme;
  color: EmpoleonColor;
  colorScheme: 'light' | 'dark';
  name?: string;
  withColorValues?: boolean;
}

export function getCSSColorVariables({
  theme,
  color,
  colorScheme,
  name = color,
  withColorValues = true,
}: GetColorVariablesInput) {
  if (!theme.colors[color]) {
    return {};
  }

  if (colorScheme === 'light') {
    const primaryShade = getPrimaryShade(theme, 'light');

    const dynamicVariables = {
      [`--empoleon-color-${name}-text`]: `var(--empoleon-color-${name}-filled)`,
      [`--empoleon-color-${name}-filled`]: `var(--empoleon-color-${name}-${primaryShade})`,
      [`--empoleon-color-${name}-filled-hover`]: `var(--empoleon-color-${name}-${
        primaryShade === 9 ? 8 : primaryShade + 1
      })`,
      [`--empoleon-color-${name}-light`]: alpha(theme.colors[color][primaryShade], 0.1),
      [`--empoleon-color-${name}-light-hover`]: alpha(theme.colors[color][primaryShade], 0.12),
      [`--empoleon-color-${name}-light-color`]: `var(--empoleon-color-${name}-${primaryShade})`,
      [`--empoleon-color-${name}-outline`]: `var(--empoleon-color-${name}-${primaryShade})`,
      [`--empoleon-color-${name}-outline-hover`]: alpha(theme.colors[color][primaryShade], 0.05),
    };

    if (!withColorValues) {
      return dynamicVariables;
    }

    return {
      [`--empoleon-color-${name}-0`]: theme.colors[color][0],
      [`--empoleon-color-${name}-1`]: theme.colors[color][1],
      [`--empoleon-color-${name}-2`]: theme.colors[color][2],
      [`--empoleon-color-${name}-3`]: theme.colors[color][3],
      [`--empoleon-color-${name}-4`]: theme.colors[color][4],
      [`--empoleon-color-${name}-5`]: theme.colors[color][5],
      [`--empoleon-color-${name}-6`]: theme.colors[color][6],
      [`--empoleon-color-${name}-7`]: theme.colors[color][7],
      [`--empoleon-color-${name}-8`]: theme.colors[color][8],
      [`--empoleon-color-${name}-9`]: theme.colors[color][9],
      ...dynamicVariables,
    };
  }

  const primaryShade = getPrimaryShade(theme, 'dark');
  const dynamicVariables = {
    [`--empoleon-color-${name}-text`]: `var(--empoleon-color-${name}-4)`,
    [`--empoleon-color-${name}-filled`]: `var(--empoleon-color-${name}-${primaryShade})`,
    [`--empoleon-color-${name}-filled-hover`]: `var(--empoleon-color-${name}-${
      primaryShade === 9 ? 8 : primaryShade + 1
    })`,
    [`--empoleon-color-${name}-light`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.15
    ),
    [`--empoleon-color-${name}-light-hover`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.2
    ),
    [`--empoleon-color-${name}-light-color`]: `var(--empoleon-color-${name}-${Math.max(primaryShade - 5, 0)})`,
    [`--empoleon-color-${name}-outline`]: `var(--empoleon-color-${name}-${Math.max(primaryShade - 4, 0)})`,
    [`--empoleon-color-${name}-outline-hover`]: alpha(
      theme.colors[color][Math.max(primaryShade - 4, 0)],
      0.05
    ),
  };

  if (!withColorValues) {
    return dynamicVariables;
  }

  return {
    [`--empoleon-color-${name}-0`]: theme.colors[color][0],
    [`--empoleon-color-${name}-1`]: theme.colors[color][1],
    [`--empoleon-color-${name}-2`]: theme.colors[color][2],
    [`--empoleon-color-${name}-3`]: theme.colors[color][3],
    [`--empoleon-color-${name}-4`]: theme.colors[color][4],
    [`--empoleon-color-${name}-5`]: theme.colors[color][5],
    [`--empoleon-color-${name}-6`]: theme.colors[color][6],
    [`--empoleon-color-${name}-7`]: theme.colors[color][7],
    [`--empoleon-color-${name}-8`]: theme.colors[color][8],
    [`--empoleon-color-${name}-9`]: theme.colors[color][9],
    ...dynamicVariables,
  };
}
