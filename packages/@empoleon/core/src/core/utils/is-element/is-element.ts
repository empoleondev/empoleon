import { JSX } from "solid-js";

export function isElement(value: any): value is JSX.Element {
  if (value == null) return false;

  // Primitive values are not elements
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return false;
  }

  // Arrays can be valid JSX children in SolidJS (mixed content)
  if (Array.isArray(value)) {
    // Accept arrays that contain at least some valid elements
    // This handles cases like [text, function] or [function, function]
    if (value.length > 0) {
      const hasFunctions = value.some(item => typeof item === 'function');
      // Arrays with functions are valid (even mixed with text/other content)
      if (hasFunctions) {
        return true;
      }
      // Arrays with only DOM elements or other objects are not valid elements
      return false;
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
