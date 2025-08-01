import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getDefaultZIndex,
  getSpacing,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { OptionalPortal, PortalProps } from '../Portal';
import classes from './Affix.module.css';

export type AffixStylesNames = 'root';
export type AffixCssVariables = {
  root: '--affix-z-index' | '--affix-top' | '--affix-left' | '--affix-bottom' | '--affix-right';
};

export interface AffixBaseProps {
  /** Root element `z-index` property, `200` by default */
  zIndex?: string | number;

  /** Determines whether component should be rendered within portal, `true` by default */
  withinPortal?: boolean;

  /** Props to pass down to the `Portal` component when `withinPortal` is set */
  portalProps?: Omit<PortalProps, 'children'>;

  /** Affix position on screen, defaults value is `{ bottom: 0, right: 0 }` */
  position?: {
    top?: EmpoleonSize | (string & {}) | number;
    left?: EmpoleonSize | (string & {}) | number;
    bottom?: EmpoleonSize | (string & {}) | number;
    right?: EmpoleonSize | (string & {}) | number;
  };
}

export interface AffixProps
  extends BoxProps,
    AffixBaseProps,
    StylesApiProps<AffixFactory>,
    ElementProps<'div'> {}

export type AffixFactory = Factory<{
  props: AffixProps;
  ref: HTMLDivElement;
  stylesNames: AffixStylesNames;
  vars: AffixCssVariables;
}>;

const defaultProps: Partial<AffixProps> = {
  position: { bottom: 0, right: 0 },
  zIndex: getDefaultZIndex('modal'),
  withinPortal: true,
};

const varsResolver = createVarsResolver<AffixFactory>((_, { zIndex, position }) => ({
  root: {
    '--affix-z-index': zIndex?.toString(),
    '--affix-top': getSpacing(position?.top),
    '--affix-left': getSpacing(position?.left),
    '--affix-bottom': getSpacing(position?.bottom),
    '--affix-right': getSpacing(position?.right),
  },
}));

export const Affix = factory<AffixFactory>(_props => {
  const props = useProps('Affix', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'portalProps',
    'zIndex',
    'withinPortal',
    'position',
    'ref'
  ]);

  const getStyles = useStyles<AffixFactory>({
    name: 'Affix',
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
    <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
      <Box ref={local.ref} {...getStyles('root')} {...others} />
    </OptionalPortal>
  );
});

Affix.classes = classes;
Affix.displayName = '@empoleon/core/Affix';
