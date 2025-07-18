import { createSignal, onMount } from 'solid-js';

interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

export interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

function isOpera() {
  return navigator.userAgent.includes('OPR');
}

export function useEyeDropper() {
  const [supported, setSupported] = createSignal(false);

  onMount(() => {
    setSupported(typeof window !== 'undefined' && !isOpera() && 'EyeDropper' in window);
  });

  const open = (options: EyeDropperOpenOptions = {}): Promise<EyeDropperOpenReturnType | undefined> => {
    if (supported()) {
      const eyeDropper = new (window as any).EyeDropper();
      return eyeDropper.open(options);
    }

    return Promise.resolve(undefined);
  };

  return { supported, open };
}
