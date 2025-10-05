import { IconArrowUp } from '@tabler/icons-solidjs';
import { Affix, Button, Text, Transition } from '@empoleon/core';
import { useWindowScroll } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { IconArrowUp } from '@tabler/icons-solidjs';
import { useWindowScroll } from '@empoleon/hooks';
import { Affix, Button, Text, Transition } from '@empoleon/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Text ta="center">Affix is located at the configured position, scroll to see it</Text>
      <Affix{{props}}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
`;

function Demo(props: any) {
  const [scroll, scrollTo] = useWindowScroll();

  // Create a signal that constructs the position object from individual values
  // with mutual exclusivity: bottom/top and left/right
  const [position, setPosition] = createSignal({
    ...(props.bottom !== undefined ? { bottom: props.bottom } : props.top !== undefined ? { top: props.top } : {}),
    ...(props.right !== undefined ? { right: props.right } : props.left !== undefined ? { left: props.left } : {}),
  });

  createEffect(() => {
    setPosition({
      ...(props.bottom !== undefined ? { bottom: props.bottom } : props.top !== undefined ? { top: props.top } : {}),
      ...(props.right !== undefined ? { right: props.right } : props.left !== undefined ? { left: props.left } : {}),
    });
  });

  return (
    <>
      <Text ta="center">Affix is located at the configured position, scroll to see it</Text>
      <Affix
        position={position()}
        zIndex={props.zIndex}
        withinPortal={props.withinPortal}
      >
        <Transition transition="slide-up" mounted={scroll().y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'top',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 0,
      max: 500,
      step: 10,
    },
    {
      prop: 'right',
      type: 'number',
      initialValue: 20,
      libraryValue: 0,
      min: 0,
      max: 500,
      step: 10,
    },
    {
      prop: 'bottom',
      type: 'number',
      initialValue: 20,
      libraryValue: 0,
      min: 0,
      max: 500,
      step: 10,
    },
    {
      prop: 'left',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 0,
      max: 500,
      step: 10,
    },
    {
      prop: 'zIndex',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 9999,
      step: 100,
    },
    {
      prop: 'withinPortal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
