import { keys, rem } from '../../utils';
import { getPrimaryContrastColor, getPrimaryShade } from '../color-functions';
import { ConvertCSSVariablesInput } from '../convert-css-variables';
import { EmpoleonTheme } from '../theme.types';
import { getCSSColorVariables } from './get-css-color-variables';
import { isVirtualColor } from './virtual-color/virtual-color';

export type CSSVariablesResolver = (theme: EmpoleonTheme) => ConvertCSSVariablesInput;

function assignSizeVariables(
  variables: Record<string, string>,
  sizes: Record<string, string>,
  name: string
) {
  keys(sizes).forEach((size) =>
    Object.assign(variables, { [`--empoleon-${name}-${size}`]: sizes[size] })
  );
}

export const defaultCssVariablesResolver: CSSVariablesResolver = (theme) => {
  const lightPrimaryShade = getPrimaryShade(theme, 'light');
  const defaultRadius =
    theme.defaultRadius in theme.radius
      ? theme.radius[theme.defaultRadius as 'xs']
      : rem(theme.defaultRadius);

  const result: ConvertCSSVariablesInput = {
    variables: {
      '--empoleon-scale': theme.scale.toString(),
      '--empoleon-cursor-type': theme.cursorType,
      '--empoleon-color-scheme': 'light dark',
      '--empoleon-webkit-font-smoothing': theme.fontSmoothing ? 'antialiased' : 'unset',
      '--empoleon-moz-font-smoothing': theme.fontSmoothing ? 'grayscale' : 'unset',
      '--empoleon-color-white': theme.white,
      '--empoleon-color-black': theme.black,
      '--empoleon-line-height': theme.lineHeights.md,
      '--empoleon-font-family': theme.fontFamily,
      '--empoleon-font-family-monospace': theme.fontFamilyMonospace,
      '--empoleon-font-family-headings': theme.headings.fontFamily,
      '--empoleon-heading-font-weight': theme.headings.fontWeight,
      '--empoleon-heading-text-wrap': theme.headings.textWrap,
      '--empoleon-radius-default': defaultRadius,

      // Primary colors
      '--empoleon-primary-color-filled': `var(--empoleon-color-${theme.primaryColor}-filled)`,
      '--empoleon-primary-color-filled-hover': `var(--empoleon-color-${theme.primaryColor}-filled-hover)`,
      '--empoleon-primary-color-light': `var(--empoleon-color-${theme.primaryColor}-light)`,
      '--empoleon-primary-color-light-hover': `var(--empoleon-color-${theme.primaryColor}-light-hover)`,
      '--empoleon-primary-color-light-color': `var(--empoleon-color-${theme.primaryColor}-light-color)`,
    },
    light: {
      '--empoleon-primary-color-contrast': getPrimaryContrastColor(theme, 'light'),
      '--empoleon-color-bright': 'var(--empoleon-color-black)',
      '--empoleon-color-text': theme.black,
      '--empoleon-color-body': theme.white,
      '--empoleon-color-error': 'var(--empoleon-color-red-6)',
      '--empoleon-color-placeholder': 'var(--empoleon-color-gray-5)',
      '--empoleon-color-anchor': `var(--empoleon-color-${theme.primaryColor}-${lightPrimaryShade})`,
      '--empoleon-color-default': 'var(--empoleon-color-white)',
      '--empoleon-color-default-hover': 'var(--empoleon-color-gray-0)',
      '--empoleon-color-default-color': 'var(--empoleon-color-black)',
      '--empoleon-color-default-border': 'var(--empoleon-color-gray-4)',
      '--empoleon-color-dimmed': 'var(--empoleon-color-gray-6)',
    },
    dark: {
      '--empoleon-primary-color-contrast': getPrimaryContrastColor(theme, 'dark'),
      '--empoleon-color-bright': 'var(--empoleon-color-white)',
      '--empoleon-color-text': 'var(--empoleon-color-dark-0)',
      '--empoleon-color-body': 'var(--empoleon-color-dark-7)',
      '--empoleon-color-error': 'var(--empoleon-color-red-8)',
      '--empoleon-color-placeholder': 'var(--empoleon-color-dark-3)',
      '--empoleon-color-anchor': `var(--empoleon-color-${theme.primaryColor}-4)`,
      '--empoleon-color-default': 'var(--empoleon-color-dark-6)',
      '--empoleon-color-default-hover': 'var(--empoleon-color-dark-5)',
      '--empoleon-color-default-color': 'var(--empoleon-color-white)',
      '--empoleon-color-default-border': 'var(--empoleon-color-dark-4)',
      '--empoleon-color-dimmed': 'var(--empoleon-color-dark-2)',
    },
  };

  assignSizeVariables(result.variables, theme.breakpoints, 'breakpoint');
  assignSizeVariables(result.variables, theme.spacing, 'spacing');
  assignSizeVariables(result.variables, theme.fontSizes, 'font-size');
  assignSizeVariables(result.variables, theme.lineHeights, 'line-height');
  assignSizeVariables(result.variables, theme.shadows, 'shadow');
  assignSizeVariables(result.variables, theme.radius, 'radius');

  theme.colors[theme.primaryColor].forEach((_, index) => {
    result.variables[`--empoleon-primary-color-${index}`] =
      `var(--empoleon-color-${theme.primaryColor}-${index})`;
  });

  keys(theme.colors).forEach((color) => {
    const value = theme.colors[color];

    if (isVirtualColor(value)) {
      Object.assign(
        result.light,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.light,
          colorScheme: 'light',
          withColorValues: true,
        })
      );

      Object.assign(
        result.dark,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.dark,
          colorScheme: 'dark',
          withColorValues: true,
        })
      );

      return;
    }

    value.forEach((shade, index) => {
      result.variables[`--empoleon-color-${color}-${index}`] = shade;
    });

    Object.assign(
      result.light,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: 'light',
        withColorValues: false,
      })
    );

    Object.assign(
      result.dark,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: 'dark',
        withColorValues: false,
      })
    );
  });

  const headings = theme.headings.sizes;

  keys(headings).forEach((heading) => {
    result.variables[`--empoleon-${heading}-font-size`] = headings[heading].fontSize;
    result.variables[`--empoleon-${heading}-line-height`] = headings[heading].lineHeight;
    result.variables[`--empoleon-${heading}-font-weight`] =
      headings[heading].fontWeight || theme.headings.fontWeight;
  });

  return result;
};
