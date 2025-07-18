import { children, JSX } from "solid-js";

export function isElement(value: any): value is JSX.Element {
  if (value == null) return false;

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return false;
  }

  if (typeof value === "function") {
    try {
      const resolved = children(() => value)();

      if (resolved != null && typeof resolved === 'object') {
        if (Array.isArray(resolved)) {
          return resolved.length > 0 && resolved.some(item =>
            item != null &&
            typeof item === 'object' &&
            typeof item !== 'string' &&
            typeof item !== 'number' &&
            typeof item !== 'boolean'
          );
        }

        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  if (typeof value === 'object') {
    if (value.t !== undefined ||
        (typeof value.type === 'string' || typeof value.type === 'function') ||
        value.$$typeof !== undefined) {
      return true;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(item =>
        item != null &&
        typeof item === 'object' &&
        typeof item !== 'string' &&
        typeof item !== 'number' &&
        typeof item !== 'boolean'
      );
    }
  }

  return false;
}
