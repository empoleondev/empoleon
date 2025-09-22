import { splitProps, JSX } from 'solid-js';
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
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Divider.module.css';

export type DividerStylesNames = 'root' | 'label';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerCssVariables = {
  root: '--divider-color' | '--divider-border-style' | '--divider-size';
};

export interface DividerProps
  extends BoxProps,
    StylesApiProps<DividerFactory>,
    ElementProps<'div'> {
  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: EmpoleonColor;

  /** Controls width/height (depends on orientation), `'xs'` by default */
  size?: EmpoleonSize | number | (string & {});

  /** Divider label, visible only when `orientation` is `horizontal` */
  label?: JSX.Element;

  /** Controls label position, `'center'` by default */
  labelPosition?: 'left' | 'center' | 'right';

  /** Controls orientation, `'horizontal'` by default */
  orientation?: 'horizontal' | 'vertical';
}

export type DividerFactory = Factory<{
  props: DividerProps;
  ref: HTMLDivElement;
  stylesNames: DividerStylesNames;
  vars: DividerCssVariables;
  variant: DividerVariant;
}>;

const defaultProps: Partial<DividerProps> = {
  orientation: 'horizontal',
};

const varsResolver = createVarsResolver<DividerFactory>((theme, props) => ({
  root: {
    '--divider-color': props.color ? getThemeColor(props.color, theme) : undefined,
    '--divider-border-style': props.variant,
    '--divider-size': getSize(props.size, 'divider-size'),
  },
}));

export const Divider = factory<DividerFactory>(_props => {
  const props = useProps('Divider', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'orientation',
    'label',
    'labelPosition',
    'mod',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<DividerFactory>({
    name: 'Divider',
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
    <Box
      ref={local.ref}
      mod={[{ orientation: local.orientation, 'with-label': !!local.label }, local.mod]}
      {...getStyles('root')}
      {...others}
      role="separator"
    >
      {local.label && (
        <Box component="span" mod={{ position: local.labelPosition }} {...getStyles('label')}>
          {local.label}
        </Box>
      )}
    </Box>
  );
});

Divider.classes = classes;
Divider.displayName = '@empoleon/core/Divider';
