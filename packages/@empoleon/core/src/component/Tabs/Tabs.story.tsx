import { IconPackage } from '@tabler/icons-solidjs';
import { Tabs, TabsProps } from './Tabs';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { createSignal, Index } from 'solid-js';

export default {
  title: 'Tabs',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const Wrapper = (props: TabsProps) => <Tabs maw={500} mx="auto" mt={40} {...props} />;

export function Horizontal() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Tabs defaultValue="react" orientation="horizontal">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Tabs>
    </div>
  );
}

export function DefaultVariant() {
  return (
    <div>
      <Wrapper defaultValue="react">{
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      }</Wrapper>

      <Wrapper defaultValue="react" inverted>
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper color="orange" defaultValue="react" orientation="vertical">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper color="orange" defaultValue="react" orientation="vertical" placement="right">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>
    </div>
  );
}

export function OutlineVariant() {
  return (
    <div>
      <Wrapper variant="outline" defaultValue="react">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper variant="outline" defaultValue="react" inverted>
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper variant="outline" defaultValue="react" orientation="vertical">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper variant="outline" defaultValue="react" orientation="vertical" placement="right">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>
    </div>
  );
}

export function PillsVariant() {
  return (
    <div>
      <Wrapper variant="pills" color="lime.4" defaultValue="react" autoContrast>
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper variant="pills" color="green.9" defaultValue="react" inverted>
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper variant="pills" color="green.9" defaultValue="react" orientation="vertical">
        <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>

      <Wrapper
        variant="pills"
        color="green.9"
        defaultValue="react"
        orientation="vertical"
        placement="right"
      >
       <>
          <Tabs.List>
            <Tabs.Tab
              value="react"
              leftSection={<IconPackage size={16} />}
              rightSection={<IconPackage size={16} />}
            >
              React
            </Tabs.Tab>
            <Tabs.Tab value="sv">Svelte</Tabs.Tab>
            <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
            <Tabs.Tab value="ds" disabled>
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="react" pr="sm">
            React Panel
          </Tabs.Panel>
          <Tabs.Panel value="sv" pr="sm">
            Svelte Panel
          </Tabs.Panel>
          <Tabs.Panel value="ng" pr="sm">
            Angular Panel
          </Tabs.Panel>
        </>
      </Wrapper>
    </div>
  );
}

export const NoLoop = () => (
  <Wrapper defaultValue="react" loop={false}>
    <>
      <Tabs.List>
        <Tabs.Tab
          value="react"
          leftSection={<IconPackage size={16} />}
          rightSection={<IconPackage size={16} />}
        >
          React
        </Tabs.Tab>
        <Tabs.Tab value="sv">Svelte</Tabs.Tab>
        <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
        <Tabs.Tab value="ds" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="react" pr="sm">
        React Panel
      </Tabs.Panel>
      <Tabs.Panel value="sv" pr="sm">
        Svelte Panel
      </Tabs.Panel>
      <Tabs.Panel value="ng" pr="sm">
        Angular Panel
      </Tabs.Panel>
    </>
  </Wrapper>
);

export const NoKeyboardActivation = () => (
  <Wrapper defaultValue="react" activateTabWithKeyboard={false}>
    <>
      <Tabs.List>
        <Tabs.Tab
          value="react"
          leftSection={<IconPackage size={16} />}
          rightSection={<IconPackage size={16} />}
        >
          React
        </Tabs.Tab>
        <Tabs.Tab value="sv">Svelte</Tabs.Tab>
        <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
        <Tabs.Tab value="ds" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="react" pr="sm">
        React Panel
      </Tabs.Panel>
      <Tabs.Panel value="sv" pr="sm">
        Svelte Panel
      </Tabs.Panel>
      <Tabs.Panel value="ng" pr="sm">
        Angular Panel
      </Tabs.Panel>
    </>
  </Wrapper>
);

export const NoDefaultValue = () => <Wrapper defaultValue={null}>
  <>
    <Tabs.List>
      <Tabs.Tab
        value="react"
        leftSection={<IconPackage size={16} />}
        rightSection={<IconPackage size={16} />}
      >
        React
      </Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react" pr="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pr="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pr="sm">
      Angular Panel
    </Tabs.Panel>
  </>
</Wrapper>;

export const AllowDeactivation = () => (
  <Wrapper defaultValue="react" allowTabDeactivation>
   <>
      <Tabs.List>
        <Tabs.Tab
          value="react"
          leftSection={<IconPackage size={16} />}
          rightSection={<IconPackage size={16} />}
        >
          React
        </Tabs.Tab>
        <Tabs.Tab value="sv">Svelte</Tabs.Tab>
        <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
        <Tabs.Tab value="ds" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="react" pr="sm">
        React Panel
      </Tabs.Panel>
      <Tabs.Panel value="sv" pr="sm">
        Svelte Panel
      </Tabs.Panel>
      <Tabs.Panel value="ng" pr="sm">
        Angular Panel
      </Tabs.Panel>
    </>
  </Wrapper>
);

export const Controlled = () => {
  const [tab, setTab] = createSignal<string | null>('react');
  return (
    <Wrapper value={tab()} onChange={setTab} allowTabDeactivation>
      <>
        <Tabs.List>
          <Tabs.Tab
            value="react"
            leftSection={<IconPackage size={16} />}
            rightSection={<IconPackage size={16} />}
          >
            React
          </Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pr="sm">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pr="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pr="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>
  );
};

