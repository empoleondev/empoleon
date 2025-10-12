import { IconChevronDown, IconChevronUp } from '@tabler/icons-solidjs';
import { createSignal, For, JSX } from 'solid-js';
import { DEFAULT_THEME, EmpoleonProvider, rem } from '../../core';
import { Button, ButtonProps } from './Button';
import { FileButton } from '../FileButton';

export default {
  title: 'Button',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Base() {
  return <Button attributes={{ inner: { 'data-test-id': 1 } }}>Button</Button>;
}

export function RenderRoot() {
  return <Button renderRoot={(props) => <a {...props} href="#" />}>Some content</Button>;
}

export function AutoContrast() {
  const buttons = Array.from({ length: 10 }, (_, i) => `red.${i}`);

  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        gap: '10px',
        padding: '40px',
      }}
    >
      <For each={buttons}>
        {(color) => (
          <Button color={color} autoContrast>
            Button
          </Button>
        )}
      </For>
    </div>
  );
}

export function PolymorphicAlignment() {
  return (
    <div style={{ padding: '40px' }}>
      <Button>Button</Button>
      <Button component="div">Div</Button>
      <Button component="a">Link</Button>
    </div>
  );
}

export function SingleButton() {
  return (
    <div style={{ padding: '40px' }}>
      <div>
        <Button variant="outline" size="xl">
          Button
        </Button>
      </div>
      <div>
        <Button disabled variant="outline" size="xl">
          Button
        </Button>
      </div>
    </div>
  );
}

export function WithinDisabledFieldset() {
  return (
    <fieldset disabled style={{ padding: '40px' }}>
      <legend>Disabled fieldset</legend>
      <Button size="lg">Disabled button</Button>
    </fieldset>
  );
}

function Colors({ index, ...others }: ButtonProps & { index?: number }) {
  const colors = Object.keys(DEFAULT_THEME.colors);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '40px' }}>
      <For each={colors}>
        {(color) => (
          <Button color={`${color}${typeof index === 'number' ? `.${index}` : ''}`} {...others}>
            Button
          </Button>
        )}
      </For>
    </div>
  );
}

export function Usage() {
  return (
    <>
      Default variant:
      <Colors variant="default" />
      Filled variant:
      <Colors />
      Filled variant index
      <Colors index={4} />
      Light variant:
      <Colors variant="light" />
      Light variant index:
      <Colors variant="light" index={5} />
      Subtle variant:
      <Colors variant="subtle" />
      Subtle variant index:
      <Colors variant="subtle" index={5} />
      Outline variant:
      <Colors variant="outline" disabled />
      Outline variant index:
      <Colors variant="outline" index={4} />
      Transparent variant:
      <Colors variant="transparent" />
      Transparent variant index:
      <Colors variant="transparent" index={4} />
      <div style={{ 'background-color': 'rgba(0,0,0,.5)' }}>
        White variant:
        <Colors variant="white" />
        White variant index:
        <Colors variant="white" index={4} />
      </div>
    </>
  );
}

export function FullWidth() {
  return (
    <div style={{ padding: '40px' }}>
      <Button fullWidth leftSection="L" rightSection="R" justify="space-between">
        Button
      </Button>
    </div>
  );
}

export function Sizes() {
  return (
    <>
      <div style={{ padding: '40px' }}>
        <Button size="xs">Button xs</Button>
        <Button size="sm">Button sm</Button>
        <Button size="md">Button md</Button>
        <Button size="lg">Button lg</Button>
        <Button size="xl">Button xl</Button>
      </div>

      <div style={{ padding: '40px' }}>
        <Button size="compact-xs">Button compact xs</Button>
        <Button size="compact-sm">Button compact sm</Button>
        <Button size="compact-md">Button compact md</Button>
        <Button size="compact-lg">Button compact lg</Button>
        <Button size="compact-xl">Button compact xl</Button>
      </div>
    </>
  );
}

