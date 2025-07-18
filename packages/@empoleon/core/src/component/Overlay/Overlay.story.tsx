import { For, JSX } from 'solid-js';
import { Overlay } from './Overlay';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Overlay',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione expedita voluptatibus aperiam cum, consectetur, tenetur consequuntur error qui eum eligendi, ea illum! Sit, sint totam dicta rem deleniti perspiciatis!';
const content = <For each={Array(20).fill(0)}>
  {() => <p>{lorem}</p>}
</For>

export function Usage() {
  return (
    <>
      <Overlay blur={3} radius="xl">
        Some content
      </Overlay>
      {content}
    </>
  );
}

export function Gradient() {
  return (
    <>
      <Overlay gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)">
        Some content
      </Overlay>
      {content}
    </>
  );
}

export function Center() {
  return (
    <>
      <Overlay center c="#fff" opacity={0.9}>
        Some content
      </Overlay>
      {content}
    </>
  );
}

export function Fixed() {
  return (
    <>
      <Overlay fixed>Some content</Overlay>
      {content}
    </>
  );
}
