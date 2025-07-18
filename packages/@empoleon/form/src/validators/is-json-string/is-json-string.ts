import { JSX } from "solid-js";

export function isJSONString(error?: JSX.Element) {
  const _error = error || true;

  return (value: unknown): JSX.Element => {
    if (typeof value === 'string') {
      try {
        JSON.parse(value);
        return null;
      } catch (e) {
        return _error;
      }
    }

    return _error;
  };
}
