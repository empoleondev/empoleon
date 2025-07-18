import {
  Box,
  BoxProps,
  ElementProps,
  Factory,
  factory,
  EmpoleonSpacing,
  StyleProp,
  StylesApiProps,
  useProps,
  useRandomClassName,
  useStyles,
} from '../../core';
import { SimpleGridContainerVariables, SimpleGridMediaVariables } from './SimpleGridVariables';
import classes from './SimpleGrid.module.css';
import { splitProps } from 'solid-js';

export type SimpleGridStylesNames = 'root' | 'container';

export interface SimpleGridProps
  extends BoxProps,
    StylesApiProps<SimpleGridFactory>,
    ElementProps<'div'> {
  /** Number of columns, `1` by default */
  cols?: StyleProp<number>;

  /** Spacing between columns, `'md'` by default */
  spacing?: StyleProp<EmpoleonSpacing>;

  /** Spacing between rows, `'md'` by default */
  verticalSpacing?: StyleProp<EmpoleonSpacing>;

  /** Determines typeof of queries that are used for responsive styles, `'media'` by default */
  type?: 'media' | 'container';
}

export type SimpleGridFactory = Factory<{
  props: SimpleGridProps;
  ref: HTMLDivElement;
  stylesNames: SimpleGridStylesNames;
}>;

const defaultProps: Partial<SimpleGridProps> = {
  cols: 1,
  spacing: 'md',
  type: 'media',
};

export const SimpleGrid = factory<SimpleGridFactory>(_props => {
  const props = useProps('SimpleGrid', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'cols',
    'verticalSpacing',
    'spacing',
    'type',
    'ref'
  ]);

  const getStyles = useStyles<SimpleGridFactory>({
    name: 'SimpleGrid',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
  });

  const responsiveClassName = useRandomClassName();

  if (local.type === 'container') {
    return (
      <>
        <SimpleGridContainerVariables {...props} selector={`.${responsiveClassName}`} />
        <div {...getStyles('container')}>
          <Box ref={local.ref} {...getStyles('root', { className: responsiveClassName })} {...others} />
        </div>
      </>
    );
  }

  return (
    <>
      <SimpleGridMediaVariables {...props} selector={`.${responsiveClassName}`} />
      <Box ref={local.ref} {...getStyles('root', { className: responsiveClassName })} {...others} />
    </>
  );
});

SimpleGrid.classes = classes;
SimpleGrid.displayName = '@empoleon/core/SimpleGrid';
