import { IconPhoto } from '@tabler/icons-solidjs';
import { For, JSX } from 'solid-js';
import { EmpoleonProvider, EmpoleonThemeProvider } from '../../core';
import { Alert } from './Alert';

export default {
  title: 'Alert',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Variants() {
  return (
    <div
      style={{
        'max-width': '500px',
        margin: 'auto',
        padding: '40px',
        background: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        title="Bummer!"
        color="red"
        variant="light"
        withCloseButton
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        withCloseButton
        title="Bummer!"
        color="red"
        variant="filled"
        mt="xl"
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        withCloseButton
        title="Bummer!"
        color="red"
        variant="outline"
        mt="xl"
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        withCloseButton
        title="Bummer!"
        color="red"
        variant="default"
        mt="xl"
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        withCloseButton
        title="Bummer!"
        color="red"
        variant="white"
        mt="xl"
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
      <Alert
        icon={<IconPhoto stroke="1.5" />}
        withCloseButton
        title="Bummer!"
        color="red"
        variant="transparent"
        mt="xl"
      >
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
    </div>
  );
}

export function AutoContrast() {
  const buttons = Array(10).fill(0);

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
          <Alert
            withCloseButton
            title="Bummer!"
            color={`yellow.${index()}`}
            variant="filled"
            mt="xl"
            autoContrast
          >
            Something terrible happened! You made a mistake and there is no going back, your data
            was lost forever!
          </Alert>
        )}
      </For>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'max-width': '500px', margin: 'auto', padding: '40px' }}>
      <Alert title="Bummer!" color="red" variant="light" withCloseButton unstyled>
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>
    </div>
  );
}

export function WithoutDescription() {
  return (
    <div style={{ 'max-width': '500px', margin: 'auto', padding: '40px' }}>
      <Alert icon="$" title="Bummer!" color="red" variant="light" withCloseButton />
    </div>
  );
}

export function CSSVariables() {
  return (
    <EmpoleonThemeProvider
      theme={{
        components: {
          Alert: Alert.extend({
            defaultProps: {
              // Color: 'red',
            },
          }),
        },
      }}
    >
      <div style={{ 'max-width': '500px', margin: 'auto', padding: '40px' }}>
        <Alert title="Bummer!" withCloseButton>
          Something terrible happened! You made a mistake and there is no going back, your data was
          lost forever!
        </Alert>
      </div>
    </EmpoleonThemeProvider>
  );
}
