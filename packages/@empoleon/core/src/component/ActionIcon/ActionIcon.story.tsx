import { IconChevronDown, IconChevronUp } from '@tabler/icons-solidjs';
import { For, JSX } from 'solid-js';
import { DEFAULT_THEME, EmpoleonProvider, EmpoleonThemeProvider, rem } from '../../core';
import { ActionIcon, ActionIconProps } from './ActionIcon';

export default {
  title: 'ActionIcon',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

function Colors({ index, ...others }: ActionIconProps & { index?: number }) {
  const colors = Object.keys(DEFAULT_THEME.colors);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '40px' }}>
      <For each={colors}>
        {(color) => (
          <ActionIcon
            color={`${color}${typeof index === 'number' ? `.${index}` : ''}`}
            {...others}
            size="lg"
          >
            $$
          </ActionIcon>
        )}
      </For>
    </div>
  );
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
        {(_, index) => (
          <ActionIcon color={`red.${index()}`} autoContrast>
            $$
          </ActionIcon>
        )}
      </For>
    </div>
  );
}

export function SingleButton() {
  return (
    <div style={{ padding: '40px' }}>
      <EmpoleonThemeProvider
        theme={{
          components: {
            ActionIcon: ActionIcon.extend({
              defaultProps: {
                // Color: 'red',
              },
            }),
          },
        }}
      >
        <ActionIcon loading>$$</ActionIcon>
      </EmpoleonThemeProvider>
    </div>
  );
}

export function WithinDisabledFieldset() {
  return (
    <fieldset disabled style={{ padding: '40px' }}>
      <legend>Disabled fieldset</legend>
      <ActionIcon size="lg" p={45}>
        $$
      </ActionIcon>
    </fieldset>
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

export function CssColor() {
  return (
    <div style={{ padding: '40px' }}>
      Filled variant
      <div>
        <ActionIcon size="xl" radius="xl" color="#ff00ff">
          $$
        </ActionIcon>
      </div>
      Light variant
      <div>
        <ActionIcon size="xl" radius="xl" color="#ff00ff" variant="light">
          $$
        </ActionIcon>
      </div>
      Outline variant
      <div>
        <ActionIcon size="xl" radius="xl" color="#ff00ff" variant="outline">
          $$
        </ActionIcon>
      </div>
      Subtle variant
      <div>
        <ActionIcon size="xl" radius="xl" color="#ff00ff" variant="subtle">
          $$
        </ActionIcon>
      </div>
      Transparent variant
      <div>
        <ActionIcon size="xl" radius="xl" color="#ff00ff" variant="transparent">
          $$
        </ActionIcon>
      </div>
      White variant
      <div style={{ 'background-color': 'rgba(0,0,0,.5)' }}>
        <ActionIcon size="xl" radius="xl" color="#ff00ff" variant="white">
          $$
        </ActionIcon>
      </div>
    </div>
  );
}

export function GradientVariant() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '40px' }}>
      <ActionIcon size="lg" variant="gradient">
        $$
      </ActionIcon>
      <ActionIcon size="lg" variant="gradient" gradient={{ from: 'red', to: 'cyan' }}>
        $$
      </ActionIcon>
      <ActionIcon size="lg" variant="gradient" gradient={{ from: '#FF00FF', to: '#00FF00' }}>
        $$
      </ActionIcon>
    </div>
  );
}

export function AsLink() {
  return (
    <div style={{ padding: '40px' }}>
      <ActionIcon size="xl" component="a" href="https://empoleon.dev">
        $$
      </ActionIcon>
    </div>
  );
}

export function Variables() {
  return (
    <div style={{ padding: '40px' }}>
      <ActionIcon
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
      </ActionIcon>
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <ActionIcon loading size="lg">
        $$
      </ActionIcon>
      <ActionIcon loading variant="subtle" size="lg">
        $$
      </ActionIcon>
      <ActionIcon loading variant="subtle" color="orange" size="lg">
        $$
      </ActionIcon>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <ActionIcon disabled size="lg">
        $$
      </ActionIcon>
    </div>
  );
}

export function ActionIconGroup() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <ActionIcon size="lg" variant="default">
        S
      </ActionIcon>
      <ActionIcon.Group>
        <ActionIcon size="lg" variant="default">
          S
        </ActionIcon>
      </ActionIcon.Group>

      <ActionIcon.Group borderWidth={1}>
        <ActionIcon size="lg" variant="default">
          1
        </ActionIcon>
        <ActionIcon size="lg" variant="default" component="a" href="https://empoleon.dev">
          2
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          2
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          3
        </ActionIcon>
      </ActionIcon.Group>

      <ActionIcon.Group orientation="vertical">
        <ActionIcon size="lg" variant="default">
          1
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          2
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          2
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          3
        </ActionIcon>
      </ActionIcon.Group>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <ActionIcon.Group unstyled>
        <ActionIcon unstyled size="lg" variant="default">
          $$
        </ActionIcon>
        <ActionIcon unstyled size="lg" variant="default">
          $$
        </ActionIcon>
      </ActionIcon.Group>
    </div>
  );
}

export function GroupSection() {
  return (
    <div>
      <ActionIcon.Group>
        <ActionIcon variant="default" size="lg" radius="md">
          <IconChevronDown color="var(--empoleon-color-red-text)" />
        </ActionIcon>
        <ActionIcon.GroupSection variant="default" size="lg" bg="var(--empoleon-color-body)">
          118
        </ActionIcon.GroupSection>
        <ActionIcon variant="default" size="lg" radius="md">
          <IconChevronUp color="var(--empoleon-color-teal-text)" />
        </ActionIcon>
      </ActionIcon.Group>
    </div>
  );
}
