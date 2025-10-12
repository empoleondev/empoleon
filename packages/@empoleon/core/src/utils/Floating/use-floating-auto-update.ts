import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
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

export function useFloatingAutoUpdate(props: Payload) {
  const [delayedUpdate, setDelayedUpdate] = createSignal(0);

  // Main auto-update effect
  createEffect(() => {
    const refEl = props.floating.refs.reference();
    const floatEl = props.floating.refs.floating();

    // Include delayedUpdate and position in dependencies
    delayedUpdate();
    props.position;

    if (props.opened() && refEl instanceof HTMLElement && floatEl instanceof HTMLElement) {
      const cleanup = autoUpdate(refEl, floatEl, props.floating.update);
      onCleanup(cleanup);
    }
  });

  // Update on position dependencies change
  createEffect(() => {
    // Track the dependencies array
    props.positionDependencies;
    props.floating.update();
  });

  // Trigger delayed update when opened state changes
  createEffect(() => {
    // Only increment when opened changes (not on initial run)
    if (props.opened !== undefined) {
      setDelayedUpdate((c) => c + 1);
    }
  });
}
