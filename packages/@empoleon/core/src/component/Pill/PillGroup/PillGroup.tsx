import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { usePillsInputContext } from '../../PillsInput/PillsInput.context';
import { PillGroupProvider } from '../PillGroup.context';
import classes from '../Pill.module.css';
import { splitProps } from 'solid-js';

export type PillGroupStylesNames = 'group';
export type PillGroupCssVariables = {
  group: '--pg-gap';
};

export interface PillGroupProps
  extends BoxProps,
    StylesApiProps<PillGroupFactory>,
    ElementProps<'div'> {
  /** Controls spacing between pills, by default controlled by `size` */
  gap?: EmpoleonSize | (string & {}) | number;

  /** Controls size of the child `Pill` components and gap between them, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Determines whether child `Pill` components should be disabled */
  disabled?: boolean;
}

export type PillGroupFactory = Factory<{
  props: PillGroupProps;
  ref: HTMLDivElement;
  stylesNames: PillGroupStylesNames;
  vars: PillGroupCssVariables;
  ctx: { size: EmpoleonSize | (string & {}) | undefined };
}>;

const defaultProps: Partial<PillGroupProps> = {};

const varsResolver = createVarsResolver<PillGroupFactory>((_, { gap }, { size }) => ({
  group: {
    '--pg-gap': gap !== undefined ? getSize(gap) : getSize(size, 'pg-gap'),
  },
}));

export const PillGroup = factory<PillGroupFactory>(_props => {
  const props = useProps('PillGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'size',
    'disabled',
    'ref'
  ]);

  const pillsInputCtx = usePillsInputContext();
  const _size = pillsInputCtx?.size || local.size || undefined;

  const getStyles = useStyles<PillGroupFactory>({
    name: 'PillGroup',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    stylesCtx: { size: _size },
    rootSelector: 'group',
  });

  return (
    <PillGroupProvider value={{ size: _size, disabled: local.disabled }}>
      <Box ref={local.ref} size={_size} {...getStyles('group')} {...others} />
    </PillGroupProvider>
  );
});

PillGroup.classes = classes;
PillGroup.displayName = '@empoleon/core/PillGroup';
