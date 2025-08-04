interface GetRootClassNameInput {
  rootSelector: string;
  selector: string;
  className: string | undefined;
}

/** Adds `className` to the list if given selector is root */
export function getRootClassName(_props: GetRootClassNameInput) {
  return _props.rootSelector === _props.selector ? _props.className : undefined;
}
