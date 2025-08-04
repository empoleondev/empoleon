import type { EmpoleonTheme } from '../../../../EmpoleonProvider';
import type { _Styles } from '../get-style';

export interface ResolveStylesInput {
  theme: EmpoleonTheme;
  styles: _Styles | _Styles[];
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}

export function resolveStyles(_props: ResolveStylesInput) {
  const arrayStyles = Array.isArray(_props.styles) ? _props.styles : [_props.styles];

  return arrayStyles.reduce<Record<string, any>>((acc, style) => {
    if (typeof style === 'function') {
      return { ...acc, ...style(_props.theme, _props.props, _props.stylesCtx) };
    }

    return { ...acc, ...style };
  }, {});
}
