import { JSX } from "solid-js";

export function isElement(value: any): value is JSX.Element {
  if (value == null) return false;

  // Primitive values are not elements
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return false;
  }

  // Arrays are not elements (even if they contain valid elements)
  if (Array.isArray(value)) {
    if (value.length > 0 && value.every(item => typeof item === 'function')) {
      return true;
    }

    return false;
  }

  // SolidJS reactive functions (components) are valid elements
  if (typeof value === "function") {
    return true;
  }

  // DOM elements are valid (SolidJS resolves JSX to actual DOM nodes in tests)
  if (value instanceof Element || value instanceof HTMLElement) {
    return true;
  }

  // Check for SolidJS JSX objects (before they're resolved)
  if (typeof value === 'object') {
    // Check for valid SolidJS elements
    if (value.t !== undefined ||
        (typeof value.type === 'string' || typeof value.type === 'function') ||
        value.$$typeof !== undefined) {
      return true;
    }
  }

  return false;
}
