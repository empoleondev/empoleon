import { createSignal, createEffect, onCleanup, Accessor } from 'solid-js';
import { autoUpdate } from '@empoleon/solid-floating-ui';
import { FloatingPosition } from './types';

interface Payload {
  opened: Accessor<boolean>;
  floating: {
    update: () => void;
    refs: {
      reference: () => Element | undefined;
      floating: () => Element | undefined;
    };
  };
  positionDependencies: any[];
  position: FloatingPosition;
}

export function useFloatingAutoUpdate({
  opened,
  floating,
  position,
  positionDependencies,
}: Payload) {
  const [delayedUpdate, setDelayedUpdate] = createSignal(0);

  // Main auto-update effect
  createEffect(() => {
    const refEl = floating.refs.reference();
    const floatEl = floating.refs.floating();

    // needed for debugging!
    // console.log('=== Floating UI Debug ===');
    // console.log('Opened:', opened());
    // console.log('Reference element:', refEl);
    // console.log('Floating element:', floatEl);
    // console.log('Reference rect:', refEl?.getBoundingClientRect());
    // console.log('Floating rect:', floatEl?.getBoundingClientRect());
    // console.log('========================');

    // Include delayedUpdate and position in dependencies
    delayedUpdate();
    position;

    if (opened() && refEl instanceof HTMLElement && floatEl instanceof HTMLElement) {
      const cleanup = autoUpdate(refEl, floatEl, floating.update);
      onCleanup(cleanup);
    }
  });

  // Update on position dependencies change
  createEffect(() => {
    // Track the dependencies array
    positionDependencies;
    floating.update();
  });

  // Trigger delayed update when opened state changes
  createEffect(() => {
    // Only increment when opened changes (not on initial run)
    if (opened !== undefined) {
      setDelayedUpdate(c => c + 1);
    }
  });
}
