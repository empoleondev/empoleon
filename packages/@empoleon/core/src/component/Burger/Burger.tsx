import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonSize,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { UnstyledButton } from '../UnstyledButton';
import classes from './Burger.module.css';

export type BurgerStylesNames = 'root' | 'burger';
export type BurgerCssVariables = {
  root:
    | '--burger-color'
    | '--burger-size'
    | '--burger-line-size'
    | '--burger-transition-duration'
    | '--burger-transition-timing-function';
};

export interface BurgerProps
  extends BoxProps,
    StylesApiProps<BurgerFactory>,
    ElementProps<'button'> {
  /** Controls burger `width` and `height`, numbers are converted to rem, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Controls height of lines, by default calculated based on `size` prop */
  lineSize?: string | number;

  /** Key of `theme.colors` of any valid CSS value, by default `theme.white` in dark color scheme and `theme.black` in light */
  color?: EmpoleonColor;

  /** State of the burger, when `true` burger is transformed into X, `false` by default */
  opened?: boolean;

  /** `transition-duration` property value in ms, `300` by default */
  transitionDuration?: number;

  /** `transition-timing-function` property value, `'ease'` by default  */
  transitionTimingFunction?: string;
}

export type BurgerFactory = Factory<{
  props: BurgerProps;
  ref: HTMLButtonElement;
  stylesNames: BurgerStylesNames;
  vars: BurgerCssVariables;
}>;

const defaultProps: Partial<BurgerProps> = {};

const varsResolver = createVarsResolver<BurgerFactory>(
  (theme, { color, size, lineSize, transitionDuration, transitionTimingFunction }) => ({
    root: {
      '--burger-color': color ? getThemeColor(color, theme) : undefined,
      '--burger-size': getSize(size, 'burger-size'),
      '--burger-line-size': lineSize ? rem(lineSize) : undefined,
      '--burger-transition-duration':
        transitionDuration === undefined ? undefined : `${transitionDuration}ms`,
      '--burger-transition-timing-function': transitionTimingFunction,
    },
  })
);

export const Burger = factory<BurgerFactory>(_props => {
  const props = useProps('Burger', null, _props);

  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'opened',
    'children',
    'transitionDuration',
    'transitionTimingFunction',
    'lineSize',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<BurgerFactory>({
    name: 'Burger',
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
    <UnstyledButton {...getStyles('root')} ref={local.ref} {...others}>
      <Box mod={['reduce-motion', { opened: () => local.opened }]} {...getStyles('burger')} />
      {local.children}
    </UnstyledButton>
  );
});

Burger.classes = classes;
Burger.displayName = '@empoleon/core/Burger';
