import { JSX } from 'solid-js';
import { EmpoleonProvider, EmpoleonThemeProvider } from '../../core';
import { UnstyledButton } from './UnstyledButton';

export default {
  title: 'UnstyledButton',
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
    <EmpoleonThemeProvider
      inherit
      theme={{
        components: {
          UnstyledButton: UnstyledButton.extend({
            classNames: (_theme, props) => ({
              root: `provider-classname-${props.__staticSelector}`,
            }),
          }),
        },
      }}
    >
      <div style={{ 'padding': '40px' }}>
        <UnstyledButton styles={() => ({ root: { color: 'red' } })}>Button</UnstyledButton>
      </div>
    </EmpoleonThemeProvider>
  );
}

export function PropsInStyles() {
  return (
    <UnstyledButton
      variant="xl"
      classNames={(_theme, props) => ({
        root: `${props.__staticSelector}----test`,
      })}
    >
      Hello
    </UnstyledButton>
  );
}
