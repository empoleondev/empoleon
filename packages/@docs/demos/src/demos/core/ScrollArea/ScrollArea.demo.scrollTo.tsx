import { Button, Group, ScrollArea, Stack } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Content } from './_content';
import { createSignal } from 'solid-js';

const code = `
import { useRef } from 'react';
import { ScrollArea, Button, Stack, Group } from '@empoleon/core';

function Demo() {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        {/* ... content */}
      </ScrollArea>

      <Group justify="center">
        <Button onClick={scrollToBottom}>Scroll to bottom</Button>
        <Button onClick={scrollToCenter}>Scroll to center</Button>
        <Button onClick={scrollToTop}>Scroll to top</Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [viewport, setViewport] = createSignal<HTMLDivElement|null>(null);
  const scrollToBottom = () =>
    viewport()!.scrollTo({ top: viewport()!.scrollHeight, behavior: 'smooth' });
  const scrollToCenter = () =>
    viewport()!.scrollTo({ top: viewport()!.scrollHeight / 2, behavior: 'smooth' });
  const scrollToTop = () => viewport()!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewport-ref={setViewport}>
        <Content />
      </ScrollArea>
      <Group justify="center">
        <Button onClick={scrollToBottom}>Scroll to bottom</Button>
        <Button onClick={scrollToCenter}>Scroll to center</Button>
        <Button onClick={scrollToTop}>Scroll to top</Button>
      </Group>
    </Stack>
  );
}

export const scrollTo: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
