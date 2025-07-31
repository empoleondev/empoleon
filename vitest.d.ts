/// <reference types="vitest" />

import type { AxeResults } from 'axe-core';

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
  toHaveNoAccessibilityViolations(): R;
}
