import { JSX } from 'solid-js';
import { AspectRatio } from './AspectRatio';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'AspectRatio',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const WithProps = AspectRatio.withProps({ ratio: 112 / 9 });

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <WithProps>
        <img
          src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
          alt="img"
        />
      </WithProps>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <AspectRatio ratio={1} unstyled>
        <img
          src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
          alt="img"
        />
      </AspectRatio>
    </div>
  );
}

export function WithinFlexContainer() {
  return (
    <div style={{ 'padding': '40px', display: 'flex', 'gap': '20px' }}>
      <AspectRatio ratio={16 / 9} style={{ flex: 1 }}>
        <img
          src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
          alt="img"
        />
      </AspectRatio>

      <AspectRatio ratio={16 / 9} style={{ flex: 1 }}>
        <img
          src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
          alt="img"
        />
      </AspectRatio>

      <AspectRatio ratio={16 / 9} style={{ flex: 1 }}>
        <img
          src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/images/bg-8.png"
          alt="img"
        />
      </AspectRatio>
    </div>
  );
}
