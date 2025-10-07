import {
  resolveClassNames,
  ResolveClassNamesInput,
} from '../resolve-class-names/resolve-class-names';

interface GetResolvedClassNamesOptions extends ResolveClassNamesInput {
  selector: string;
}

export function getResolvedClassNames(_props: GetResolvedClassNamesOptions) {
  return resolveClassNames({
    theme: _props.theme,
    classNames: _props.classNames,
    props: _props.props,
    stylesCtx: _props.stylesCtx,
  })[_props.selector];
}
