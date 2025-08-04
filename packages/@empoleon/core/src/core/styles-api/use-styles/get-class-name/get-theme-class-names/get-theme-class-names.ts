import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { resolveClassNames } from '../resolve-class-names/resolve-class-names';

interface GetThemeClassNamesOptions {
  theme: EmpoleonTheme;
  themeName: string[];
  selector: string;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}

export function getThemeClassNames(_props: GetThemeClassNamesOptions) {
  return _props.themeName.map(
    (n) =>
      resolveClassNames({
        theme: _props.theme,
        classNames: _props.theme.components[n]?.classNames,
        props: _props.props,
        stylesCtx: _props.stylesCtx,
      })?.[_props.selector]
  );
}
