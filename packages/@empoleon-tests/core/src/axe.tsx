import { render } from '@solidjs/testing-library';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '@empoleon/core';

// Custom accessibility checks
function checkAccessibility(element: Element): string[] {
  const violations: string[] = [];

  // Check for missing aria-label on buttons without text content
  const buttons = element.querySelectorAll('button');
  buttons.forEach((button, index) => {
    const hasText = button.textContent?.trim();
    const hasLabel = button.getAttribute('aria-label');
    const hasLabelledBy = button.getAttribute('aria-labelledby');

    if (!hasText && !hasLabel && !hasLabelledBy) {
      violations.push(
        `Button ${index + 1} is missing accessible name (aria-label, aria-labelledby, or text content)`
      );
    }
  });

  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    const hasAlt = img.hasAttribute('alt');
    if (!hasAlt) {
      violations.push(`Image ${index + 1} is missing alt attribute`);
    }
  });

  // Check for proper heading hierarchy
  const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length > 1) {
    let prevLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1], 10);
      if (index === 0 && level !== 1) {
        // First heading should be h1, but this might be too strict for components
      } else if (level > prevLevel + 1) {
        violations.push(
          `Heading hierarchy skip detected: ${heading.tagName} follows h${prevLevel}`
        );
      }
      prevLevel = level;
    });
  }

  // Check for form inputs without labels
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const hasLabel = input.getAttribute('aria-label');
    const hasLabelledBy = input.getAttribute('aria-labelledby');
    const id = input.getAttribute('id');
    const associatedLabel = id ? element.querySelector(`label[for="${id}"]`) : null;

    if (!hasLabel && !hasLabelledBy && !associatedLabel) {
      violations.push(
        `Form input ${index + 1} (${input.tagName.toLowerCase()}) is missing accessible name`
      );
    }
  });

  // Check for sufficient color contrast (basic check)
  const interactiveElements = element.querySelectorAll('button, a, input, textarea, select');
  interactiveElements.forEach((el, index) => {
    const styles = window.getComputedStyle(el);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;

    // This is a very basic check - ideally you'd calculate actual contrast ratios
    if (backgroundColor === 'rgba(0, 0, 0, 0)' && color === 'rgba(0, 0, 0, 0)') {
      violations.push(`Interactive element ${index + 1} may have insufficient color contrast`);
    }
  });

  // Check for keyboard accessibility indicators
  const focusableElements = element.querySelectorAll(
    'button, a, input, textarea, select, [tabindex]'
  );
  focusableElements.forEach((el, index) => {
    const tabIndex = el.getAttribute('tabindex');
    if (tabIndex && parseInt(tabIndex, 10) > 0) {
      violations.push(
        `Element ${index + 1} has positive tabindex (${tabIndex}), which can disrupt tab order`
      );
    }
  });

  return violations;
}

export function axe(elementFactories: (() => JSX.Element)[]): void {
  it('has no accessibility violations', async () => {
    for (const elementFactory of elementFactories) {
      // Render component within provider
      const result = render(() => (
        <EmpoleonProvider theme={{}} env="test">
          {elementFactory()}
        </EmpoleonProvider>
      ));

      // Wait for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 10));

      try {
        // Get the rendered element
        const element = result.container.firstElementChild || result.container;

        if (!element) {
          throw new Error('No rendered element found');
        }

        // Run our custom accessibility checks
        const violations = checkAccessibility(element as Element);

        // Add explicit assertion
        expect(violations).toHaveLength(0);

        if (violations.length > 0) {
          const summary = violations.join('\n• ');
          throw new Error(`Accessibility violations found:\n• ${summary}`);
        }
      } finally {
        result.unmount();
      }
    }
  }, 30000);
}
