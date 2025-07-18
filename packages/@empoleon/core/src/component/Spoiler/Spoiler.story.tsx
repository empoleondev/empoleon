import { createEffect, createSignal, Index, JSX } from 'solid-js';
import { Accordion } from '../Accordion/Accordion';
import { Spoiler } from './Spoiler';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Spoiler',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function ContentChanges() {
  const [count, setCount] = createSignal(1);
  const [content, setContent] = createSignal(Array(count()).fill(0));
  const randomCount = () => setCount(Math.round(Math.random() * 5 + 1));

  createEffect(() => {
    setContent(Array(count()).fill(0));
  })

  return (
    <div style={{ 'padding': '40px' }}>
      <button type="button" onClick={randomCount}>
        Random count
      </button>
      <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
        <Index each={content()}>
          {_ => (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis, incidunt libero,
              itaque, quaerat labore quis odio culpa tempore quisquam porro unde omnis tempora nostrum
              nihil eligendi distinctio. Animi, consectetur!
            </p>
          )}
        </Index>
      </Spoiler>
    </div>
  );
}

export function InsideAccordion() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Accordion>
        <Accordion.Item value="first">
          <Accordion.Control>Expand me</Accordion.Control>
          <Accordion.Panel>
            <Spoiler showLabel="Show" hideLabel="Hide" maxHeight={50}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut quam vitae
              lorem viverra ultricies. Integer hendrerit, quam mollis tempus iaculis, tellus est
              pellentesque eros, vel molestie risus eros sit amet sem. Fusce pretium ex quis neque
              fringilla facilisis. Aenean sed luctus tortor, eget suscipit neque. Pellentesque
              consequat neque quis porta luctus. Donec vitae est id velit condimentum mollis id vel
              est. Sed eleifend interdum enim, a facilisis ex faucibus nec. Morbi vel est et mauris
              congue ullamcorper. Duis eget velit lacinia, consequat neque vel, dignissim massa.
            </Spoiler>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export function Usage() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '500px' }}>
      <Spoiler showLabel="Show more" hideLabel="Hide details" maxHeight={50}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut quam vitae lorem
        viverra ultricies. Integer hendrerit, quam mollis tempus iaculis, tellus est pellentesque
        eros, vel molestie risus eros sit amet sem. Fusce pretium ex quis neque fringilla facilisis.
        Aenean sed luctus tortor, eget suscipit neque. Pellentesque consequat neque quis porta
        luctus. Donec vitae est id velit condimentum mollis id vel est. Sed eleifend interdum enim,
        a facilisis ex faucibus nec. Morbi vel est et mauris congue ullamcorper. Duis eget velit
        lacinia, consequat neque vel, dignissim massa.
        <input aria-label="test-input" />
      </Spoiler>
      <div>Some content after the spoiler</div>
    </div>
  );
}

export function Controlled() {
  const [expanded, setExpanded] = createSignal(false);
  return (
    <div style={{ 'padding': '40px', 'max-width': '500px' }}>
      <Spoiler
        showLabel="Show more"
        hideLabel="Hide details"
        maxHeight={50}
        expanded={expanded()}
        onExpandedChange={setExpanded}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut quam vitae lorem
        viverra ultricies. Integer hendrerit, quam mollis tempus iaculis, tellus est pellentesque
        eros, vel molestie risus eros sit amet sem. Fusce pretium ex quis neque fringilla facilisis.
        Aenean sed luctus tortor, eget suscipit neque. Pellentesque consequat neque quis porta
        luctus. Donec vitae est id velit condimentum mollis id vel est. Sed eleifend interdum enim,
        a facilisis ex faucibus nec. Morbi vel est et mauris congue ullamcorper. Duis eget velit
        lacinia, consequat neque vel, dignissim massa.
        <input aria-label="test-input" />
      </Spoiler>
      <div>Some content after the spoiler</div>
    </div>
  );
}
