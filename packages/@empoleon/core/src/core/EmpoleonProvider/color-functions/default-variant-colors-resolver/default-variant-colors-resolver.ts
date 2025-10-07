import { rem } from '../../../utils';
import { EmpoleonColor, EmpoleonGradient, EmpoleonTheme } from '../../theme.types';
import { darken } from '../darken/darken';
import { getGradient } from '../get-gradient/get-gradient';
import { parseThemeColor } from '../parse-theme-color/parse-theme-color';
import { rgba } from '../rgba/rgba';

export interface VariantColorsResolverInput {
  color: EmpoleonColor | undefined;
  theme: EmpoleonTheme;
  variant: string;
  gradient?: EmpoleonGradient;
  autoContrast?: boolean;
}

export interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
  hoverColor?: string;
}

export type VariantColorsResolver = (
  input: VariantColorsResolverInput
) => VariantColorResolverResult;

export const defaultVariantColorsResolver: VariantColorsResolver = (props) => {
  const parsed = parseThemeColor({ color: props.color, theme: props.theme });

  const _autoContrast =
    typeof props.autoContrast === 'boolean' ? props.autoContrast : props.theme.autoContrast;

  if (props.variant === 'none') {
    return {
      background: 'transparent',
      hover: 'transparent',
      color: 'inherit',
      border: 'none',
    };
  }

  if (props.variant === 'filled') {
    const textColor = _autoContrast
      ? parsed.isLight
        ? 'var(--empoleon-color-black)'
        : 'var(--empoleon-color-white)'
      : 'var(--empoleon-color-white)';
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--empoleon-color-${props.color}-filled)`,
          hover: `var(--empoleon-color-${props.color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`,
        };
      }

      return {
        background: `var(--empoleon-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--empoleon-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: props.color!,
      hover: darken(props.color!, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (props.variant === 'light') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--empoleon-color-${props.color}-light)`,
          hover: `var(--empoleon-color-${props.color}-light-hover)`,
          color: `var(--empoleon-color-${props.color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      const parsedColor = props.theme.colors[parsed.color][parsed.shade];

      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--empoleon-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: rgba(props.color!, 0.1),
      hover: rgba(props.color!, 0.12),
      color: props.color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (props.variant === 'outline') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--empoleon-color-${props.color}-outline-hover)`,
          color: `var(--empoleon-color-${props.color}-outline)`,
          border: `${rem(1)} solid var(--empoleon-color-${props.color}-outline)`,
        };
      }

      return {
        background: 'transparent',
        hover: rgba(props.theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--empoleon-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--empoleon-color-${parsed.color}-${parsed.shade})`,
      };
    }

    return {
      background: 'transparent',
      hover: rgba(props.color!, 0.05),
      color: props.color!,
      border: `${rem(1)} solid ${props.color}`,
    };
  }

  if (props.variant === 'subtle') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--empoleon-color-${props.color}-light-hover)`,
          color: `var(--empoleon-color-${props.color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      const parsedColor = props.theme.colors[parsed.color][parsed.shade];

      return {
        background: 'transparent',
        hover: rgba(parsedColor, 0.12),
        color: `var(--empoleon-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: 'transparent',
      hover: rgba(props.color!, 0.12),
      color: props.color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (props.variant === 'transparent') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: 'transparent',
          color: `var(--empoleon-color-${props.color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      return {
        background: 'transparent',
        hover: 'transparent',
        color: `var(--empoleon-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: 'transparent',
      hover: 'transparent',
      color: props.color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (props.variant === 'white') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'var(--empoleon-color-white)',
          hover: darken(props.theme.white, 0.01),
          color: `var(--empoleon-color-${props.color}-filled)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      return {
        background: 'var(--empoleon-color-white)',
        hover: darken(props.theme.white, 0.01),
        color: `var(--empoleon-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: 'var(--empoleon-color-white)',
      hover: darken(props.theme.white, 0.01),
      color: props.color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (props.variant === 'gradient') {
    return {
      background: getGradient(props.gradient, props.theme),
      hover: getGradient(props.gradient, props.theme),
      color: 'var(--empoleon-color-white)',
      border: 'none',
    };
  }

  if (props.variant === 'default') {
    return {
      background: 'var(--empoleon-color-default)',
      hover: 'var(--empoleon-color-default-hover)',
      color: 'var(--empoleon-color-default-color)',
      border: `${rem(1)} solid var(--empoleon-color-default-border)`,
    };
  }

  return {} as VariantColorResolverResult;
};
