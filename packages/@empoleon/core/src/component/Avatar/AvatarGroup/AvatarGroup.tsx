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
} from '../../../core';
import { AvatarGroupProvider } from './AvatarGroup.context';
import classes from '../Avatar.module.css';
import { splitProps } from 'solid-js';

export type AvatarGroupStylesNames = 'group';
export type AvatarGroupCssVariables = {
  group: '--ag-spacing';
};

export interface AvatarGroupProps
  extends BoxProps,
    StylesApiProps<AvatarGroupFactory>,
    ElementProps<'div'> {
  /** Negative space between Avatar components, `'sm'` by default */
  spacing?: EmpoleonSpacing;
}

export type AvatarGroupFactory = Factory<{
  props: AvatarGroupProps;
  ref: HTMLDivElement;
  stylesNames: AvatarGroupStylesNames;
  vars: AvatarGroupCssVariables;
}>;

const varsResolver = createVarsResolver<AvatarGroupFactory>((_, { spacing }) => ({
  group: {
    '--ag-spacing': getSpacing(spacing),
  },
}));

export const AvatarGroup = factory<AvatarGroupFactory>(_props => {
  const props = useProps('AvatarGroup', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'attributes',
    'vars',
    'spacing',
    'ref'
  ]);

  const getStyles = useStyles<AvatarGroupFactory>({
    name: 'AvatarGroup',
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
    rootSelector: 'group',
  });

  return (
    <AvatarGroupProvider value>
      <Box ref={local.ref} {...getStyles('group')} {...others} />
    </AvatarGroupProvider>
  );
});

AvatarGroup.classes = classes;
AvatarGroup.displayName = '@empoleon/core/AvatarGroup';
