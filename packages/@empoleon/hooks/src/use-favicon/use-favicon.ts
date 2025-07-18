import { createEffect, onCleanup } from 'solid-js';

const MIME_TYPES: Record<string, string> = {
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
};

export function useFavicon(url: string) {
  let link: HTMLLinkElement | null = null;

  createEffect(() => {
    if (!url) {
      return;
    }

    if (!link) {
      const existingElements = document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
      existingElements.forEach((element) => document.head.removeChild(element));

      const element = document.createElement('link');
      element.rel = 'shortcut icon';
      link = element;
      document.querySelector('head')!.appendChild(element);
    }

    const splittedUrl = url.split('.');
    link.setAttribute(
      'type',
      MIME_TYPES[splittedUrl[splittedUrl.length - 1].toLowerCase()]
    );
    link.setAttribute('href', url);
  });

  onCleanup(() => {
    if (link) {
      document.head.removeChild(link);
      link = null;
    }
  });
}
