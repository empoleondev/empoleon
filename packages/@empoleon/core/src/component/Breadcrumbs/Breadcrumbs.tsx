import { children, splitProps, JSX, createEffect } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Breadcrumbs.module.css';

export type BreadcrumbsStylesNames = 'root' | 'separator' | 'breadcrumb';
export type BreadcrumbsCssVariables = {
  root: '--bc-separator-margin';
};

export interface BreadcrumbsProps
  extends BoxProps,
    StylesApiProps<BreadcrumbsFactory>,
    ElementProps<'div'> {
  /** Separator between children, `'/'` by default */
  separator?: JSX.Element;

  /** Controls spacing between separator and breadcrumb, `'xs'` by default */
  separatorMargin?: EmpoleonSpacing;

  /** React nodes that should be separated with `separator` */
  children: JSX.Element;
}

export type BreadcrumbsFactory = Factory<{
  props: BreadcrumbsProps;
  ref: HTMLDivElement;
  stylesNames: BreadcrumbsStylesNames;
  vars: BreadcrumbsCssVariables;
}>;

const defaultProps: Partial<BreadcrumbsProps> = {
  separator: '/',
};

const varsResolver = createVarsResolver<BreadcrumbsFactory>((_, { separatorMargin }) => ({
  root: {
    '--bc-separator-margin': getSpacing(separatorMargin),
  },
}));

export const Breadcrumbs = factory<BreadcrumbsFactory>(_props => {
  const props = useProps('Breadcrumbs', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'children',
    'separator',
    'separatorMargin',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<BreadcrumbsFactory>({
    name: 'Breadcrumbs',
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

  const items = () => {
    const c = children(() => props.children).toArray().filter((item) => !!item);
    const result: JSX.Element[] = [];

    c.forEach((child, i) => {
      result.push(
        <Box {...getStyles('breadcrumb')}>
          {child}
        </Box>
      );

      if (i < c.length - 1) {
        result.push(
          <Box {...getStyles('separator')}>
            {local.separator}
          </Box>
        );
      }
    });

    return result;
  };

  return (
    <Box ref={local.ref} {...getStyles('root')} {...others}>
      {items()}
    </Box>
  );
});

Breadcrumbs.classes = classes;
Breadcrumbs.displayName = '@empoleon/core/Breadcrumbs';
