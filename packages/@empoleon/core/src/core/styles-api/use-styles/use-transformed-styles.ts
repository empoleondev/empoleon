import { useEmpoleonStylesTransform, useEmpoleonTheme } from '../../EmpoleonProvider';

interface UseTransformedStylesInput {
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  themeName: string[];
}

export function useStylesTransform(_props: UseTransformedStylesInput) {
  const theme = useEmpoleonTheme();
  const stylesTransform = useEmpoleonStylesTransform()?.();

  const getTransformedStyles = (styles: any[]) => {
    if (!stylesTransform) {
      return [];
    }

    const transformedStyles = styles.map((style) =>
      stylesTransform(style, { props: _props.props, theme, ctx: _props.stylesCtx })
    );

    return [
      ...transformedStyles,
      ..._props.themeName.map((n) =>
        stylesTransform(theme.components[n]?.styles, { props: _props.props, theme, ctx: _props.stylesCtx })
      ),
    ].filter(Boolean) as Record<string, string>[];
  };

  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform,
  };
}
