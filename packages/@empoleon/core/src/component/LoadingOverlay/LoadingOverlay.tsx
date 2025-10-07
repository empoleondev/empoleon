import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getDefaultZIndex,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '../../core';
import { Loader, LoaderProps } from '../Loader';
import { Overlay, OverlayProps } from '../Overlay';
import { Transition, TransitionOverride } from '../Transition';
import classes from './LoadingOverlay.module.css';

export type LoadingOverlayStylesNames = 'root' | 'loader' | 'overlay';
export type LoadingOverlayCssVariables = {
  root: '--lo-z-index';
};

export interface LoadingOverlayProps
  extends BoxProps,
    StylesApiProps<LoadingOverlayFactory>,
    ElementProps<'div'> {
  /** Props passed down to `Transition` component @default `{ transition: 'fade', duration: 0 }` by default */
  transitionProps?: TransitionOverride;

  /** Props passed down to `Loader` component */
  loaderProps?: LoaderProps;

  /** Props passed down to `Overlay` component */
  overlayProps?: OverlayProps;

  /** Determines whether the overlay should be visible @default `false` */
  visible?: boolean;

  /** Controls overlay `z-index` @default `400` */
  zIndex?: string | number;
}

export type LoadingOverlayFactory = Factory<{
  props: LoadingOverlayProps;
  ref: HTMLDivElement;
  stylesNames: LoadingOverlayStylesNames;
  vars: LoadingOverlayCssVariables;
}>;

const defaultProps = {
  transitionProps: { transition: 'fade', duration: 0 },
  overlayProps: { backgroundOpacity: 0.75 },
  zIndex: getDefaultZIndex('overlay'),
} satisfies Partial<LoadingOverlayProps>;

const varsResolver = createVarsResolver<LoadingOverlayFactory>((_, props) => ({
  root: {
    '--lo-z-index': props.zIndex?.toString(),
  },
}));

export const LoadingOverlay = factory<LoadingOverlayFactory>((_props) => {
  const props = useProps('LoadingOverlay', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'transitionProps',
    'loaderProps',
    'overlayProps',
    'visible',
    'zIndex',
    'attributes',
    'ref',
  ]);

  const theme = useEmpoleonTheme();

  const getStyles = useStyles<LoadingOverlayFactory>({
    name: 'LoadingOverlay',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const _overlayProps = { ...defaultProps.overlayProps, ...local.overlayProps };

  return (
    <Transition transition="fade" {...local.transitionProps} mounted={!!local.visible}>
      {(transitionStyles) => (
        <Box {...getStyles('root', { style: transitionStyles })} ref={local.ref} {...others}>
          <Loader {...getStyles('loader')} unstyled={local.unstyled} {...local.loaderProps} />

          <Overlay
            {..._overlayProps}
            {...getStyles('overlay')}
            darkHidden
            unstyled={local.unstyled}
            color={local.overlayProps?.color || theme.white}
          />

          <Overlay
            {..._overlayProps}
            {...getStyles('overlay')}
            lightHidden
            unstyled={local.unstyled}
            color={local.overlayProps?.color || theme.colors.dark[5]}
          />
        </Box>
      )}
    </Transition>
  );
});

LoadingOverlay.classes = classes;
LoadingOverlay.displayName = '@empoleon/core/LoadingOverlay';
