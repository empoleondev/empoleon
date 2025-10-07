import { Button, Group, ScrollArea, Stack } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Content } from './_content';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { ScrollArea, Button, Stack, Group } from '@empoleon/core';

function Demo() {
  const [viewport, setViewport] = createSignal<HTMLDivElement>();

  const scrollToBottom = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToCenter = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: (el.scrollHeight - el.clientHeight) / 2, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Stack align="center">
      <ScrollArea
        w={300}
        h={200}
        // @ts-ignore - TypeScript definition is incorrect, this prop accepts a function
        viewportRef={setViewport}
      >
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
`;

function Demo() {
  const [viewport, setViewport] = createSignal<HTMLDivElement>();

  const scrollToBottom = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToCenter = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: (el.scrollHeight - el.clientHeight) / 2, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    const el = viewport();
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Stack align="center">
      <ScrollArea
        w={300}
        h={200}
        // @ts-ignore - TypeScript definition is incorrect, this prop accepts a function
        viewportRef={setViewport}
      >
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
