import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { resolveStyles } from '../resolve-styles/resolve-styles';

interface GetThemeStylesOptions {
  theme: EmpoleonTheme;
  themeName: string[];
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  selector: string;
}

export function getThemeStyles(_props: GetThemeStylesOptions) {
  return _props.themeName
    .map(
      (n) =>
        resolveStyles({
          theme: _props.theme,
          styles: _props.theme.components[n]?.styles,
          props: _props.props,
          stylesCtx: _props.stylesCtx,
        })[_props.selector]
    )
    .reduce((acc, val) => ({ ...acc, ...val }), {});
}
