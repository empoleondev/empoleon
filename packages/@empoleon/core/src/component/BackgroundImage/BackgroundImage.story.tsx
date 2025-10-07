import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { BackgroundImage } from './BackgroundImage';

export default {
  title: 'BackgroundImage',
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
      <BackgroundImage
        w={400}
        h={200}
        src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
      >
        Content
      </BackgroundImage>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <BackgroundImage
        w={400}
        h={200}
        radius="md"
        src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
        unstyled
      >
        Content
      </BackgroundImage>
    </div>
  );
}
