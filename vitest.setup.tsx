/* eslint-disable no-console */
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import type { AxeResults } from 'axe-core';

// Your existing setup code...
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Suppress CSS parsing errors in tests
const originalConsoleError = console.error;
console.error = (...data) => {
  if (
    typeof data[0]?.toString === 'function' &&
    data[0].toString().includes('Error: Could not parse CSS stylesheet')
  ) {
    return;
  }
  originalConsoleError(...data);
};

class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IntersectionObserver as any;

// Mock for axe-core if needed - use the actual Node constructor from jsdom
const OriginalNode = window.Node;
Object.defineProperty(window, 'Node', {
  value: class Node {
    static ELEMENT_NODE = 1;
    static TEXT_NODE = 3;
    static DOCUMENT_NODE = 9;

    constructor() {
      // Use original Node constructor if available
      if (OriginalNode) {
        return new OriginalNode();
      }
    }
  },
  writable: true,
  configurable: true
});

// Add isConnected to Node prototype if it doesn't exist
if (!('isConnected' in window.Node.prototype)) {
  Object.defineProperty(window.Node.prototype, 'isConnected', {
    get: function(): boolean {
      const element = this as any;
      return !!(element.ownerDocument && element.ownerDocument.defaultView && element.ownerDocument.body && element.ownerDocument.body.contains(element));
    },
    configurable: true
  });
}

// Ensure axe-core can access DOM properly - Fix for read-only property error
if (typeof global !== 'undefined') {
  try {
    Object.defineProperty(global, 'Node', {
      value: window.Node,
      writable: true,
      configurable: true
    });
  } catch (error) {
    // If Node already exists and is not configurable, try to work around it
    if (!global.Node) {
      (global as any).Node = window.Node;
    }
  }
}

// Additional axe-core fixes for jsdom
if (!('isConnected' in window.Element.prototype)) {
  Object.defineProperty(window.Element.prototype, 'isConnected', {
    get: function(): boolean {
      return !!(this.ownerDocument && this.ownerDocument.defaultView && this.ownerDocument.body && this.ownerDocument.body.contains(this));
    },
    configurable: true
  });
}

// Ensure document has proper setup for axe
if (!document.documentElement.lang) {
  document.documentElement.lang = 'en';
}

// Custom axe matcher (optional)
expect.extend({
  toHaveNoAccessibilityViolations(axeResults: AxeResults) {
    const { violations } = axeResults;

    if (violations.length === 0) {
      return {
        pass: true,
        message: () => 'Expected accessibility violations, but none were found',
      };
    }

    const violationMessages = violations.map(violation =>
      `${violation.id}: ${violation.description} (${violation.nodes.length} node(s))`
    ).join('\n');

    return {
      pass: false,
      message: () => `Expected no accessibility violations, but found:\n${violationMessages}`,
    };
  },
});