export const Grow = () => (
  <Wrapper defaultValue="react">
    <Tabs.List grow>
      <Tabs.Tab value="react" color="red">
        React
      </Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react">React Panel</Tabs.Panel>
    <Tabs.Panel value="sv">Svelte Panel</Tabs.Panel>
    <Tabs.Panel value="ng">Angular Panel</Tabs.Panel>
  </Wrapper>
);

export const Variants = () => (
  <div style={{ 'max-width': '500px', 'padding': '40px' }}>
    <Wrapper defaultValue="react" variant="default" mt={10} mb={50} radius="md">
      <>
        <Tabs.List>
          <Tabs.Tab
            value="react"
            leftSection={<IconPackage size={16} />}
            rightSection={<IconPackage size={16} />}
          >
            React
          </Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pr="sm">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pr="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pr="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper defaultValue="react" variant="outline" mt={10} mb={50} radius="md">
      <>
        <Tabs.List>
          <Tabs.Tab
            value="react"
            leftSection={<IconPackage size={16} />}
            rightSection={<IconPackage size={16} />}
          >
            React
          </Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pr="sm">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pr="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pr="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper defaultValue="react" variant="pills" mt={10} radius="md">
      <>
        <Tabs.List>
          <Tabs.Tab
            value="react"
            leftSection={<IconPackage size={16} />}
            rightSection={<IconPackage size={16} />}
          >
            React
          </Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pr="sm">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pr="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pr="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>
  </div>
);

export const VerticalVariants = () => (
  <div style={{ 'max-width': '600px', 'padding': '40px' }}>
    <Wrapper
      defaultValue="react"
      orientation="vertical"
      variant="default"
      mt={10}
      mb={50}
      radius="md"
    >
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper
      defaultValue="react"
      orientation="vertical"
      variant="outline"
      mt={10}
      mb={50}
      radius="md"
    >
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper defaultValue="react" orientation="vertical" variant="pills" mt={10} radius="md">
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>
  </div>
);

export const VerticalPlacement = () => (
  <div style={{ 'max-width': '500px', 'padding': '40px' }}>
    <Wrapper
      defaultValue="react"
      orientation="vertical"
      variant="default"
      mt={10}
      mb={50}
      radius="md"
      placement="right"
    >
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper
      defaultValue="react"
      orientation="vertical"
      variant="outline"
      mt={10}
      mb={50}
      radius="md"
      placement="right"
    >
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>

    <Wrapper
      defaultValue="react"
      orientation="vertical"
      variant="pills"
      mt={10}
      radius="md"
      placement="right"
    >
      <>
        <Tabs.List>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="sv">Svelte</Tabs.Tab>
          <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
          <Tabs.Tab value="ds" disabled>
            Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="react" pl="sm" bg="red.0">
          React Panel
        </Tabs.Panel>
        <Tabs.Panel value="sv" pl="sm">
          Svelte Panel
        </Tabs.Panel>
        <Tabs.Panel value="ng" pl="sm">
          Angular Panel
        </Tabs.Panel>
      </>
    </Wrapper>
  </div>
);

export const WithIcon = () => (
  <Wrapper defaultValue="react" variant="outline">
    <Tabs.List>
      <Tabs.Tab value="react" leftSection={<IconPackage size={14} />} />
      <Tabs.Tab value="sv" rightSection={<span>right</span>}>
        Svelte
      </Tabs.Tab>
      <Tabs.Tab value="ng">Angular</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react" pt="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pt="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pt="sm">
      Angular Panel
    </Tabs.Panel>
  </Wrapper>
);

export const Unstyled = () => (
  <Wrapper defaultValue="react" unstyled>
    <>
      <Tabs.List>
        <Tabs.Tab
          value="react"
          leftSection={<IconPackage size={16} />}
          rightSection={<IconPackage size={16} />}
        >
          React
        </Tabs.Tab>
        <Tabs.Tab value="sv">Svelte</Tabs.Tab>
        <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
        <Tabs.Tab value="ds" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="react" pr="sm">
        React Panel
      </Tabs.Panel>
      <Tabs.Panel value="sv" pr="sm">
        Svelte Panel
      </Tabs.Panel>
      <Tabs.Panel value="ng" pr="sm">
        Angular Panel
      </Tabs.Panel>
    </>
  </Wrapper>
);

export const DynamicTabs = () => {
  const [count, setCount] = createSignal(1);
  const list = () => Array(count())
    .fill(0)
    .map((_, index) => index);

  return (
    <Tabs>
      <Tabs.List>
        <Index each={list()}>
          {(item) => (
            <Tabs.Tab value={item().toString()}>
              Tab {item()}
            </Tabs.Tab>
          )}
        </Index>
      </Tabs.List>
      <Index each={list()}>
        {(item) => (
          <Tabs.Panel value={item().toString()}>
            Panel {item()}
          </Tabs.Panel>
        )}
      </Index>
      <button type="button" onClick={() => setCount(count() + 1)}>
        Add
      </button>
      <button type="button" onClick={() => setCount(count() - 1)}>
        Remove
      </button>
    </Tabs>
  );
};

export const Inverted = () => (
  <Wrapper defaultValue="react" variant="outline" inverted>
    <Tabs.Panel value="react" pb="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pb="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pb="sm">
      Angular Panel
    </Tabs.Panel>

    <Tabs.List>
      <Tabs.Tab value="react">React</Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>
  </Wrapper>
);
