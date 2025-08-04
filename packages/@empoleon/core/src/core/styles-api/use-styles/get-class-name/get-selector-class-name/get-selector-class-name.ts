interface GetSelectorClassNameInput {
  selector: string;
  classes: Record<string, string>;
  unstyled: boolean | undefined;
}

/** Returns class for given selector from library styles (`*.module.css`) */
export function getSelectorClassName(_props: GetSelectorClassNameInput) {
  return _props.unstyled ? undefined : _props.classes[_props.selector];
}
