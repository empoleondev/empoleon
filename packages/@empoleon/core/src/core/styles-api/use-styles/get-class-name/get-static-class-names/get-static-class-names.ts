interface GetStaticClassNamesInput {
  themeName: string[];
  selector: string;
  classNamesPrefix: string;
  withStaticClass?: boolean;
}

/** Returns static component classes, for example, `.empoleon-Input-wrapper` */
export function getStaticClassNames(_props: GetStaticClassNamesInput) {
  if (_props.withStaticClass === false) {
    return [];
  }

  return _props.themeName.map((n) => `${_props.classNamesPrefix}-${n}-${_props.selector}`);
}
