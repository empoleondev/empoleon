import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Transition } from './Transition';

export default {
  title: 'Transition',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [mounted, setMounted] = createSignal(false);
  return (
    <div style={{ padding: '40px' }}>
      <Transition mounted={mounted()} transition="pop">
        {(styles) => (
          <div style={{ ...styles, background: 'pink', padding: '40px' }}>Transition me</div>
        )}
      </Transition>

      <button type="button" onClick={() => setMounted((m: any) => !m)}>
        toggle
      </button>
    </div>
  );
}

export function ExitDuration() {
  const [mounted, setMounted] = createSignal(false);
  return (
    <div style={{ padding: '40px' }}>
      <Transition mounted={mounted()} transition="pop" duration={100} exitDuration={1000}>
        {(styles) => (
          <div
            style={{
              ...styles,
              background: 'pink',
              padding: '40px',
              position: 'absolute',
              bottom: '100px',
            }}
          >
            Transition me
          </div>
        )}
      </Transition>

      <button type="button" onClick={() => setMounted((m: any) => !m)}>
        toggle
      </button>
    </div>
  );
}

export function WithDelay() {
  const [mounted, setMounted] = createSignal(false);

  return (
    <div style={{ padding: '40px' }}>
      <Transition mounted={mounted()} transition="pop" enterDelay={500} exitDelay={100}>
        {(styles) => (
          <div style={{ ...styles, background: 'pink', padding: '40px' }}>Transition me</div>
        )}
      </Transition>

      <button type="button" onClick={() => setMounted((m: any) => !m)}>
        toggle
      </button>
    </div>
  );
}
