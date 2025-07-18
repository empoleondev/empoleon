import { createSignal, createEffect, onCleanup, createMemo } from 'solid-js';

export interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

export function useFetch<T>(url: string, { autoInvoke = true, ...options }: UseFetchOptions = {}) {
  const [data, setData] = createSignal<T | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<Error | null>(null);
  let controller: AbortController | null = null;

  const refetch = () => {
    if (!url) {
      return;
    }

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    setLoading(true);

    return fetch(url, { signal: controller.signal, ...options })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
        return res as T;
      })
      .catch((err) => {
        setLoading(false);

        if (err.name !== 'AbortError') {
          setError(err);
        }

        return err;
      });
  };

  const abort = () => {
    if (controller) {
      controller?.abort('');
    }
  };

  createEffect(() => {
    if (autoInvoke) {
      refetch();
    }
  });

  onCleanup(() => {
    if (controller) {
      controller.abort('');
    }
  });

  return {
    data,
    loading,
    error,
    refetch,
    abort
  };
}
