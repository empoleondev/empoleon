import { GetStylesApiOptions } from '../../../styles-api.types';

interface GetVariantClassNameInput {
  options: GetStylesApiOptions | undefined;
  classes: Record<string, string>;
  selector: string;
  unstyled: boolean | undefined;
}

/** Returns variant className, variant is always separated from selector with `--`, for example, `tab--default` */
export function getVariantClassName(_props: GetVariantClassNameInput) {
  return _props.options?.variant && !_props.unstyled ? _props.classes[`${_props.selector}--${_props.options.variant}`] : undefined;
}
