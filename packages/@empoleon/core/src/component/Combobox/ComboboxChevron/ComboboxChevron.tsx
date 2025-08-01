import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  factory,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import classes from '../Combobox.module.css';

export type ComboboxChevronStylesNames = 'chevron';
export type ComboboxChevronCSSVariables = {
  chevron: '--combobox-chevron-size' | '--combobox-chevron-color';
};

export interface ComboboxChevronProps
  extends BoxProps,
    StylesApiProps<ComboboxChevronFactory>,
    ElementProps<'svg', 'opacity' | 'display'> {
  size?: EmpoleonSize | (string & {});
  error?: JSX.Element;
  color?: EmpoleonColor;
}

export type ComboboxChevronFactory = Factory<{
  props: ComboboxChevronProps;
  ref: SVGSVGElement;
  stylesNames: ComboboxChevronStylesNames;
  vars: ComboboxChevronCSSVariables;
}>;

const defaultProps: Partial<ComboboxChevronProps> = {
  error: null,
};

const varsResolver = createVarsResolver<ComboboxChevronFactory>((theme, { size, color }) => ({
  chevron: {
    '--combobox-chevron-size': getSize(size, 'combobox-chevron-size'),
    '--combobox-chevron-color': color ? getThemeColor(color, theme) : undefined,
  },
}));

export const ComboboxChevron = factory<ComboboxChevronFactory>(_props => {
  const props = useProps('ComboboxChevron', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'size',
    'error',
    'style',
    'className',
    'classNames',
    'styles',
    'unstyled',
    'vars',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<ComboboxChevronFactory>({
    name: 'ComboboxChevron',
    classes,
    props,
    style: local.style,
    className: local.className,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    rootSelector: 'chevron',
  });

  return (
    <Box
      component="svg"
      {...others}
      {...getStyles('chevron')}
      size={local.size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      mod={['combobox-chevron', { error: local.error }, local.mod]}
      ref={local.ref}
    >
      <path
        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </Box>
  );
});

ComboboxChevron.classes = classes;
ComboboxChevron.displayName = '@empoleon/core/ComboboxChevron';
