import type { CssVariable } from '../../../Box';
import type { EmpoleonColorScheme, EmpoleonColorShade, EmpoleonTheme } from '../../theme.types';
import { getPrimaryShade } from '../get-primary-shade/get-primary-shade';
import { isLightColor } from '../luminance/luminance';

interface ParseThemeColorOptions {
  color: unknown;
  theme: EmpoleonTheme;
  colorScheme?: EmpoleonColorScheme;
}

interface ParseThemeColorResult {
  color: string;
  value: string;
  shade: EmpoleonColorShade | undefined;
  variable: CssVariable | undefined;
  isThemeColor: boolean;
  isLight: boolean;
}

export function parseThemeColor(props: ParseThemeColorOptions): ParseThemeColorResult {
  if (typeof props.color !== 'string') {
    throw new Error(
      `[@empoleon/core] Failed to parse color. Expected color to be a string, instead got ${typeof props.color}`
    );
  }

  if (props.color === 'bright') {
    return {
      color: props.color,
      value: props.colorScheme === 'dark' ? props.theme.white : props.theme.black,
      shade: undefined,
      isThemeColor: false,
      isLight: isLightColor(
        props.colorScheme === 'dark' ? props.theme.white : props.theme.black,
        props.theme.luminanceThreshold
      ),
      variable: '--empoleon-color-bright',
    };
  }

  if (props.color === 'dimmed') {
    return {
      color: props.color,
      value: props.colorScheme === 'dark' ? props.theme.colors.dark[2] : props.theme.colors.gray[7],
      shade: undefined,
      isThemeColor: false,
      isLight: isLightColor(
        props.colorScheme === 'dark' ? props.theme.colors.dark[2] : props.theme.colors.gray[6],
        props.theme.luminanceThreshold
      ),
      variable: '--empoleon-color-dimmed',
    };
  }

  if (props.color === 'white' || props.color === 'black') {
    return {
      color: props.color,
      value: props.color === 'white' ? props.theme.white : props.theme.black,
      shade: undefined,
      isThemeColor: false,
      isLight: isLightColor(
        props.color === 'white' ? props.theme.white : props.theme.black,
        props.theme.luminanceThreshold
      ),
      variable: `--empoleon-color-${props.color}`,
    };
  }

  const [_color, shade] = props.color.split('.');
  const colorShade = shade ? (Number(shade) as EmpoleonColorShade) : undefined;
  const isThemeColor = _color in props.theme.colors;

  if (isThemeColor) {
    const colorValue =
      colorShade !== undefined
        ? props.theme.colors[_color][colorShade]
        : props.theme.colors[_color][getPrimaryShade(props.theme, props.colorScheme || 'light')];

    return {
      color: _color,
      value: colorValue,
      shade: colorShade,
      isThemeColor,
      isLight: isLightColor(colorValue, props.theme.luminanceThreshold),
      variable: shade
        ? `--empoleon-color-${_color}-${colorShade}`
        : `--empoleon-color-${_color}-filled`,
    };
  }

  return {
    color: props.color,
    value: props.color,
    isThemeColor,
    isLight: isLightColor(props.color, props.theme.luminanceThreshold),
    shade: colorShade,
    variable: undefined,
  };
}
