import { JSX } from 'solid-js';
import { CssVariable } from '../../../../Box';
import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { mergeVars } from './merge-vars';

type ResolvedVars = Partial<Record<string, Record<CssVariable, string>>>;

export type VarsResolver = (
  theme: EmpoleonTheme,
  props: Record<string, any>,
  stylesCtx: Record<string, any> | undefined
) => ResolvedVars;

interface ResolveVarsInput {
  vars: VarsResolver | undefined;
  varsResolver: VarsResolver | undefined;
  theme: EmpoleonTheme;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  selector: string;
  themeName: string[];
  headless?: boolean;
}

export function resolveVars(_props: ResolveVarsInput) {
  const _vars =  mergeVars([
    _props.headless ? {} : _props.varsResolver?.(_props.theme, _props.props, _props.stylesCtx),
    ..._props.themeName.map((name) => _props.theme.components?.[name]?.vars?.(_props.theme, _props.props, _props.stylesCtx)),
    _props.vars?.(_props.theme, _props.props, _props.stylesCtx),
  ])?.[_props.selector] as JSX.CSSProperties;

  return _vars;
}
