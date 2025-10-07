import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Anchor } from './Anchor';

export default {
  title: 'Anchor',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Anchor href="https://empoleon.dev" target="blank" underline="never">
        Empoleon website link: never
      </Anchor>
      <br />
      <Anchor href="https://empoleon.dev" target="blank">
        Empoleon website link: hover
      </Anchor>
      <br />
      <Anchor href="https://empoleon.dev" target="blank" underline="not-hover">
        Empoleon website link: not hover
      </Anchor>
      <br />
      <Anchor href="https://empoleon.dev" target="blank" underline="always">
        Empoleon website link: always
      </Anchor>
      <br />
      <Anchor
        href="https://empoleon.dev"
        target="blank"
        underline="never"
        variant="gradient"
        fz={60}
        fw="bold"
      >
        Empoleon website link: never
      </Anchor>
    </div>
  );
}

export function Unstyled() {
  return (
    <Anchor href="#" unstyled>
      Unstyled
    </Anchor>
  );
}

export function LineClamp() {
  return (
    <Anchor href="#" lineClamp={1}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam non ipsum aliquid
      voluptatibus. Repellat, illo cumque a inventore excepturi dolorem? Asperiores quasi numquam
      natus ipsum rerum architecto cumque quo ut.
    </Anchor>
  );
}
