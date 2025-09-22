import { JSX, splitProps } from 'solid-js';
import { useId } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  EmpoleonColor,
  EmpoleonRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { CloseButton } from '../CloseButton';
import classes from './Alert.module.css';

export type AlertStylesNames =
  | 'root'
  | 'body'
  | 'label'
  | 'title'
  | 'icon'
  | 'wrapper'
  | 'message'
  | 'closeButton';
export type AlertVariant = 'filled' | 'light' | 'outline' | 'default' | 'transparent' | 'white';
export type AlertCssVariables = {
  root: '--alert-radius' | '--alert-bg' | '--alert-color' | '--alert-bd';
};

export interface AlertProps
  extends BoxProps,
    StylesApiProps<AlertFactory>,
    ElementProps<'div', 'title'> {
  /** Key of `theme.radius` or any valid CSS value to set border-radius, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.colors` or any valid CSS color, default value is `theme.primaryColor`  */
  color?: EmpoleonColor;

  /** Alert title */
  title?: JSX.Element;

  /** Icon displayed next to the title */
  icon?: JSX.Element;

  /** Determines whether close button should be displayed, `false` by default */
  withCloseButton?: boolean;

  /** Called when the close button is clicked */
  onClose?: () => void;

  /** Close button `aria-label` */
  closeButtonLabel?: string;

  /** Determines whether text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type AlertFactory = Factory<{
  props: AlertProps;
  ref: HTMLDivElement;
  stylesNames: AlertStylesNames;
  vars: AlertCssVariables;
  variant: AlertVariant;
}>;

const varsResolver = createVarsResolver<AlertFactory>(
  (theme, props) => {
    const colors = theme.variantColorResolver({
      color: props.color || theme.primaryColor,
      theme,
      variant: props.variant || 'light',
      autoContrast: props.autoContrast,
    });

    return {
      root: {
        '--alert-radius': props.radius === undefined ? undefined : getRadius(props.radius),
        '--alert-bg': props.color || props.variant ? colors.background : undefined,
        '--alert-color': colors.color,
        '--alert-bd': props.color || props.variant ? colors.border : undefined,
      },
    };
  }
);

export const Alert = factory<AlertFactory>(_props => {
  const props = useProps('Alert', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'radius',
    'color',
    'title',
    'children',
    'id',
    'icon',
    'withCloseButton',
    'onClose',
    'closeButtonLabel',
    'variant',
    'autoContrast',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<AlertFactory>({
    name: 'Alert',
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

  const rootId = useId(local.id);
  const titleId = (local.title && `${rootId}-title`) || undefined;
  const bodyId = `${rootId}-body`;

  return (
    <Box
      id={rootId}
      {...getStyles('root', { variant: local.variant  })}
      variant={local.variant}
      ref={local.ref}
      {...others}
      role="alert"
      aria-describedby={bodyId}
      aria-labelledby={titleId}
    >
      <Box component='div' {...getStyles('wrapper')}>
        {local.icon && <Box component='div' {...getStyles('icon')}>{local.icon}</Box>}

        <Box component='div' {...getStyles('body')}>
          {local.title && (
            <Box component='div' {...getStyles('title')} data-with-close-button={local.withCloseButton || undefined}>
              <Box component='span' id={titleId} {...getStyles('label')}>
                {local.title}
              </Box>
            </Box>
          )}

          {local.children && (
            <Box component='div' id={bodyId} {...getStyles('message')} data-variant={local.variant}>
              {local.children}
            </Box>
          )}
        </Box>

        {local.withCloseButton && (
          <CloseButton
            {...getStyles('closeButton')}
            onClick={local.onClose}
            variant="transparent"
            size={16}
            iconSize={16}
            aria-label={local.closeButtonLabel}
            unstyled={local.unstyled}
          />
        )}
      </Box>
    </Box>
  );
});

Alert.classes = classes;
Alert.displayName = '@empoleon/core/Alert';
