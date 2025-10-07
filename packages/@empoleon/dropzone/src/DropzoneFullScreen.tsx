import { createEffect, createSignal, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  getDefaultZIndex,
  OptionalPortal,
  PortalProps,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { Dropzone, DropzoneProps, DropzoneStylesNames, DropzoneVariant } from './Dropzone';
import classes from './Dropzone.module.css';

export type DropzoneFullScreenStylesNames = DropzoneStylesNames | 'fullScreen';

// @ts-ignore
export interface DropzoneFullScreenProps
  extends BoxProps,
    Omit<DropzoneProps, 'styles' | 'classNames' | 'vars' | 'variant'>,
    StylesApiProps<DropzoneFullScreenFactory>,
    ElementProps<'div', 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onDragEnter'> {
  /** Determines whether user can drop files to browser window, true by default */
  active?: boolean;

  /** Z-index value, 9999 by default */
  zIndex?: JSX.CSSProperties['z-index'];

  /** Determines whether component should be rendered within Portal, true by default */
  withinPortal?: boolean;

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;
}

export type DropzoneFullScreenFactory = Factory<{
  props: DropzoneFullScreenProps;
  ref: HTMLDivElement;
  stylesNames: DropzoneFullScreenStylesNames;
  variant: DropzoneVariant;
}>;

const defaultProps = {
  maxSize: Infinity,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  active: true,
  zIndex: getDefaultZIndex('max'),
  withinPortal: true,
} satisfies Partial<DropzoneFullScreenProps>;

export const DropzoneFullScreen = factory<DropzoneFullScreenFactory>((_props) => {
  const props = useProps('DropzoneFullScreen', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'active',
    'onDrop',
    'onReject',
    'zIndex',
    'withinPortal',
    'portalProps',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<DropzoneFullScreenFactory>({
    name: 'DropzoneFullScreen',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    rootSelector: 'fullScreen',
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DropzoneFullScreenFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const [counter, setCounter] = createSignal(0);
  const [visible, { open, close }] = useDisclosure(false);

  const handleDragEnter = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes('Files')) {
      setCounter((prev) => prev + 1);
      open();
    }
  };

  const handleDragLeave = () => {
    setCounter((prev) => prev - 1);
  };

  createEffect(() => {
    counter() === 0 && close();
  });

  createEffect(() => {
    if (!local.active) {
      return undefined;
    }

    document.addEventListener('dragenter', handleDragEnter, false);
    document.addEventListener('dragleave', handleDragLeave, false);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter, false);
      document.removeEventListener('dragleave', handleDragLeave, false);
    };
  });

  return (
    <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
      <Box
        {...getStyles('fullScreen', {
          style: {
            opacity: visible() ? 1 : 0,
            pointerEvents: visible() ? 'all' : 'none',
            zIndex: local.zIndex,
          },
        })}
        ref={local.ref}
      >
        <Dropzone
          {...others}
          classNames={resolvedClassNames}
          styles={resolvedStyles}
          unstyled={local.unstyled}
          className={classes.dropzone}
          onDrop={(files: any) => {
            local.onDrop?.(files);
            close();
            setCounter(0);
          }}
          onReject={(files: any) => {
            local.onReject?.(files);
            close();
            setCounter(0);
          }}
        />
      </Box>
    </OptionalPortal>
  );
});

DropzoneFullScreen.classes = classes;
DropzoneFullScreen.displayName = '@empoleon/dropzone/DropzoneFullScreen';

export type DropzoneFullScreenType = typeof DropzoneFullScreen;
