import { createSignal } from "solid-js";

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = createSignal<Error | null>(null);
  const [copied, setCopied] = createSignal(false);
  const [copyTimeout, setCopyTimeout] = createSignal<number | null>(null);

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(copyTimeout()!);
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = (valueToCopy: any) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    window.clearTimeout(copyTimeout()!);
  };

  return { copy, reset, error, copied };
}
