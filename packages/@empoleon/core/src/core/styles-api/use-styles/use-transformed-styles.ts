import { useEmpoleonStylesTransform, useEmpoleonTheme } from '../../EmpoleonProvider';

interface UseTransformedStylesInput {
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  themeName: string[];
}

export function useStylesTransform({ props, stylesCtx, themeName }: UseTransformedStylesInput) {
  const theme = useEmpoleonTheme();
  const stylesTransform = useEmpoleonStylesTransform()?.();

  const getTransformedStyles = (styles: any[]) => {
    if (!stylesTransform) {
      return [];
    }

    const transformedStyles = styles.map((style) =>
      stylesTransform(style, { props, theme, ctx: stylesCtx })
    );

    return [
      ...transformedStyles,
      ...themeName.map((n) =>
        stylesTransform(theme.components[n]?.styles, { props, theme, ctx: stylesCtx })
      ),
    ].filter(Boolean) as Record<string, string>[];
  };

  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform,
  };
}
