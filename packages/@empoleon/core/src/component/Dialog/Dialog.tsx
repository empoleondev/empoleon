import { JSX, Show, splitProps } from 'solid-js';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  getSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { Affix, AffixBaseProps } from '../Affix';
import { CloseButton } from '../CloseButton';
import { Paper, PaperBaseProps } from '../Paper';
import { Transition, TransitionOverride } from '../Transition';
import classes from './Dialog.module.css';

export type DialogStylesNames = 'root' | 'closeButton';
export type DialogCssVariables = {
  root: '--dialog-size';
};

export interface DialogProps
  extends BoxProps,
    AffixBaseProps,
    PaperBaseProps,
    StylesApiProps<DialogFactory>,
    ElementProps<'div'> {
  /** If set dialog will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean;

  /** Determines whether the close button should be displayed, `true` by default */
  withCloseButton?: boolean;

  /** Called when the close button is clicked */
  onClose?: () => void;

  /** Dialog content */
  children?: JSX.Element;

  /** Opened state */
  opened: boolean;

  /** Overrides default transition, `{ transition: 'pop-top-right', duration: 200 }` by default */
  transitionProps?: TransitionOverride;

  /** Controls `width` of the dialog, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;
}

export type DialogFactory = Factory<{
  props: DialogProps;
  ref: HTMLDivElement;
  stylesNames: DialogStylesNames;
  vars: DialogCssVariables;
}>;

const defaultProps: Partial<DialogProps> = {
  shadow: 'md',
  p: 'md',
  withBorder: false,
  transitionProps: { transition: 'pop-top-right', duration: 200 },
  position: {
    bottom: 30,
    right: 30,
  },
};

const varsResolver = createVarsResolver<DialogFactory>((_, props) => ({
  root: {
    '--dialog-size': getSize(props.size, 'dialog-size'),
  },
}));

export const Dialog = factory<DialogFactory>((_props) => {
  const props = useProps('Dialog', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'zIndex',
    'position',
    'keepMounted',
    'opened',
    'transitionProps',
    'withCloseButton',
    'withinPortal',
    'children',
    'onClose',
    'portalProps',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<DialogFactory>({
    name: 'Dialog',
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

  return (
    <Affix
      zIndex={local.zIndex}
      position={local.position}
      ref={local.ref}
      withinPortal={local.withinPortal}
      portalProps={local.portalProps}
      unstyled={local.unstyled}
    >
      <Transition keepMounted={local.keepMounted} mounted={local.opened} {...local.transitionProps}>
        {(transitionStyles) => (
          <Paper
            unstyled={local.unstyled}
            {...getStyles('root', { style: transitionStyles })}
            {...others}
          >
            <Show when={local.withCloseButton}>
              <CloseButton
                onClick={local.onClose}
                unstyled={local.unstyled}
                {...getStyles('closeButton')}
              />
            </Show>
            {local.children}
          </Paper>
        )}
      </Transition>
    </Affix>
  );
});

Dialog.classes = classes;
Dialog.displayName = '@empoleon/core/Dialog';
