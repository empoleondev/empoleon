import { createEffect } from 'solid-js';
import type { Accessor } from 'solid-js';

const MIME_TYPES: Record<string, string> = {
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
};

export function useFavicon(url: Accessor<string> | string): void {
  createEffect(() => {
    const currentUrl = typeof url === 'function' ? url() : url;
    const trimmedUrl = typeof currentUrl === 'string' ? currentUrl.trim() : '';

    if (!trimmedUrl) {
      return;
    }

    const targetDocument =
      window.parent && window.parent !== window && window.parent.document
        ? window.parent.document
        : document;

    const existingElements = targetDocument.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');

    existingElements.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    const link = targetDocument.createElement('link');
    link.rel = 'shortcut icon';

    const splittedUrl = trimmedUrl.split('.');
    const extension = splittedUrl[splittedUrl.length - 1].toLowerCase();

    if (MIME_TYPES[extension]) {
      link.type = MIME_TYPES[extension];
    }

    link.href = trimmedUrl;

    targetDocument.head.appendChild(link);
  });
}
