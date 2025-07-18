import { createEffect, createSignal } from 'solid-js';
import { useInterval } from './use-interval';

export default { title: 'useInterval' };

export function Usage() {
  const [counter, setCounter] = createSignal(0);
  const [timeout, setTimeout] = createSignal(200);
  const interval = useInterval(() => setCounter(counter() + 1), timeout());

  createEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <div>
      <button type="button" style={{ padding: '40px' }} onClick={() => setCounter(Math.random())}>
        Set counter
      </button>
      <button
        type="button"
        style={{ padding: '40px' }}
        onClick={() => setTimeout((v) => (v === 200 ? 1000 : 200))}
      >
        Set timeout
      </button>
      <button type="button" style={{ padding: '40px' }} onClick={interval.toggle}>
        Counter: {counter()}
      </button>
    </div>
  );
}

export function AutoInvoke() {
  const [counter, setCounter] = createSignal(0);
  const [timeout, setTimeout] = createSignal(200);
  const interval = useInterval(() => setCounter(counter() + 1), timeout(), { autoInvoke: true });

  return (
    <div>
      <button type="button" style={{ padding: '40px' }} onClick={() => setCounter(Math.random())}>
        Set counter
      </button>
      <button
        type="button"
        style={{ padding: '40px' }}
        onClick={() => setTimeout((v) => (v === 200 ? 1000 : 200))}
      >
        Set timeout
      </button>
      <button type="button" style={{ padding: '40px' }} onClick={interval.toggle}>
        Counter: {counter()}
      </button>
    </div>
  );
}