export function CssColor() {
  return (
    <div style={{ padding: '40px' }}>
      Filled variant
      <div>
        <Button size="xl" radius="xl" color="#ff00ff">
          $$
        </Button>
      </div>
      Light variant
      <div>
        <Button size="xl" radius="xl" color="#ff00ff" variant="light">
          $$
        </Button>
      </div>
      Outline variant
      <div>
        <Button size="xl" radius="xl" color="#ff00ff" variant="outline">
          $$
        </Button>
      </div>
      Subtle variant
      <div>
        <Button size="xl" radius="xl" color="#ff00ff" variant="subtle">
          $$
        </Button>
      </div>
      Transparent variant
      <div>
        <Button size="xl" radius="xl" color="#ff00ff" variant="transparent">
          $$
        </Button>
      </div>
      White variant
      <div style={{ 'background-color': 'rgba(0,0,0,.5)' }}>
        <Button size="xl" radius="xl" color="#ff00ff" variant="white">
          $$
        </Button>
      </div>
    </div>
  );
}

export function GradientVariant() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '40px' }}>
      <Button size="lg" variant="gradient">
        $$
      </Button>
      <Button size="lg" variant="gradient" gradient={{ from: 'red', to: 'cyan' }}>
        $$
      </Button>
      <Button size="lg" variant="gradient" gradient={{ from: '#FF00FF', to: '#00FF00' }}>
        $$
      </Button>
    </div>
  );
}

export function AsLink() {
  return (
    <div style={{ padding: '40px' }}>
      <Button
        size="xl"
        component="a"
        href="https://empoleon.dev"
        onClick={(event) => event.preventDefault()}
      >
        $$
      </Button>
      <Button size="xl" onClick={(event) => event.preventDefault()}>
        $$
      </Button>
    </div>
  );
}

export function Variables() {
  return (
    <div style={{ padding: '40px' }}>
      <Button
        size="xl"
        __vars={{ '--aasdsad': 'asdasd' }}
        vars={(_theme, props) => {
          const result = { root: {} as any };
          if (props.size === 'xl') {
            result.root['--ai-size'] = rem('12rem');
            result.root['--ai-bg'] = 'pink';
            result.root['--ai-hover'] = 'orange';
          }

          return result;
        }}
      >
        $$
      </Button>
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Button loading size="xs">
        Button xs
      </Button>
      <Button loading size="sm">
        Button sm
      </Button>
      <Button loading size="md">
        Button md
      </Button>
      <Button loading size="lg">
        Button lg
      </Button>
      <Button loading size="xl">
        Button xl
      </Button>
    </div>
  );
}

export function ToggleLoading() {
  const [loading, setLoading] = createSignal(false);
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Button loading={loading()} size="lg">
        Save to database
      </Button>

      <Button onClick={() => setLoading((l) => !l)} size="lg">
        Toggle loading state
      </Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Button disabled size="lg">
        $$
      </Button>
    </div>
  );
}

export function Sections() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Button leftSection="L">With Left</Button>
      <Button rightSection="R">With Right</Button>
      <Button leftSection="L" rightSection="R">
        With Both
      </Button>
    </div>
  );
}

export function ButtonGroup() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Button size="lg" variant="default">
        S
      </Button>
      <Button.Group>
        <Button size="lg" variant="default">
          S
        </Button>
      </Button.Group>

      <Button.Group borderWidth={1}>
        <Button size="lg" variant="default" component="a" href="https://empoleon.dev">
          2
        </Button>
        <Button size="lg" variant="default">
          1
        </Button>

        <Button size="lg" variant="default">
          2
        </Button>
        <Button size="lg" variant="default">
          3
        </Button>
      </Button.Group>

      <Button.Group orientation="vertical">
        <Button size="lg" variant="default">
          1
        </Button>
        <Button size="lg" variant="default">
          2
        </Button>
        <Button size="lg" variant="default">
          2
        </Button>
        <Button size="lg" variant="default">
          3
        </Button>
      </Button.Group>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <Button unstyled loading>
        Unstyled
      </Button>
    </div>
  );
}

export function GroupSection() {
  return (
    <div>
      <Button.Group>
        <Button variant="default" size="lg" radius="md">
          <IconChevronDown color="var(--empoleon-color-red-text)" />
        </Button>
        <Button.GroupSection variant="default" size="lg" bg="var(--empoleon-color-body)">
          118
        </Button.GroupSection>
        <Button variant="default" size="lg" radius="md">
          <IconChevronUp color="var(--empoleon-color-teal-text)" />
        </Button>
      </Button.Group>
    </div>
  );
}

export function WithFileButton() {
  return (
    <Button.Group>
      <Button variant="outline">Button 1</Button>
      <FileButton onChange={(f) => console.log(f)}>
        {(props) => (
          <Button {...props} variant="outline">
            Files
          </Button>
        )}
      </FileButton>
    </Button.Group>
  );
}
