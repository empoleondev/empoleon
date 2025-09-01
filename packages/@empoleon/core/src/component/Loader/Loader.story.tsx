import { createTheme, EmpoleonProvider } from '@empoleon/core';
import { defaultLoaders, Loader } from './Loader';
import { EmpoleonLoaderComponent } from './Loader.types';
import { JSX, splitProps } from 'solid-js';

export default {
  title: 'Loader',
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
    <div style={{ 'padding': '40px' }}>
      <Loader />
      <Loader type="bars" mt="xl" />
      <Loader type="dots" mt="xl" />
    </div>
  );
}

export function LoaderOnProvider() {
  const theme = createTheme({
    components: {
      Loader: Loader.extend({
        defaultProps: {
          type: 'ring',
          loaders: {
            ring: RingLoader,
            ...Loader.defaultLoaders,
          },
        },
      }),
    },
  });
  return (
    <EmpoleonProvider theme={theme}>
      <div style={{ 'padding': '40px' }}>
        <Loader />
        <Loader type="bars" mt="xl" />
        <Loader type="dots" mt="xl" />
      </div>
    </EmpoleonProvider>
  );
}

export function Colors() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Loader color="orange.3" />
      <Loader color="#FEFE00" mt="xl" />
    </div>
  );
}

// @ts-ignore
const RingLoader: EmpoleonLoaderComponent = (props: any) => {
  const [_, others] = splitProps(props, ['style']);

  return (
    <svg
      {...others}
      ref={props.ref}
      style={{
        width: 'var(--loader-size)',
        height: 'var(--loader-size)',
        stroke: 'var(--loader-color)',
        ...props.style,
      }}
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="1.5s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="1.5s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="3s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="3s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="3s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="8">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.5s"
            values="6;1;2;3;4;5;6"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  )
};

RingLoader.displayName = '@empoleon/core/RingLoader';

export function CustomComponent() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Loader
        type="ring"
        loaders={{
          ...defaultLoaders,
          ring: RingLoader,
        }}
      />
    </div>
  );
}
