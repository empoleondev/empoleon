import { JSX } from 'solid-js';
import { EmpoleonStyleProp } from '../../../Box';
import { EmpoleonTheme } from '../../../EmpoleonProvider';
import { GetStylesApiOptions } from '../../styles-api.types';
import { getThemeStyles } from './get-theme-styles/get-theme-styles';
import { resolveStyle } from './resolve-style/resolve-style';
import { resolveStyles } from './resolve-styles/resolve-styles';
import { resolveVars, VarsResolver } from './resolve-vars/resolve-vars';

export type _Styles =
  | undefined
  | Partial<Record<string, JSX.CSSProperties>>
  | ((
      theme: EmpoleonTheme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined
    ) => Partial<Record<string, JSX.CSSProperties>>);

export interface GetStyleInput {
  theme: EmpoleonTheme;
  themeName: string[];
  selector: string;
  rootSelector: string;
  options: GetStylesApiOptions | undefined;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  styles: _Styles;
  style: EmpoleonStyleProp | undefined;
  vars: VarsResolver | undefined;
  varsResolver: VarsResolver | undefined;
  headless?: boolean;
  withStylesTransform?: boolean;
}

export function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver,
  headless,
  withStylesTransform,
}: GetStyleInput): JSX.CSSProperties {
  return {
    ...(!withStylesTransform && getThemeStyles({ theme, themeName, props, stylesCtx, selector })),
    ...(!withStylesTransform && resolveStyles({ theme, styles, props, stylesCtx })[selector]),
    ...(!withStylesTransform &&
      resolveStyles({ theme, styles: options?.styles, props: options?.props || props, stylesCtx })[
        selector
      ]),
    ...resolveVars({ theme, props, stylesCtx, vars, varsResolver, selector, themeName, headless }),
    ...(rootSelector === selector ? resolveStyle({ style, theme }) : null),
    ...resolveStyle({ style: options?.style, theme }),
  };
}
