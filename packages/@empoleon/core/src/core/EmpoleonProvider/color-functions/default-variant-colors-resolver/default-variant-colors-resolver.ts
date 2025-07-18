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

export const defaultVariantColorsResolver: VariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient,
  autoContrast,
}) => {
  const parsed = parseThemeColor({ color, theme });

  const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast;

  if (variant === 'none') {
    return {
      background: 'transparent',
      hover: 'transparent',
      color: 'inherit',
      border: 'none',
    };
  }

  if (variant === 'filled') {
    const textColor = _autoContrast
      ? parsed.isLight
        ? 'var(--empoleon-color-black)'
        : 'var(--empoleon-color-white)'
      : 'var(--empoleon-color-white)';
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--empoleon-color-${color}-filled)`,
          hover: `var(--empoleon-color-${color}-filled-hover)`,
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
      background: color!,
      hover: darken(color!, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (variant === 'light') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--empoleon-color-${color}-light)`,
          hover: `var(--empoleon-color-${color}-light-hover)`,
          color: `var(--empoleon-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      const parsedColor = theme.colors[parsed.color][parsed.shade];

      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--empoleon-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: rgba(color!, 0.1),
      hover: rgba(color!, 0.12),
      color: color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (variant === 'outline') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--empoleon-color-${color}-outline-hover)`,
          color: `var(--empoleon-color-${color}-outline)`,
          border: `${rem(1)} solid var(--empoleon-color-${color}-outline)`,
        };
      }

      return {
        background: 'transparent',
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--empoleon-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--empoleon-color-${parsed.color}-${parsed.shade})`,
      };
    }

    return {
      background: 'transparent',
      hover: rgba(color!, 0.05),
      color: color!,
      border: `${rem(1)} solid ${color}`,
    };
  }

  if (variant === 'subtle') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--empoleon-color-${color}-light-hover)`,
          color: `var(--empoleon-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      const parsedColor = theme.colors[parsed.color][parsed.shade];

      return {
        background: 'transparent',
        hover: rgba(parsedColor, 0.12),
        color: `var(--empoleon-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: 'transparent',
      hover: rgba(color!, 0.12),
      color: color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (variant === 'transparent') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: 'transparent',
          color: `var(--empoleon-color-${color}-light-color)`,
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
      color: color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (variant === 'white') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'var(--empoleon-color-white)',
          hover: darken(theme.white, 0.01),
          color: `var(--empoleon-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`,
        };
      }

      return {
        background: 'var(--empoleon-color-white)',
        hover: darken(theme.white, 0.01),
        color: `var(--empoleon-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`,
      };
    }

    return {
      background: 'var(--empoleon-color-white)',
      hover: darken(theme.white, 0.01),
      color: color!,
      border: `${rem(1)} solid transparent`,
    };
  }

  if (variant === 'gradient') {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: 'var(--empoleon-color-white)',
      border: 'none',
    };
  }

  if (variant === 'default') {
    return {
      background: 'var(--empoleon-color-default)',
      hover: 'var(--empoleon-color-default-hover)',
      color: 'var(--empoleon-color-default-color)',
      border: `${rem(1)} solid var(--empoleon-color-default-border)`,
    };
  }

  return {} as VariantColorResolverResult;
};
