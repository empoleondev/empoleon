import { JSX } from "solid-js";

export function matchesField(field: string, error?: JSX.Element) {
  const _error = error || true;

  return (value: unknown, values: Record<string, unknown>): JSX.Element => {
    if (!values || !(field in values)) {
      return _error;
    }

    return value === values[field] ? null : _error;
  };
}
