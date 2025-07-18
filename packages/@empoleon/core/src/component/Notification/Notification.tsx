import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { CloseButton } from '../CloseButton';
import { Loader, LoaderProps } from '../Loader';
import classes from './Notification.module.css';

export type NotificationStylesNames =
  | 'root'
  | 'icon'
  | 'loader'
  | 'body'
  | 'title'
  | 'description'
  | 'closeButton';
export type NotificationCssVariables = {
  root: '--notification-radius' | '--notification-color';
};

export interface NotificationProps
  extends BoxProps,
    StylesApiProps<NotificationFactory>,
    ElementProps<'div', 'title'> {
  variant?: string;

  /** Called when close button is clicked */
  onClose?: () => void;

  /** Controls notification line or icon color, key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Notification icon, replaces color line */
  icon?: JSX.Element;

  /** Notification title, displayed before body */
  title?: JSX.Element;

  /** Notification body, place main text here */
  children?: JSX.Element;

  /** Replaces colored line or icon with Loader component */
  loading?: boolean;

  /** Determines whether notification should have a border, `false` by default */
  withBorder?: boolean;

  /** Determines whether close button should be visible, `true` by default */
  withCloseButton?: boolean;

  /** Props passed down to the close button */
  closeButtonProps?: Record<string, any>;

  /** Props passed down to `Loader` component */
  loaderProps?: LoaderProps;
}

export type NotificationFactory = Factory<{
  props: NotificationProps;
  ref: HTMLDivElement;
  stylesNames: NotificationStylesNames;
  vars: NotificationCssVariables;
}>;

const defaultProps: Partial<NotificationProps> = {
  withCloseButton: true,
};

const varsResolver = createVarsResolver<NotificationFactory>((theme, { radius, color }) => ({
  root: {
    '--notification-radius': radius === undefined ? undefined : getRadius(radius),
    '--notification-color': color ? getThemeColor(color, theme) : undefined,
  },
}));

export const Notification = factory<NotificationFactory>(_props => {
  const props = useProps('Notification', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'color',
    'radius',
    'loading',
    'withCloseButton',
    'withBorder',
    'title',
    'icon',
    'children',
    'onClose',
    'closeButtonProps',
    'classNames',
    'style',
    'styles',
    'unstyled',
    'variant',
    'vars',
    'mod',
    'loaderProps',
    'role',
    'ref'
  ]);

  const getStyles = useStyles<NotificationFactory>({
    name: 'Notification',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  return (
    <Box
      {...getStyles('root')}
      mod={[{ 'data-with-icon': !!local.icon || local.loading, 'data-with-border': local.withBorder }, local.mod]}
      ref={local.ref}
      variant={local.variant}
      role={local.role || 'alert'}
      {...others}
    >
      {local.icon && !local.loading && <div {...getStyles('icon')}>{local.icon}</div>}
      {local.loading && <Loader size={28} color={local.color} {...local.loaderProps} {...getStyles('loader')} />}

      <div {...getStyles('body')}>
        {local.title && <div {...getStyles('title')}>{local.title}</div>}

        <Box {...getStyles('description')} mod={{ 'data-with-title': !!local.title }}>
          {local.children}
        </Box>
      </div>

      {local.withCloseButton && (
        <CloseButton
          iconSize={16}
          color="gray"
          {...local.closeButtonProps}
          unstyled={local.unstyled}
          onClick={local.onClose}
          {...getStyles('closeButton')}
        />
      )}
    </Box>
  );
});

Notification.classes = classes;
Notification.displayName = '@empoleon/core/Notification';
