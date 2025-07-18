import { createEffect } from 'solid-js';

export function useDocumentTitle(title: string) {
  createEffect(() => {
    if (typeof title === 'string' && title.trim().length > 0) {
      document.title = title.trim();
    }
  });
}
