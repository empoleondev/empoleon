const TABBABLE_NODES = /input|select|textarea|button|object/;
export const FOCUS_SELECTOR = 'a, input, select, textarea, button, object, [tabindex]';

function hidden(element: HTMLElement) {
  if ((import.meta as any).env.MODE === 'test') {
    return false;
  }

  return element.style.display === 'none';
}

function visible(element: HTMLElement) {
  const isHidden =
    element.getAttribute('aria-hidden') ||
    element.getAttribute('hidden') ||
    element.getAttribute('type') === 'hidden';

  if (isHidden) {
    return false;
  }

  let parentElement: HTMLElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }

    if (hidden(parentElement)) {
      return false;
    }

    parentElement = parentElement.parentNode as HTMLElement;
  }

  return true;
}

function getElementTabIndex(element: HTMLElement) {
  let tabIndex: string | null | undefined = element.getAttribute('tabindex');
  if (tabIndex === null) {
    tabIndex = undefined;
  }
  return parseInt(tabIndex as string, 10);
}

export function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res =
    // @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition
    (TABBABLE_NODES.test(nodeName) && !element.disabled) ||
    (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);

  return res && visible(element);
}

export function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}

export function findTabbableDescendants(element: HTMLElement): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)).filter(tabbable);
}
