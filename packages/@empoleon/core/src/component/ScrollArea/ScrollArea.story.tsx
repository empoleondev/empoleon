import { batch, createEffect, createSignal, Index, JSX, on } from 'solid-js';
import { Box, EmpoleonProvider } from '../../core';
import { Code } from '../Code';
import { NumberInput } from '../NumberInput';
import { Paper } from '../Paper';
import { Stack } from '../Stack';
import { ScrollArea } from './ScrollArea';

export default {
  title: 'ScrollArea',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const arr = Array(10).fill(0);

const content = (
  <Index each={arr}>
    {(_) => (
      <p style={{ margin: 0, padding: 0 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam
        labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio
        accusamus veniam sit hic.
      </p>
    )}
  </Index>
);

export function Usage() {
  return (
    <div style={{ background: 'pink', 'max-width': '300px' }}>
      <ScrollArea
        h={200}
        scrollbars="y"
        onBottomReached={() => console.log('bottom')}
        onTopReached={() => console.log('top')}
      >
        <div style={{ width: '600px' }}>{content}</div>
      </ScrollArea>
    </div>
  );
}

export function BottomReachedDecimal() {
  const [scrollPosition, onScrollPositionChange] = createSignal({ x: 0, y: 0 });
  const [hasReachedBottom, setHasReachedBottom] = createSignal(false);

  return (
    <Stack mt={16} w="100%" align="center" justify="center">
      <Paper withBorder h={100} w={200}>
        <ScrollArea
          w="100%"
          h={100}
          onScrollPositionChange={onScrollPositionChange}
          onBottomReached={() => setHasReachedBottom(true)}
        >
          <Index each={Array.from({ length: 7 })}>
            {(_) => (
              <Box h={40.5}>
                <h1 style={{ 'font-size': '50.25px' }}>My Example</h1>
              </Box>
            )}
          </Index>
        </ScrollArea>
      </Paper>

      <div>
        Scroll position: <Code>{`{ x: ${scrollPosition().x}, y: ${scrollPosition().y} }`}</Code>
      </div>
      <div>
        Has Reached Bottom: <Code>{`{ ${hasReachedBottom()} }`}</Code>
      </div>
    </Stack>
  );
}

export function OffsetScrollbars() {
  return (
    <div style={{ background: 'pink', 'max-width': '300px' }}>
      <ScrollArea h={200} type="always" offsetScrollbars="present">
        <div style={{ background: 'pink' }}>{content}</div>
      </ScrollArea>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px', 'max-width': '300px' }}>
      <ScrollArea h={200} type="always" offsetScrollbars unstyled>
        <div style={{ width: '600px' }}>{content}</div>
      </ScrollArea>
    </div>
  );
}

export function OnScrollChange() {
  const [scrollPosition, onScrollPositionChange] = createSignal({ x: 0, y: 0 });
  return (
    <div style={{ padding: '40px', 'max-width': '300px' }}>
      <ScrollArea h={200} onScrollPositionChange={onScrollPositionChange}>
        <div style={{ width: '600px' }}>{content}</div>
      </ScrollArea>
      <div>
        scroll position x: {scrollPosition().x}, y: {scrollPosition().y}
      </div>
    </div>
  );
}

export function NeverType() {
  return (
    <ScrollArea h={200} type="never">
      <div style={{ width: '600px' }}>{content}</div>
    </ScrollArea>
  );
}

export function OnBottomReached() {
  const [scrollPosition, onScrollPositionChange] = createSignal({ x: 0, y: 0 });
  const [hasReachedBottom, setHasReachedBottom] = createSignal(false);
  const [customReachedBottom, setCustomReachedBottom] = createSignal(false);
  const [suppressBottomEvent, setSuppressBottomEvent] = createSignal(false);
  const setViewport = (el: HTMLDivElement) => (viewportEl = el);

  const [fsize, setFsize] = createSignal<string | number>(16);
  let viewportEl: HTMLDivElement | undefined;

  createEffect(
    on(
      fsize,
      () => {
        batch(() => {
          setSuppressBottomEvent(true);
          setHasReachedBottom(false);
          setCustomReachedBottom(false);
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (viewportEl) {viewportEl.scrollTop = 0};
            setSuppressBottomEvent(false);
          });
        });
      },
      { defer: true }
    )
  );

  return (
    <Stack mt={16} w="100%" align="center" justify="center">
      <Paper withBorder h={100} w={200}>
        <ScrollArea
          w="100%"
          h={100}
          onScrollPositionChange={onScrollPositionChange}
          onBottomReached={() => {
            if (!suppressBottomEvent()) {setHasReachedBottom(true)};
          }}
          viewportRef={setViewport as unknown as HTMLDivElement}
          viewportProps={{
            ref: (el) => (viewportEl = el),
            onScroll: (e) => {
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
              const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
              if (customReachedBottom() !== atBottom) {setCustomReachedBottom(atBottom)};
            },
          }}
        >
          {Array.from({ length: 7 }).map(_k => (
            <Box h={40.5}>
              <h1 style={{ 'font-size': `${fsize()}px` }}>My Example</h1>
            </Box>
          ))}
        </ScrollArea>
      </Paper>
      <NumberInput value={fsize()} onChange={setFsize} label="Font size (px)" />
      <div>
        Scroll position: <Code>{`{ x: ${scrollPosition().x}, y: ${scrollPosition().y} }`}</Code>
      </div>
      <div>
        Has Reached Bottom: <Code>{`{ ${hasReachedBottom()} }`}</Code>
      </div>
      <div>
        Custom Has Reached Bottom: <Code>{`{ ${customReachedBottom()} }`}</Code>
      </div>
    </Stack>
  );
}
