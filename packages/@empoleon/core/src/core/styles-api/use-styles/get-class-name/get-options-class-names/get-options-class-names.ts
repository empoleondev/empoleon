import { GetStylesApiOptions } from '../../../styles-api.types';
import {
  resolveClassNames,
  ResolveClassNamesInput,
} from '../resolve-class-names/resolve-class-names';

interface GetOptionsClassNamesInput extends Omit<ResolveClassNamesInput, 'classNames'> {
  selector: string;
  options: GetStylesApiOptions | undefined;
}

export function getOptionsClassNames(_props: GetOptionsClassNamesInput) {
  return resolveClassNames({
    theme: _props.theme,
    classNames: _props.options?.classNames,
    props: _props.options?.props || _props.props,
    stylesCtx: _props.stylesCtx,
  })[_props.selector];
}
