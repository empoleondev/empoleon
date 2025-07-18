import { JSX } from "solid-js";

export function matches(regexp: RegExp, error?: JSX.Element) {
  const _error = error || true;

  return (value: unknown): JSX.Element => {
    if (typeof value !== 'string') {
      return _error;
    }

    return regexp.test(value) ? null : _error;
  };
}
