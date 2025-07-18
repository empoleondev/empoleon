import { JSX } from "solid-js";

function removeHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, '');
}

export function isNotEmptyHTML(error?: JSX.Element) {
  const _error = error || true;

  return (value: unknown): JSX.Element => {
    if (typeof value === 'string') {
      return removeHtmlTags(value).trim().length > 0 ? null : _error;
    }

    return _error;
  };
}
