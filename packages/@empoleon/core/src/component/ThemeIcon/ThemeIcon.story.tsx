import { For, JSX } from 'solid-js';
import { DEFAULT_THEME, EmpoleonProvider } from '../../core';
import { ThemeIcon, ThemeIconProps } from './ThemeIcon';

export default {
  title: 'ThemeIcon',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

function Colors({ index, ...others }: ThemeIconProps & { index?: number }) {
  const colors = Object.keys(DEFAULT_THEME.colors);

  return <div style={{ 'display': 'flex', 'gap': '20px', 'padding': '40px' }}>
    <For each={colors}>
      {(color) => (
        <ThemeIcon
          color={`${color}${typeof index === 'number' ? `.${index}` : ''}`}
          {...others}
          size="lg"
        >
          $$
        </ThemeIcon>
      )}
    </For>
  </div>;
}

export function SingleElement() {
  return (
    <div style={{ 'padding': '40px' }}>
      <ThemeIcon>$$</ThemeIcon>
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
      <Colors variant="outline" />
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
    <div style={{ 'padding': '40px' }}>
      Filled variant
      <div>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff">
          $$
        </ThemeIcon>
      </div>
      Light variant
      <div>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff" variant="light">
          $$
        </ThemeIcon>
      </div>
      Outline variant
      <div>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff" variant="outline">
          $$
        </ThemeIcon>
      </div>
      Subtle variant
      <div>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff" variant="subtle">
          $$
        </ThemeIcon>
      </div>
      Transparent variant
      <div>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff" variant="transparent">
          $$
        </ThemeIcon>
      </div>
      White variant
      <div style={{ 'background-color': 'rgba(0,0,0,.5)' }}>
        <ThemeIcon size="xl" radius="xl" color="#ff00ff" variant="white">
          $$
        </ThemeIcon>
      </div>
    </div>
  );
}

export function GradientVariant() {
  return (
    <div style={{ 'padding': '40px', 'display': 'flex', 'gap': '40px' }}>
      <ThemeIcon size="lg" variant="gradient">
        $$
      </ThemeIcon>
      <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'red', to: 'cyan' }}>
        $$
      </ThemeIcon>
      <ThemeIcon size="lg" variant="gradient" gradient={{ from: '#FF00FF', to: '#00FF00' }}>
        $$
      </ThemeIcon>
    </div>
  );
}
