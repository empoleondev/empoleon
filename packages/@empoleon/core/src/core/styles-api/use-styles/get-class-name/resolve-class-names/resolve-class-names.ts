import cx from 'clsx';
import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import type { _ClassNames } from '../get-class-name';

export interface ResolveClassNamesInput {
  theme: EmpoleonTheme;
  classNames: _ClassNames;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}

const EMPTY_CLASS_NAMES: Partial<Record<string, string>> = {};

function mergeClassNames(objects: Partial<Record<string, string>>[]) {
  const merged: Partial<Record<string, string>> = {};

  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = cx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });

  return merged;
}

export function resolveClassNames(_props: ResolveClassNamesInput) {
  const arrayClassNames = Array.isArray(_props.classNames) ? _props.classNames : [_props.classNames];
  const resolvedClassNames = arrayClassNames.map((item) =>
    typeof item === 'function' ? item(_props.theme, _props.props, _props.stylesCtx) : item || EMPTY_CLASS_NAMES
  );

  return mergeClassNames(resolvedClassNames);
}
