import { createSignal, createEffect } from 'solid-js';

interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

export interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

declare global {
  interface Window {
    EyeDropper?: {
      new(): {
        open(options?: EyeDropperOpenOptions): Promise<EyeDropperOpenReturnType>;
      };
    };
  }
}

function checkSupport(): boolean {
  return typeof window !== 'undefined' &&
    !navigator.userAgent.includes('OPR') &&
    'EyeDropper' in window &&
    typeof window.EyeDropper === 'function' &&
    window.isSecureContext;
}

export function useEyeDropper() {
  const [supported, setSupported] = createSignal(
    typeof window !== 'undefined' ? checkSupport() : false
  );

  createEffect(() => {
    if (typeof window !== 'undefined') {
      setSupported(checkSupport());
    }
  });

  const open = async (options: EyeDropperOpenOptions = {}): Promise<EyeDropperOpenReturnType | undefined> => {
    if (!supported()) return undefined;

    try {
      const eyeDropper = new window.EyeDropper!();
      return await eyeDropper.open(options);
    } catch {
      return undefined;
    }
  };

  return { supported, open };
}
