import { createEffect, createSignal, JSX } from 'solid-js';
import { useDisclosure, useInterval } from '@empoleon/hooks';
import { EmpoleonProvider } from '../../core';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { FloatingIndicator } from './FloatingIndicator';

export default {
  title: 'FloatingIndicator',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function WithinModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        transitionProps={{ transition: 'pop' }}
      >
        <Usage />
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
}

export function Usage() {
  const [active, setActive] = createSignal(1);
  const [refs, setRefs] = createSignal<HTMLElement[]>([]);
  const [parentRef, setParentRef] = createSignal<HTMLDivElement | null>(null);

  const setElementRef = (element: HTMLElement, index: number) => {
    refs()[index] = element;
    setRefs(refs);
  };

  return (
    <div style={{ padding: '40px' }}>
      <div
        class="elements"
        ref={(node) => setParentRef(node!)}
        style={{
          display: 'flex',
          'flex-wrap': 'wrap',
          gap: '15px',
          'align-items': 'center',
          position: 'relative',
          'max-width': '800px',
        }}
      >
        <button
          class="target-element"
          type="button"
          onClick={() => setActive(0)}
          ref={(node) => setElementRef(node!, 0)}
          style={{ height: '120px', width: '200px' }}
        >
          Element 1
        </button>
        <button
          class="target-element"
          type="button"
          onClick={() => setActive(1)}
          ref={(node) => setElementRef(node!, 1)}
          style={{ width: '500px' }}
        >
          Second Element
        </button>
        <button
          class="target-element"
          type="button"
          onClick={() => setActive(2)}
          ref={(node) => setElementRef(node!, 2)}
          style={{ height: '200px', width: '300px' }}
        >
          El 3
        </button>
        <FloatingIndicator target={refs()[active()]} parent={parentRef()} c="red" bg="gray">
          Indicator
        </FloatingIndicator>
      </div>
    </div>
  );
}

export function ResizableTarget() {
  const [targetRef, setTargetRef] = createSignal<HTMLDivElement | null>(null);
  const [parentRef, setParentRef] = createSignal<HTMLDivElement | null>(null);

  return (
    <div style={{ padding: '40px' }}>
      <div ref={(node) => setParentRef(node!)} style={{ position: 'relative' }}>
        <div ref={(node) => setTargetRef(node!)} style={{ padding: '20px', background: 'pink' }}>
          Resizable target
        </div>
        <FloatingIndicator target={targetRef()} parent={parentRef()} c="red" bg="gray">
          Indicator
        </FloatingIndicator>
      </div>
    </div>
  );
}

export function ScaledElement() {
  const [targetRef, setTargetRef] = createSignal<HTMLDivElement | null>(null);
  const [parentRef, setParentRef] = createSignal<HTMLDivElement | null>(null);
  const [scale, setScale] = createSignal(1);
  const interval = useInterval(() => setScale(Math.random()), 500);

  createEffect(() => {
    interval.start();
  });

  return (
    <div style={{ padding: '40px' }}>
      <div ref={(node) => setParentRef(node!)} style={{ position: 'relative' }}>
        <div
          ref={(node) => setTargetRef(node!)}
          style={{
            padding: '20px',
            background: 'pink',
            width: '200px',
            height: '200px',
            transition: 'transform 100ms',
            transform: `scale(${scale()})`,
          }}
        >
          Resizable target
        </div>
        <FloatingIndicator
          target={targetRef()}
          parent={parentRef()}
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        />
      </div>
    </div>
  );
}
