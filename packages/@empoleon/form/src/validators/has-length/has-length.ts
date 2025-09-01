import { JSX } from "solid-js";

interface HasLengthOptions {
  max?: number;
  min?: number;
}

type HasLengthPayload = HasLengthOptions | number;

function isLengthValid(payload: HasLengthPayload, value: any) {
  if (typeof payload === 'number') {
    return value.length === payload;
  }

  let valid = true;

  if (typeof payload.max === 'number' && value.length > payload.max) {
    valid = false;
  }

  if (typeof payload.min === 'number' && value.length < payload.min) {
    valid = false;
  }

  return valid;
}

export function hasLength(payload: HasLengthPayload, error?: JSX.Element) {
  const _error = error || true;

  return (value: unknown): JSX.Element => {
    if (typeof value === 'string') {
      return isLengthValid(payload, value.trim()) ? null : _error;
    }

    if (typeof value === 'object' && value !== null && 'length' in value) {
      return isLengthValid(payload, value) ? null : _error;
    }

    return _error;
  };
}
