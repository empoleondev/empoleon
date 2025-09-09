import { alpha, getPrimaryShade } from '../color-functions';
import { EmpoleonColor, EmpoleonTheme } from '../theme.types';

interface GetColorVariablesInput {
  theme: EmpoleonTheme;
  color: EmpoleonColor;
  colorScheme: 'light' | 'dark';
  name?: string;
  withColorValues?: boolean;
}

export function getCSSColorVariables(props: GetColorVariablesInput) {
  const withColorValues = props.withColorValues ?? false;

  if (!props.theme.colors[props.color]) {
    return {};
  }

  if (props.colorScheme === 'light') {
    const primaryShade = getPrimaryShade(props.theme, 'light');

    const dynamicVariables = {
      [`--empoleon-color-${props.name}-text`]: `var(--empoleon-color-${props.name}-filled)`,
      [`--empoleon-color-${props.name}-filled`]: `var(--empoleon-color-${props.name}-${primaryShade})`,
      [`--empoleon-color-${props.name}-filled-hover`]: `var(--empoleon-color-${props.name}-${
        primaryShade === 9 ? 8 : primaryShade + 1
      })`,
      [`--empoleon-color-${props.name}-light`]: alpha(props.theme.colors[props.color][primaryShade], 0.1),
      [`--empoleon-color-${props.name}-light-hover`]: alpha(props.theme.colors[props.color][primaryShade], 0.12),
      [`--empoleon-color-${props.name}-light-color`]: `var(--empoleon-color-${props.name}-${primaryShade})`,
      [`--empoleon-color-${props.name}-outline`]: `var(--empoleon-color-${props.name}-${primaryShade})`,
      [`--empoleon-color-${props.name}-outline-hover`]: alpha(props.theme.colors[props.color][primaryShade], 0.05),
    };

    if (!withColorValues) {
      return dynamicVariables;
    }

    return {
      [`--empoleon-color-${props.name}-0`]: props.theme.colors[props.color][0],
      [`--empoleon-color-${props.name}-1`]: props.theme.colors[props.color][1],
      [`--empoleon-color-${props.name}-2`]: props.theme.colors[props.color][2],
      [`--empoleon-color-${props.name}-3`]: props.theme.colors[props.color][3],
      [`--empoleon-color-${props.name}-4`]: props.theme.colors[props.color][4],
      [`--empoleon-color-${props.name}-5`]: props.theme.colors[props.color][5],
      [`--empoleon-color-${props.name}-6`]: props.theme.colors[props.color][6],
      [`--empoleon-color-${props.name}-7`]: props.theme.colors[props.color][7],
      [`--empoleon-color-${props.name}-8`]: props.theme.colors[props.color][8],
      [`--empoleon-color-${props.name}-9`]: props.theme.colors[props.color][9],
      ...dynamicVariables,
    };
  }

  const primaryShade = getPrimaryShade(props.theme, 'dark');
  const dynamicVariables = {
    [`--empoleon-color-${props.name}-text`]: `var(--empoleon-color-${props.name}-4)`,
    [`--empoleon-color-${props.name}-filled`]: `var(--empoleon-color-${props.name}-${primaryShade})`,
    [`--empoleon-color-${props.name}-filled-hover`]: `var(--empoleon-color-${props.name}-${
      primaryShade === 9 ? 8 : primaryShade + 1
    })`,
    [`--empoleon-color-${props.name}-light`]: alpha(
      props.theme.colors[props.color][Math.max(0, primaryShade - 2)],
      0.15
    ),
    [`--empoleon-color-${props.name}-light-hover`]: alpha(
      props.theme.colors[props.color][Math.max(0, primaryShade - 2)],
      0.2
    ),
    [`--empoleon-color-${props.name}-light-color`]: `var(--empoleon-color-${props.name}-${Math.max(primaryShade - 5, 0)})`,
    [`--empoleon-color-${props.name}-outline`]: `var(--empoleon-color-${props.name}-${Math.max(primaryShade - 4, 0)})`,
    [`--empoleon-color-${props.name}-outline-hover`]: alpha(
      props.theme.colors[props.color][Math.max(primaryShade - 4, 0)],
      0.05
    ),
  };

  if (!withColorValues) {
    return dynamicVariables;
  }

  return {
    [`--empoleon-color-${props.name}-0`]: props.theme.colors[props.color][0],
    [`--empoleon-color-${props.name}-1`]: props.theme.colors[props.color][1],
    [`--empoleon-color-${props.name}-2`]: props.theme.colors[props.color][2],
    [`--empoleon-color-${props.name}-3`]: props.theme.colors[props.color][3],
    [`--empoleon-color-${props.name}-4`]: props.theme.colors[props.color][4],
    [`--empoleon-color-${props.name}-5`]: props.theme.colors[props.color][5],
    [`--empoleon-color-${props.name}-6`]: props.theme.colors[props.color][6],
    [`--empoleon-color-${props.name}-7`]: props.theme.colors[props.color][7],
    [`--empoleon-color-${props.name}-8`]: props.theme.colors[props.color][8],
    [`--empoleon-color-${props.name}-9`]: props.theme.colors[props.color][9],
    ...dynamicVariables,
  };
}
