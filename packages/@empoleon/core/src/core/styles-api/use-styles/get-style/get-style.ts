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

export function getStyle(_props: GetStyleInput): JSX.CSSProperties {
  return {
    ...(!_props.withStylesTransform &&
      getThemeStyles({
        theme: _props.theme,
        themeName: _props.themeName,
        props: _props.props,
        stylesCtx: _props.stylesCtx,
        selector: _props.selector,
      })),
    ...(!_props.withStylesTransform &&
      resolveStyles({
        theme: _props.theme,
        styles: _props.styles,
        props: _props.props,
        stylesCtx: _props.stylesCtx,
      })[_props.selector]),
    ...(!_props.withStylesTransform &&
      resolveStyles({
        theme: _props.theme,
        styles: _props.options?.styles,
        props: _props.options?.props || _props.props,
        stylesCtx: _props.stylesCtx,
      })[_props.selector]),
    ...resolveVars({
      theme: _props.theme,
      props: _props.props,
      stylesCtx: _props.stylesCtx,
      vars: _props.vars,
      varsResolver: _props.varsResolver,
      selector: _props.selector,
      themeName: _props.themeName,
      headless: _props.headless,
    }),
    ...(_props.rootSelector === _props.selector
      ? resolveStyle({ style: _props.style, theme: _props.theme })
      : null),
    ...resolveStyle({ style: _props.options?.style, theme: _props.theme }),
  };
}
