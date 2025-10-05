import { AspectRatio, Button, Overlay, OverlayProps, rgba } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { AspectRatio, Button, Overlay } from '@empoleon/core';
import { createSignal } from 'solid-js';

function Demo() {
  const [visible, setVisible] = createSignal(true);
  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
          alt="Demo"
        />
        {visible() && <Overlay{{props}} />}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}
`;

function Demo(props: OverlayProps & {
  gradient?: boolean;
  color2?: string;
}) {
  const [visible, setVisible] = createSignal(true);

  createEffect(() => {
    setVisible(true);
  });

  const overlayProps = () => {
    const { gradient: useGradient, color2, backgroundOpacity, ...rest } = props;

    if (useGradient && props.color && color2) {
      const opacity = backgroundOpacity ?? 0.6;
      const color1WithOpacity = rgba(props.color, opacity);
      const color2WithOpacity = rgba(color2, opacity);

      return {
        ...rest,
        gradient: `linear-gradient(145deg, ${color1WithOpacity} 0%, ${color2WithOpacity} 100%)`
      };
    }

    // Filter out color2 when gradient is off
    const { color2: _, ...filteredProps } = rest;
    return { ...filteredProps, backgroundOpacity };
  };

  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
          alt="Demo"
        />
        {visible() && <Overlay {...overlayProps()} />}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: '#000',
      libraryValue: '#000'
    },
    {
      prop: 'color2',
      type: 'color',
      initialValue: '#fff',
      libraryValue: '#fff'
    },
    {
      prop: 'backgroundOpacity',
      type: 'number',
      initialValue: 0.6,
      libraryValue: 0.6,
      min: 0,
      max: 1,
      step: 0.05
    },
    {
      prop: 'blur',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
    },
    {
      prop: 'gradient',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'zIndex',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 9999,
      step: 1
    },
    {
      prop: 'fixed',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'center',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    }
  ],
};
